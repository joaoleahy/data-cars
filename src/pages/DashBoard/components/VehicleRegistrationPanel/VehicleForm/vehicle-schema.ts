import { z } from 'zod';

// Expressão regular para validar placa nos formatos AAA-1234 e ABC1D23
const regexPlaca = /^([a-zA-Z]{3}-\d{4}|[a-zA-Z]{3}\d+[a-zA-Z]+\d{2})$/;
const regexOnlyNumbers = /^\d+$/;

const requiredErrorMessage = 'Campo obrigatório';
const nonemptyErrorMessage = 'Não deixe campos vazios';
const onlyNumbersErrorMessage = 'Devem ser apenas digitos';

const vehicleSchema = z
  .object({
    placa: z
      .string({ required_error: requiredErrorMessage })
      .regex(regexPlaca, {
        message: 'Formato inválido: (AAA-1234 ou ABC1D23)',
      })
      .toUpperCase(),
    renavam: z
      .string({ required_error: requiredErrorMessage })
      .nonempty({ message: nonemptyErrorMessage })
      .regex(regexOnlyNumbers, { message: onlyNumbersErrorMessage })
      .refine((val) => val.length === 11, {
        message: 'Deve conter exatos 11 digitos',
      }),
    cor: z
      .string({ required_error: requiredErrorMessage })
      .nonempty({ message: nonemptyErrorMessage })
      .trim(),
    modelo: z
      .string({ required_error: requiredErrorMessage })
      .nonempty({ message: nonemptyErrorMessage })
      .trim(),
    marca: z
      .string({ required_error: requiredErrorMessage })
      .nonempty({ message: nonemptyErrorMessage })
      .trim(),
    potencia: z
      .string({ required_error: requiredErrorMessage })
      .nonempty({ message: nonemptyErrorMessage })
      .regex(regexOnlyNumbers, { message: onlyNumbersErrorMessage }),
  })
  .required();

export default vehicleSchema;

export type VehicleSchema = z.infer<typeof vehicleSchema>;
