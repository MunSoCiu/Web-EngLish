import { api } from "./api";

export async function login(email: string, password: string) {
  const res = await api.post("/auth/login", { email, password });
  localStorage.setItem("accessToken", res.data.accessToken);
  return res.data.user;
}

export async function register(name: string, email: string, password: string) {
  return api.post("/auth/register", { name, email, password });
}

export function logout() {
  localStorage.removeItem("accessToken");
}
