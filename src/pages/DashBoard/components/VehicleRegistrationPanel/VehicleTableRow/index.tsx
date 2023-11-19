import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { Vehicle } from '~/models/Vehicle';
import VehicleDeleteButton from './VehicleDeleteButton';
import VehicleEditButton from './VehicleEditButton';

interface VehicleTableRowProps {
  vehicle: Vehicle;
}

function VehicleTableRow({ vehicle }: VehicleTableRowProps) {
  const { id, placa, renavam, cor, modelo, marca, potencia } = vehicle;

  return (
    <TableRow hover>
      <TableCell>{id}</TableCell>
      <TableCell>{placa}</TableCell>
      <TableCell>{renavam}</TableCell>
      <TableCell>{cor}</TableCell>
      <TableCell>{modelo}</TableCell>
      <TableCell>{marca}</TableCell>
      <TableCell>{potencia}</TableCell>
      <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <VehicleEditButton vehicleId={id} />
        <VehicleDeleteButton vehicleId={id} />
      </TableCell>
    </TableRow>
  );
}

export default VehicleTableRow;
