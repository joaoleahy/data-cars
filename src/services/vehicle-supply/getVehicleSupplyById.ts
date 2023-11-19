import api from '~/lib/axios';

import { VehicleSupply } from '~/models/VehicleSupply';

async function getVehicleSupplyById(vehicleId: number) {
  const { data } = await api.get<VehicleSupply>(`abastecimentos/${vehicleId}`);

  return data;
}

export default getVehicleSupplyById;
