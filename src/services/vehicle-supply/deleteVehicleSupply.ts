import api from '~/lib/axios';

async function deleteVehicleSupply(vehicleSupplyId: number) {
  await api.delete(`abastecimentos/${vehicleSupplyId}`);
}

export default deleteVehicleSupply;
