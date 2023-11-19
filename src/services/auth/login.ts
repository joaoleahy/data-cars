import api from '~/lib/axios';

import { User } from '~/models/User';

async function login(cpf: string) {
  const { data } = await api.get<User[]>(`/usuarios?cpf=${cpf}`);

  if (data.length === 0) {
    throw new Error('User not found');
  }

  return data[0];
}

export default login;
