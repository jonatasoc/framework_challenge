import api from './api';

export async function getAlbums() {
  const { data } = await api.get('albums');

  return data;
}
