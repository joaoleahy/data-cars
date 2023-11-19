import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { VehicleSupply } from '~/models/VehicleSupply';
import VehicleSupplyEditButton from './VehicleSupplyEditButton';
import VehicleSupplyDeleteButton from './VehicleSupplyDeleteButton';

interface VehicleSupplyTableRowProps {
  vehicleSupply: VehicleSupply;
}

function VehicleSupplyTableRow({ vehicleSupply }: VehicleSupplyTableRowProps) {
  const { id, veiculoId, qtdAbastecidaLitros, tipoCombustivel, valor } =
    vehicleSupply;

  return (
    <TableRow hover>
      <TableCell>{id}</TableCell>
      <TableCell>{veiculoId}</TableCell>
      <TableCell>{qtdAbastecidaLitros}</TableCell>
      <TableCell>{tipoCombustivel}</TableCell>
      <TableCell>{valor}</TableCell>
      <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <VehicleSupplyEditButton vehicleSupplyId={id} />
        <VehicleSupplyDeleteButton vehicleSupplyId={id} />
      </TableCell>
    </TableRow>
  );
}

export default VehicleSupplyTableRow;
