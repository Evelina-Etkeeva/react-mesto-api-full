import { baseUrlAuth } from "./utils";

function checkResponse(res){
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
}

export const register = (password, email) => {
  return fetch(`${baseUrlAuth}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then(checkResponse);
};

export const login = (password, email) => {
  return fetch(`${baseUrlAuth}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then(checkResponse);
};

export const checkUser = (jwt) => {
  return fetch(`${baseUrlAuth}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then(checkResponse);
};
