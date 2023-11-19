import api from '~/lib/axios';

import { VehicleSupply } from '~/models/VehicleSupply';

async function postVehicleSupply(payload: Omit<VehicleSupply, 'id'>) {
  await api.post('abastecimentos', payload);
}

export default postVehicleSupply;
