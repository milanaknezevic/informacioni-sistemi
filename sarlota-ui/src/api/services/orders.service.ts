import { BACKEND_URL } from "../../util/constants";
import { get, post, put, remove } from "../client";

const URL = BACKEND_URL + "narudzbe";

const headers = { "Content-Type": "application/json" };

export interface Orders {
  id: number;
  datumPrijema: string;
  datumIsporuke: string;
  slika: string;
  napomene: string;
  aktivna: boolean;
  imeNarucioca: string;
  kontakt: string;
  adresa: string;
  brojKomada: number;
  naziv: string;
  velicina: string;
  cijena: number;
  nazivRecepta: string;
}

export const fetchOrders = async () => {
  const response = await get(URL);
  return response;
};
export const changeStatus = async (id: number) => {
  // console.log(body)
  const response = await put(`${URL}/changeStatus/${id}`, {
    headers,
  });
  return response;
};

export const addOrder = async (body: Orders) => {
  const response = await post(URL, {
    headers,
    body: JSON.stringify(body),
  });
  return response;
};

export const deleteOrder = async (id: number) => {
  const response = await remove(`${URL}/${id}`);
  return response;
};

export const editOrder = async (id: number, body: Orders) => {
  const response = await put(`${URL}/${id}`, {
    headers,
    body: JSON.stringify(body),
  });
  return response;
};

export const searchOrders = async (today: string, tomorrow?: string) => {
  const response = await get(
    `${URL}/filter?today=` + today + `&tomorrow=` + tomorrow,
    {
      headers,
    }
  );
  return response;
};

export const searchOrdersByPersonName = async (value: string) => {
  const response = await get(`${URL}/search/narucilac?query=` + value, {
    headers,
  });
  return response;
};
