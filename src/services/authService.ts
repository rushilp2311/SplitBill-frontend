import jwtDecode from "jwt-decode";
import http from "./httpService";

const apiEndpoint = "/auth";
const tokenKey = "token";

type User = {
  email: string;
  name: string;
  _id: string;
  id?: string;
};

export async function login(email: string, password: string) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}
export function logout() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem("currentPage");
}

export function loginWithJwt(jwt: any) {
  localStorage.setItem(tokenKey, jwt);
}

export function getCurrentUser(): User | null {
  try {
    const jwt = localStorage.getItem(tokenKey) || "";
    const user: User = jwtDecode(jwt);
    return { ...user, id: user._id };
  } catch (ex) {
    return null;
  }
}

export async function pingServer() {
  const { data } = await http.get(`${apiEndpoint}/ping`);
  return data;
}
