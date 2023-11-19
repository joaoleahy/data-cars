import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';

import deleteVehicleSupply from '~/services/vehicle-supply/deleteVehicleSupply';
import Feedback from '~/components/Feedback';
import Dialog from '~/components/Dialog';

interface VehicleSupplyDeleteButtonProps {
  vehicleSupplyId: number;
}

function VehicleSupplyDeleteButton({
  vehicleSupplyId,
}: VehicleSupplyDeleteButtonProps) {
  const queryClient = useQueryClient();

  const { isLoading, isError, isSuccess, mutate, reset } = useMutation({
    mutationFn: (id: number) => deleteVehicleSupply(id),
  });

  const [open, setOpen] = useState(false);

  const handleMutation = () => mutate(vehicleSupplyId);

  const handleClose = () => setOpen(false);

  const handleCloseOnSuccess = () => {
    handleClose();
    queryClient.invalidateQueries(['abastecimentos']);
    queryClient.setQueryData(['abastecimentos', vehicleSupplyId], undefined);
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
        title={`Deletar cadastro de abastecimento id:${vehicleSupplyId}`}
        content={
          <Box sx={{ display: 'grid', gap: 1 }}>
            <Feedback
              successMessage="Cadastro de abastecimento deletado com sucesso"
              errorMessage="Algo deu errado, não foi possível deletar dados"
              isError={isError}
              isLoading={isLoading}
              isSuccess={isSuccess}
            />
            {!isSuccess && (
              <Typography tabIndex={-1} variant="body1">
                Deseja deletar o cadastro de abastecimento do veículo? Essa ação
                não pode ser desfeita.
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

export default VehicleSupplyDeleteButton;
