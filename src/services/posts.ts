import api from './api';

export async function getPosts() {
  const { data } = await api.get('posts');

  return data;
}
