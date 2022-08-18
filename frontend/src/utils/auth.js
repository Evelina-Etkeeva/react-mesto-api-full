import { headers, baseUrl } from "./utils";

function checkResponse(res){
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
}

export const register = (password, email) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    credentials: "include",
    headers: headers,
    body: JSON.stringify({ password, email }),
  }).then(checkResponse);
};

export const login = (password, email) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    credentials: "include",
    headers: headers,
    body: JSON.stringify({ password, email }),
  }).then(checkResponse);
};

export const logout = () => {
  return fetch(`${baseUrl}/signout`, {
    method: "POST",
    credentials: "include",
    headers: headers,
  }).then(checkResponse);
};

export const checkUser = () => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    credentials: "include",
    headers: headers,
  }).then(checkResponse);
};
