import { BACKEND_URL } from "../../util/constants";
import { get, post } from "../client";

const URL = BACKEND_URL + "nabavke";
const headers = { "Content-Type": "application/json" };

export interface Nabavka {
  id: number;
  datum: Date;
  cijena: number;
  namirnice: Namirnice[];
}

export interface Namirnice {
  namirnica: Namirnica;
  cijena: number;
  kolicina: number;
}

export interface Namirnica {
  id: number;
  naziv: string;
  cijenaPoJedinici: number;
  jedinica: string;
}

export const fetchPurchases = async () => {
  const response = await get(URL, { headers });
  return response;
};

export const addPurchase = async (body: string) => {
  const response = await post(URL, { headers, body });
  return response;
};

export const addFoodStuff = async (body: Namirnica) => {
  const response = await post(BACKEND_URL + "namirnice", {
    headers,
    body: JSON.stringify(body),
  });
  return response;
};

export const fetchIngredients = async () => {
  const response = await get(BACKEND_URL + "namirnice", { headers });
  return response;
};
