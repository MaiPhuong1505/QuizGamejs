import { getDataAPI } from '../utils/fetchData';

export const categoryServices = {
  getCategories: async (token) => {
    return await getDataAPI('/categories', token);
  },
};
