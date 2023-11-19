import api from '~/lib/axios';

async function deleteVehicle(id: number) {
  await api.delete(`/veiculos/${id}`);
}

export default deleteVehicle;
