import api from '~/lib/axios';

import { Vehicle } from '~/models/Vehicle';

async function getVehicles() {
  const { data } = await api.get<Vehicle[]>('/veiculos');

  return data;
}

export default getVehicles;
