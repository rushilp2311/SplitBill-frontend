import jwtDecode from "jwt-decode";
import http from "./httpService";

const apiEndpoint = "/auth";
const tokenKey = "token";

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

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey) || "";
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}
