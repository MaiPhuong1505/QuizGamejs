import { getDataAPI } from '../utils/fetchData';

export const historyServices = {
  getAllHistories: async (userId, token) => {
    return await getDataAPI(`histories/${userId}`, token);
  },
};
