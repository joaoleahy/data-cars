import { z } from 'zod';
import validateCpf from '~/utils/validate-cpf';

const signupSchema = z
  .object({
    nome: z
      .string({ required_error: 'Campo obrigatório' })
      .regex(/^\D+$/, { message: 'Deve conter apenas letras' })
      .nonempty({ message: 'Não deixe campos vazios' })
      .trim(),
    cpf: z
      .string({ required_error: 'Campo obrigatório' })
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
        message: 'Formato inválido (000.000.000-00)',
      })
      .nonempty({ message: 'Não deixe campos vazios' })
      .refine((value) => validateCpf(value), { message: 'CPF inválido' }),
  })
  .required();

export default signupSchema;

export type SignupSchema = z.infer<typeof signupSchema>;
