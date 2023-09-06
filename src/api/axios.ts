import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/sick',
});

export const getDisease = async (name: string) => {
  const res = await axiosInstance.get(`?q=${name}`);
  return res;
};
