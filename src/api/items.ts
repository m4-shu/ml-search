import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { IItemDetailProps } from './types';

export const useItemDetail = (id: string | undefined) => {
  return useQuery<IItemDetailProps, Error>(['item', id], async () => {
    const { data } = await axios.get(`http://localhost:3000/api/items/${id}`);
    return data;
  });
};
