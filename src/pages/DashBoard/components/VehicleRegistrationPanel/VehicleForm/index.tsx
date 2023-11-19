import FormControl from '~/components/forms/FormControl';
import InputText from '~/components/forms/InputText';
import vehicleSchema, { VehicleSchema } from './vehicle-schema';

interface VehicleFormProps {
  formId: string;
  defaultValues: Partial<VehicleSchema> | null;
  onSubmit: (data: VehicleSchema) => void;
}

function VehicleForm({ formId, defaultValues, onSubmit }: VehicleFormProps) {
  const handleSubmit = (data: VehicleSchema) => onSubmit(data);

  return (
    <FormControl
      styles={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 2,
      }}
      formId={formId}
      onSubmit={handleSubmit}
      formValidationSchema={vehicleSchema}
      defaultValues={defaultValues}
      render={(control, errors) => (
        <>
          <InputText
            name="renavam"
            label="Renavam"
            validation={control}
            invalid={!!errors.renavam}
            helperText={errors.renavam?.message as string}
            margin="none"
            variant="outlined"
          />
          <InputText
            name="placa"
            label="Placa"
            validation={control}
            invalid={!!errors.placa}
            helperText={errors.placa?.message as string}
            margin="none"
            variant="outlined"
          />
          <InputText
            name="modelo"
            label="Modelo"
            validation={control}
            invalid={!!errors.modelo}
            helperText={errors.modelo?.message as string}
            margin="none"
            variant="outlined"
          />
          <InputText
            name="cor"
            label="Cor"
            validation={control}
            invalid={!!errors.cor}
            helperText={errors.cor?.message as string}
            margin="none"
            variant="outlined"
          />
          <InputText
            name="marca"
            label="Marca"
            validation={control}
            invalid={!!errors.marca}
            helperText={errors.marca?.message as string}
            margin="none"
            variant="outlined"
          />
          <InputText
            name="potencia"
            label="Potência"
            validation={control}
            invalid={!!errors.potencia}
            helperText={errors.potencia?.message as string}
            margin="none"
            variant="outlined"
          />
        </>
      )}
    />
  );
}

export default VehicleForm;
