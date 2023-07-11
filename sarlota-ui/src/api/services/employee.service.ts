import { BACKEND_URL } from "../../util/constants";
import { get, post, put, remove } from "../client";

const URL = BACKEND_URL + "zaposleni";

const headers = { "Content-Type": "application/json" };

export interface Employee {
  id: number;
  ime: string;
  prezime: string;
  korisnickoIme?: string;
  plata: number;
  tipZaposlenog: string;
  fotografija: string;
}

export const fetchEmployees = async () => {
  const response = await get(URL);
  return response;
};

export const addEmployee = async (body: Employee) => {
  const response = await post(URL, {
    headers,
    body: JSON.stringify(body),
  });
  return response;
};

export const deleteEmployee = async (id: number) => {
  const response = await remove(`${URL}/${id}`);
  return response;
};

export const editEmployee = async (id: number, body: any) => {
  const response = await put(`${URL}/${id}/edit`, {
    headers,
    body: JSON.stringify(body),
  });
  return response;
};

export const updateEmployee = async (id: number, body: any) => {
  // console.log(body)
  const response = await put(`${URL}/${id}`, {
    headers,
    body: JSON.stringify(body),
  });
  return response;
};

export const searchEmployees = async (query: string) => {
  const response = await get(`${URL}/search?query=${query}`);
  return response;
};

