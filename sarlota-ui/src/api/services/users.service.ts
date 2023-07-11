// Constants
import { BACKEND_URL } from "../../util/constants";

// Methods
import { post } from "../client";

const headers = { "Content-Type": "application/json" };

export interface LoginRequest {
  korisnickoIme: string;
  lozinka: string;
}

export interface LoginResponse {
  token: string;
}

export async function login(body: LoginRequest) {
  const requestOptions = {
    headers,
    body: JSON.stringify(body),
  };

  const response = await post(BACKEND_URL + "login", requestOptions);
  return response;
}

type Role = "POSLASTICAR" | "OBICNI_RADNIK";

export interface SignUpRequest {
  korisnicnoIme: string;
  ime: string;
  prezime: string;
  lozinka: string;
  tipZaposlenog: Role;
}

export async function signUp(body: SignUpRequest) {
  const requestOptions = {
    headers,
    body: JSON.stringify(body),
  };

  const response = await post(BACKEND_URL + "signup", requestOptions);
  return response;
}
