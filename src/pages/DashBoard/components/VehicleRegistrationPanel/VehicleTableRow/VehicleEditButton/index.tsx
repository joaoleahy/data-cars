import { useState, useId } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';

import { VehicleSchema } from '~/pages/DashBoard/components/VehicleRegistrationPanel/VehicleForm/vehicle-schema';
import Feedback from '~/components/Feedback';
import Dialog from '~/components/Dialog';
import getVehicleById from '~/services/vehicles/getVechicleById';
import putVehicle from '~/services/vehicles/putVehicle';
import VehicleForm from '../../VehicleForm';

interface VehicleEditButtonProps {
  vehicleId: number;
}

function VehicleEditButton({ vehicleId }: VehicleEditButtonProps) {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const vehicleQuery = useQuery({
    queryKey: ['veiculos', vehicleId],
    queryFn: () => getVehicleById(vehicleId),
    enabled: open,
  });

  const vehicleMutation = useMutation({
    mutationFn: (payload: VehicleSchema) => putVehicle(payload, vehicleId),
    onSuccess: (_, payload) => {
      queryClient.invalidateQueries(['veiculos']);
      queryClient.setQueryData(['veiculos', vehicleId], payload);
    },
  });

  const formId = useId();

  const handleOpen = () => {
    setOpen(true);
    vehicleMutation.reset();
  };
  const handleClose = () => setOpen(false);

  const handleMutation = (paylod: VehicleSchema) => {
    vehicleMutation.mutate(paylod);
  };

  const vehicleDataIsReady =
    vehicleQuery.data !== undefined && !vehicleQuery.isLoading;

  return (
    <>
      <Dialog
        title={`Editar cadastro de veículo id: ${vehicleId}`}
        open={open}
        onClose={handleClose}
        content={
          vehicleDataIsReady ? (
            <Box sx={{ display: 'grid', gap: 2 }}>
              <Feedback
                successMessage="Cadastro do veículo foi editado com sucesso"
                errorMessage="Não foi possível editar cadastro do veículo"
                isLoading={vehicleMutation.isLoading}
                isError={vehicleMutation.isError}
                isSuccess={vehicleMutation.isSuccess}
              />
              <VehicleForm
                formId={formId}
                onSubmit={handleMutation}
                defaultValues={vehicleQuery.data}
              />
            </Box>
          ) : (
            <Feedback
              successMessage="Dados cadastrais encontrados"
              errorMessage="Não foi possível achar dados de cadastro do veículo"
              isError={vehicleQuery.isError}
              isSuccess={vehicleQuery.isSuccess}
              isLoading={vehicleQuery.isLoading}
            />
          )
        }
        actions={
          vehicleQuery.isError ? (
            <Button onClick={handleClose} variant="contained">
              concluir
            </Button>
          ) : (
            <>
              <Button onClick={handleClose}>cancelar</Button>
              <Button
                form={formId}
                disabled={vehicleMutation.isLoading}
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
        variant="contained"
        size="small"
        color="warning"
      >
        <EditIcon />
      </Button>
    </>
  );
}

export default VehicleEditButton;
