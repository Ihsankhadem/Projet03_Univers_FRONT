import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "../types";

export const getStoredAuth = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  return {
    token,
    user: user ? JSON.parse(user) : null,
  };
};

export const isTokenValid = (token: string) => {
  const payload = jwtDecode<JwtPayload>(token);

  if (!payload.exp) return true;

  return payload.exp * 1000 > Date.now();
};
