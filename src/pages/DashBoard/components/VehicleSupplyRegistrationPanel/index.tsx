import { useQuery } from 'react-query';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import getVehicleSupply from '~/services/vehicle-supply/getVehicleSupply';
import Table from '~/components/Table';
import VehicleSupplyTableRow from './VehicleSupplyTableRow';
import VehicleSupplyAddButton from './VehicleSupplyAddButton';

function VehicleSupplyRegistrationPanel() {
  const { data, isLoading } = useQuery({
    queryKey: ['abastecimentos'],
    queryFn: getVehicleSupply,
    refetchOnWindowFocus: false,
  });

  return (
    <Box sx={{ position: 'relative', minHeight: '100%', padding: 6 }}>
      {isLoading ? (
        <CircularProgress
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            margin: 'auto',
          }}
        />
      ) : (
        <>
          <VehicleSupplyAddButton />
          {data && (
            <Table
              styles={{ marginTop: 3, maxHeight: '70vh' }}
              headings={[
                'id',
                'veículo ID',
                'Qtd. Abastecida (L)',
                'Tipo Combustível',
                'valor (R$)',
                'ações',
              ]}
            >
              {data.map((vehicleSupply) => (
                <VehicleSupplyTableRow
                  key={vehicleSupply.id}
                  vehicleSupply={vehicleSupply}
                />
              ))}
            </Table>
          )}
        </>
      )}
    </Box>
  );
}

export default VehicleSupplyRegistrationPanel;
