import { z } from 'zod';

const requiredErrorMessage = 'Campo obrigatório';
const nonemptyErrorMessage = 'Não deixe campos vazios';

const vehicleSupplySchema = z
  .object({
    veiculoId: z
      .string({
        required_error: requiredErrorMessage,
        invalid_type_error: requiredErrorMessage,
      })
      .transform(Number),
    qtdAbastecidaLitros: z
      .string({ required_error: requiredErrorMessage })
      .regex(/^(\d+,\d{3})$/, { message: 'Formato inválido ex: 99,999' }),
    tipoCombustivel: z
      .string({ required_error: requiredErrorMessage })
      .nonempty({ message: nonemptyErrorMessage })
      .regex(/^(\D+)$/, { message: 'Devem ser apenas letras' })
      .trim(),
    valor: z
      .string({ required_error: requiredErrorMessage })
      .regex(/^(\d+,\d{3})$/, { message: 'Formato inválido ex: 99,999' }),
  })
  .required();

export default vehicleSupplySchema;

export type VehicleSupplySchema = z.infer<typeof vehicleSupplySchema>;
