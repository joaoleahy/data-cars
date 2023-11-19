import api from '~/lib/axios';

import { VehicleSupply } from '~/models/VehicleSupply';

async function putVehicleSupply(
  payload: Omit<VehicleSupply, 'id'>,
  vehicleId: number
) {
  await api.put(`abastecimentos/${vehicleId}`, payload);
}

export default putVehicleSupply;
