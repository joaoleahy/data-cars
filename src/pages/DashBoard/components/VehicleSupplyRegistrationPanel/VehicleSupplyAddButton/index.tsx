import { useState, useId } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';

import { VehicleSupplySchema } from '~/pages/DashBoard/components/VehicleSupplyRegistrationPanel/VehicleSupplyForm/vehicle-supply-schema';
import VehicleSupplyForm from '~/pages/DashBoard/components/VehicleSupplyRegistrationPanel/VehicleSupplyForm';
import Dialog from '~/components/Dialog';
import Feedback from '~/components/Feedback';
import getVehicles from '~/services/vehicles/getVehicles';
import postVehicleSupply from '~/services/vehicle-supply/postVehicleSupply';

function VehicleSupplyAddButton() {
  const [open, setOpen] = useState(false);

  const formId = useId();

  const queryClient = useQueryClient();

  const vehicleQuery = useQuery({
    queryKey: ['veiculos'],
    queryFn: getVehicles,
    refetchOnWindowFocus: false,
    select: (vehicles) => {
      return vehicles.map((vehicle) => ({
        id: vehicle.id.toString(),
        label: `${vehicle.modelo} (id:${vehicle.id})`,
      }));
    },
  });

  const vehicleSupplyMutation = useMutation({
    mutationFn: (payload: VehicleSupplySchema) => postVehicleSupply(payload),
    onSuccess: () =>
      queryClient.invalidateQueries(['abastecimentos'], { exact: true }),
  });

  const handleOpen = () => {
    vehicleSupplyMutation.reset();
    if (vehicleQuery.isError) vehicleQuery.refetch();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleSubmit = (payload: VehicleSupplySchema) => {
    vehicleSupplyMutation.mutate(payload);
  };

  const vehicleDataIsReady =
    vehicleQuery.data !== undefined && !vehicleQuery.isLoading;

  return (
    <>
      <Dialog
        title="Cadastrar novo abastecimento"
        open={open}
        onClose={handleClose}
        content={
          vehicleDataIsReady ? (
            <Box sx={{ display: 'grid', gap: 2 }}>
              <Feedback
                successMessage="Cadastro de abastecimento realizado com sucesso"
                errorMessage="Não foi possível cadastrar abastecimento"
                isLoading={vehicleSupplyMutation.isLoading}
                isSuccess={vehicleSupplyMutation.isSuccess}
                isError={vehicleSupplyMutation.isError}
              />
              <VehicleSupplyForm
                formId={formId}
                options={vehicleQuery.data}
                onSubmit={handleSubmit}
                defaultValues={null}
              />
            </Box>
          ) : (
            <Feedback
              successMessage="Cadastro dos veículos encontrados com sucesso"
              errorMessage="Não foi possível encontrar veículos cadastrados"
              isLoading={vehicleQuery.isLoading}
              isSuccess={vehicleQuery.isSuccess}
              isError={vehicleQuery.isError}
            />
          )
        }
        actions={
          <>
            <Button onClick={handleClose}>cancelar</Button>
            <Button
              form={formId}
              disabled={vehicleSupplyMutation.isLoading}
              type="submit"
              variant="contained"
            >
              cadastrar
            </Button>
          </>
        }
      />
      <Button
        onClick={handleOpen}
        variant="contained"
        endIcon={<LocalGasStationIcon />}
      >
        cadastrar abastecimento
      </Button>
    </>
  );
}

export default VehicleSupplyAddButton;
