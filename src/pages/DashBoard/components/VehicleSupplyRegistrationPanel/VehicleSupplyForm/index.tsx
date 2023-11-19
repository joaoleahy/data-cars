import vehicleSupplySchema, {
  VehicleSupplySchema,
} from './vehicle-supply-schema';
import FormControl from '~/components/forms/FormControl';
import AutoComplete, {
  AutoCompleteOptions,
} from '~/components/forms/AutoComplete';
import InputText from '~/components/forms/InputText';

interface VehicleSupplyFormProps {
  formId: string;
  options: AutoCompleteOptions[];
  defaultValues: Partial<VehicleSupplySchema> | null;
  onSubmit: (data: VehicleSupplySchema) => void;
}

function VehicleSupplyForm({
  formId,
  options,
  defaultValues,
  onSubmit,
}: VehicleSupplyFormProps) {
  const handleSubmit = (data: VehicleSupplySchema) => {
    onSubmit(data);
  };

  return (
    <FormControl
      styles={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 2,
      }}
      formId={formId}
      onSubmit={handleSubmit}
      formValidationSchema={vehicleSupplySchema}
      defaultValues={defaultValues}
      render={(control, errors) => (
        <>
          <AutoComplete
            name="veiculoId"
            label="Veículo"
            options={options}
            validation={control}
            invalid={!!errors.veiculoId}
            helperText={errors.veiculoId?.message as string}
            variant="outlined"
            margin="none"
          />
          <InputText
            name="qtdAbastecidaLitros"
            label="Qtd. Abastecida (L)"
            validation={control}
            invalid={!!errors.qtdAbastecidaLitros}
            helperText={errors.qtdAbastecidaLitros?.message as string}
            margin="none"
            variant="outlined"
          />
          <InputText
            name="tipoCombustivel"
            label="Tipo Combustível"
            validation={control}
            invalid={!!errors.tipoCombustivel}
            helperText={errors.tipoCombustivel?.message as string}
            margin="none"
            variant="outlined"
          />
          <InputText
            name="valor"
            label="Valor (R$)"
            validation={control}
            invalid={!!errors.valor}
            helperText={errors.valor?.message as string}
            margin="none"
            variant="outlined"
          />
        </>
      )}
    />
  );
}

export default VehicleSupplyForm;
