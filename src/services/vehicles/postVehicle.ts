import api from '~/lib/axios';

import { Vehicle } from '~/models/Vehicle';

async function postVehicle(payload: Omit<Vehicle, 'id'>) {
  await api.post('/veiculos', payload);
}

export default postVehicle;
