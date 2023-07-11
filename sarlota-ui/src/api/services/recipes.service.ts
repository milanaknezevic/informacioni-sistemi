import { BACKEND_URL } from "../../util/constants";
import { get, post, put, remove } from "../client";

const URL = BACKEND_URL + "recepti";

const headers = { "Content-Type": "application/json" };

export interface Recipe {
  id: number;
  naslov: string;
  priprema: string;
  sastojci: string;
  fotografija: string;
  omiljeni: boolean;
}

export interface RecipeResponse {
  recept: Recipe;
  namirnice: Namirnice[];
  trosakIzrade: number;
}

export interface Namirnice {
  namirnica: Namirnica;
  kolicina: number;
  cijena: number;
}

export interface Namirnica {
  id: number;
  naziv: string;
  cijenaPoJedinici: number;
  jedinica: string;
}

export const fetchRecipes = async () => {
  const response = await get(URL);
  return response;
};

export const fetchRecipe = async (id: number) => {
  const response = await get(`${URL}/${id}`);
  return response;
};

export const addRecipe = async (body: string) => {
  const response = await post(URL, {
    headers,
    body,
  });
  return response;
};

export const deleteRecipe = async (id: number) => {
  const response = await remove(`${URL}/${id}`);
  return response;
};

export const editRecipe = async (id: number, body: Recipe) => {
  const response = await put(`${URL}/${id}`, {
    headers,
    body: JSON.stringify(body),
  });
  return response;
};

export const searchRecipes = async (query: string) => {
  const response = await get(`${URL}/search?query=${query}`);
  return response;
};

export const toggleFavorite = async (id: number) => {
  await get(`${URL}/toggle-favorite/${id}`);
};
