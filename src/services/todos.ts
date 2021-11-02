import api from './api';

export async function getTodos() {
  const { data } = await api.get('todos');

  return data;
}
