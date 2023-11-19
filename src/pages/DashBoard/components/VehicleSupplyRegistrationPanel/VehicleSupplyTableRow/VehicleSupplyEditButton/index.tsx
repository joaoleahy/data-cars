import { useState, useId } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';

import { VehicleSupplySchema } from '~/pages/DashBoard/components/VehicleSupplyRegistrationPanel/VehicleSupplyForm/vehicle-supply-schema';
import VehicleSupplyForm from '~/pages/DashBoard/components/VehicleSupplyRegistrationPanel/VehicleSupplyForm';
import Dialog from '~/components/Dialog';
import Feedback from '~/components/Feedback';
import getVehicles from '~/services/vehicles/getVehicles';
import getVehicleSupplyById from '~/services/vehicle-supply/getVehicleSupplyById';
import putVehicleSupply from '~/services/vehicle-supply/putVehicleSupply';

interface VehicleSupplyEditButtonProps {
  vehicleSupplyId: number;
}

function VehicleSupplyEditButton({
  vehicleSupplyId,
}: VehicleSupplyEditButtonProps) {
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

  const vehicleSupplyQuery = useQuery({
    queryKey: ['abastecimentos', vehicleSupplyId],
    queryFn: () => getVehicleSupplyById(vehicleSupplyId),
    enabled: open,
    refetchOnWindowFocus: false,
  });

  const vehicleSupplyMutation = useMutation({
    mutationFn: (payload: VehicleSupplySchema) => {
      return putVehicleSupply(payload, vehicleSupplyId);
    },
    onSuccess: (_, payload) => {
      queryClient.invalidateQueries(['abastecimentos'], { exact: true });
      queryClient.setQueryData(['abastecimentos', vehicleSupplyId], payload);
    },
  });

  const vehicleSupplyDataIsLoading =
    vehicleQuery.isLoading && vehicleSupplyQuery.isLoading;

  const vehicleSupplyDataIsError =
    vehicleQuery.isError && vehicleSupplyQuery.isError;

  const vehicleSupplyDataIsSuccess =
    vehicleQuery.isSuccess && vehicleSupplyQuery.isSuccess;

  const vehicleSupplyDataIsDefined =
    vehicleQuery.data !== undefined && vehicleSupplyQuery.data !== undefined;

  const vehicleSupplyDataIsReady =
    vehicleSupplyDataIsDefined && !vehicleSupplyDataIsLoading;

  const handleOpen = () => {
    vehicleSupplyMutation.reset();

    if (vehicleSupplyDataIsError) {
      vehicleQuery.refetch();
      vehicleSupplyQuery.refetch();
    }

    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSubmit = (payload: VehicleSupplySchema) => {
    vehicleSupplyMutation.mutate(payload);
  };

  return (
    <>
      <Dialog
        title="Editar cadastro de abastecimento"
        open={open}
        onClose={handleClose}
        content={
          vehicleSupplyDataIsReady ? (
            <Box sx={{ display: 'grid', gap: 2 }}>
              <Feedback
                successMessage="Cadastro de abastecimento editado com sucesso"
                errorMessage="Não foi possível editar cadastro de abastecimento"
                isLoading={vehicleSupplyMutation.isLoading}
                isError={vehicleSupplyMutation.isError}
                isSuccess={vehicleSupplyMutation.isSuccess}
              />
              <VehicleSupplyForm
                formId={formId}
                options={vehicleQuery.data}
                defaultValues={vehicleSupplyQuery.data}
                onSubmit={handleSubmit}
              />
            </Box>
          ) : (
            <Feedback
              successMessage="Cadastro de abastecimento foi encontrado"
              errorMessage="Não foi possível encontrar dados de abastecimento"
              isLoading={vehicleSupplyDataIsLoading}
              isSuccess={vehicleSupplyDataIsSuccess}
              isError={vehicleSupplyDataIsError}
            />
          )
        }
        actions={
          vehicleSupplyMutation.isError ? (
            <Button onClick={handleClose} variant="contained">
              concluir
            </Button>
          ) : (
            <>
              <Button onClick={handleClose}>cancelar</Button>
              <Button
                form={formId}
                disabled={vehicleSupplyMutation.isLoading}
                type="submit"
                variant="contained"
              >
                Editar
              </Button>
            </>
          )
        }
      />
      <Button
        onClick={handleOpen}
        size="small"
        variant="contained"
        color="warning"
      >
        <EditIcon />
      </Button>
    </>
  );
}

export default VehicleSupplyEditButton;
