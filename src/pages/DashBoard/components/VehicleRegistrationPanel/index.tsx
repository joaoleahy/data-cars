import { useQuery } from 'react-query';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import Table from '~/components/Table';
import getVehicles from '~/services/vehicles/getVehicles';
import VehicleTableRow from './VehicleTableRow';
import VehicleAddButton from './VehicleAddButton';

function VehicleRegistrationPanel() {
  const { data, isLoading } = useQuery({
    queryKey: ['veiculos'],
    queryFn: getVehicles,
    refetchOnWindowFocus: false,
  });

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100%',
        padding: 6,
      }}
    >
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
          <VehicleAddButton />
          {data && (
            <Table
              styles={{ marginTop: 3, maxHeight: '70vh' }}
              headings={[
                'id',
                'placa',
                'renavam',
                'cor',
                'modelo',
                'marca',
                'potência',
                'ações',
              ]}
            >
              {data.map((vehicle) => (
                <VehicleTableRow key={vehicle.id} vehicle={vehicle} />
              ))}
            </Table>
          )}
        </>
      )}
    </Box>
  );
}

export default VehicleRegistrationPanel;
