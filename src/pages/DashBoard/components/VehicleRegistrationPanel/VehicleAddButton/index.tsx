import { useState, useId } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

import { VehicleSchema } from '~/pages/DashBoard/components/VehicleRegistrationPanel/VehicleForm/vehicle-schema';
import Dialog from '~/components/Dialog';
import Feedback from '~/components/Feedback';
import postVehicle from '~/services/vehicles/postVehicle';
import VehicleForm from '../VehicleForm';

function VehicleAddButton() {
  const formId = useId();

  const queryClient = useQueryClient();

  const { isLoading, isError, isSuccess, mutate, reset } = useMutation({
    mutationFn: (payload: VehicleSchema) => postVehicle(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(['veiculos'], { exact: true });
    },
  });

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    reset();
  };

  const handleClose = () => setOpen(false);

  const handleMutation = (payload: VehicleSchema) => mutate(payload);

  return (
    <>
      <Dialog
        title="Cadastrar novo veículo"
        open={open}
        onClose={handleClose}
        content={
          <>
            <Box sx={{ marginBottom: 2 }}>
              <Feedback
                successMessage="Cadastro de veículo realizado com sucesso"
                errorMessage="Não foi possível realizar o cadastro do veículo"
                isLoading={isLoading}
                isError={isError}
                isSuccess={isSuccess}
              />
            </Box>
            {!isLoading && (
              <VehicleForm
                formId={formId}
                onSubmit={handleMutation}
                defaultValues={null}
              />
            )}
          </>
        }
        actions={
          <>
            <Button onClick={handleClose}>cancelar</Button>
            <Button form={formId} type="submit" variant="contained">
              cadastrar
            </Button>
          </>
        }
      />
      <Button
        onClick={handleOpen}
        variant="contained"
        endIcon={<DirectionsCarIcon />}
      >
        cadastrar veículo
      </Button>
    </>
  );
}

export default VehicleAddButton;
