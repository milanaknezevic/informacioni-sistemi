import { get, post, put, remove } from "../client";

// Constants
import { BACKEND_URL } from "../../util/constants";

const headers = { "Content-Type": "application/json" };

const URL = BACKEND_URL + "kontakti";

export interface Contact {
  id: number;
  ime: string;
  prezime: string;
  brojTelefona: string;
  linkProfila: string;
  email: string;
}

export const fetchContacts = async () => {
  const response = await get(URL);
  return response;
};

export const addContact = async (body: Contact) => {
  const response = await post(URL, {
    headers,
    body: JSON.stringify(body),
  });
  return response;
};

export const deleteContact = async (id: number) => {
  const response = await remove(`${URL}/${id}`);
  return response;
};

export const editContact = async (id: number, body: Contact) => {
  const response = await put(`${URL}/${id}`, {
    headers,
    body: JSON.stringify(body),
  });
  return response;
};

export const searchContacts = async (query: string) => {
  const response = await get(`${URL}/search?query=${query}`);
  return response;
};
