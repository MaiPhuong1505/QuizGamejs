import http from './http';

export const getDataAPI = async (url, token) => {
  const res = await http.get(`api/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};

export const postDataAPI = async (url, post, token) => {
  const res = await http.post(`/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const putDataAPI = async (url, post, token) => {
  const res = await http.put(`/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const patchDataAPI = async (url, post, token) => {
  const res = await http.patch(`/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const deleteDataAPI = async (url, token) => {
  const res = await http.delete(`/api/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};
