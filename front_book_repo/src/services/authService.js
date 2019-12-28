import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndpoint = "users/token/";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login({ username, password }) {
  const { data: token } = await http.post(apiEndpoint, {
    username,
    password
  });
  localStorage.setItem(tokenKey, token.access);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getJwt() {
  const token = localStorage.getItem(tokenKey);
  return token;
}

export function getCurrentUser() {
  try {
    const token = getJwt();
    const decodedToken = jwtDecode(token);
    return decodedToken.username;
  } catch (ex) {
    return null;
  }
}
