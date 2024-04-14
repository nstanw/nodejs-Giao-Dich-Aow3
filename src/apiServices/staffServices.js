import * as request from "../util/request";

export const getInfor = async (path) => {
  const res = await request.get(path);
  return res;
};

export const PostData = async (path, data) => {
  const res = await request.post(path, data);
  return res;
};

export const deleteData = async (path) => {
  const res = await request.deleteStaff(path);
  return res;
};
