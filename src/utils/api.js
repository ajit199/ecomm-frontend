import axiosInstance from "./axios";
import Cookies from "js-cookie";

async function getData(url) {
  const response = await axiosInstance.get(`${url}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
  const data = response.data;
  return data;
}

async function postData(url, data) {
  const response = await axiosInstance.post(`${url}`, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
  const resData = response.data;
  return resData;
}

async function patchData(url, data) {
  const response = await axiosInstance.patch(`${url}`, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
  const resData = response.data;
  return resData?.data;
}

export { getData, postData, patchData };
