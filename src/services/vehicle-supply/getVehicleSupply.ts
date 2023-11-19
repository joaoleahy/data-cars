import api from '~/lib/axios';

import { VehicleSupply } from '~/models/VehicleSupply';

async function getVehicleSupply() {
  const { data } = await api.get<VehicleSupply[]>('/abastecimentos');

  return data;
}

export default getVehicleSupply;
