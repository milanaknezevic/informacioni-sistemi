import { RcFile } from "antd/es/upload";
import moment from "moment";

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getBase64 = (img: RcFile) => {
  const reader = new FileReader();
  // reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
  return reader.result as string;
};

export const formatDate = (date: Date = new Date()) => {
  return moment(date).locale("bs").format("ll");
};
