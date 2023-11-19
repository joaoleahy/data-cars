import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';

import Feedback from '~/components/Feedback';
import Dialog from '~/components/Dialog';
import deleteVehicle from '~/services/vehicles/deleteVehicle';

interface VehicleDeleteButtonProps {
  vehicleId: number;
}

function VehicleDeleteButton({ vehicleId }: VehicleDeleteButtonProps) {
  const queryClient = useQueryClient();

  const { isLoading, isError, isSuccess, mutate, reset } = useMutation({
    mutationFn: (id: number) => deleteVehicle(id),
  });

  const [open, setOpen] = useState(false);

  const handleMutation = () => mutate(vehicleId);

  const handleClose = () => setOpen(false);

  const handleCloseOnSuccess = () => {
    handleClose();
    queryClient.invalidateQueries(['veiculos']);
    queryClient.setQueryData(['veiculos', vehicleId], undefined);
  };

  const handleOpen = () => {
    setOpen(true);
    reset();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={isSuccess ? handleCloseOnSuccess : handleClose}
        title={`Deletar cadastro de veículo id: ${vehicleId}`}
        content={
          <Box sx={{ display: 'grid', gap: 1 }}>
            <Feedback
              successMessage="Dados cadastrais do veículo deletados com sucesso"
              errorMessage="Algo deu errado, não foi possível deletar dados"
              isError={isError}
              isLoading={isLoading}
              isSuccess={isSuccess}
            />
            {!isSuccess && (
              <Typography tabIndex={-1} variant="body1">
                Deseja deletar os dados de cadastro do veículo? Essa ação não
                pode ser desfeita.
              </Typography>
            )}
          </Box>
        }
        actions={
          isSuccess ? (
            <Button onClick={handleCloseOnSuccess} variant="contained">
              Concluir
            </Button>
          ) : (
            <>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button
                variant="contained"
                onClick={handleMutation}
                disabled={isLoading}
              >
                Prosseguir
              </Button>
            </>
          )
        }
      />
      <Button
        onClick={handleOpen}
        color="error"
        variant="contained"
        size="small"
      >
        <DeleteIcon />
      </Button>
    </>
  );
}

export default VehicleDeleteButton;
