import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { ISearchResponse } from './types';

export const useSearch = (query: string | undefined) => {
  return useQuery<ISearchResponse, Error>(['search', query], async () => {
    const { data } = await axios.get(`http://localhost:3000/api/items?q=${query}`);
    return data;
  });
};
