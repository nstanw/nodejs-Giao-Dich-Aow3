import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:5000/",
});

export const get = async (path, option) => {
  const response = await request.get(path);
  return response.data;
};

export const post = async (path, data) => {
  const response = await request.post(path, data);
  return response.data;
};

export const deleteStaff = async (path) => {
  const response = await request.delete(path);
  return response.data;
};

export default request;
