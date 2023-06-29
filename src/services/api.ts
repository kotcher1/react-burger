import { CustomResponse, TResponseBody, TUser } from "../utils/types";

const url = 'https://norma.nomoreparties.space/api'

export const getIngredients = fetch(`${url}/ingredients`).then(res => res.json())

export const createUser = async ({name, email, password}: {name: string, email: string, password: string}):
Promise<CustomResponse<TResponseBody & TUser>> => {
  return await fetch(`${url}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "email": email, 
      "password": password, 
      "name": name,
    }),
  })
}

export const getUserRequest = async (token: string):
Promise<CustomResponse<TResponseBody & TUser>> =>
  await fetch(`${url}/auth/user`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  });

export const updateUserRequest = async (token: string, form: {email: string, name: string, password: string}):
Promise<CustomResponse<TResponseBody & TUser>> =>
  await fetch(`${url}/auth/user`, {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  });

export const loginRequest = async (form: {email: string, password: string}):
Promise<CustomResponse<TResponseBody & TUser>> => {
  return await fetch(`${url}/auth/login`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  });
};

export const logoutRequest = async (token: string):
Promise<CustomResponse<TResponseBody>> => {
  return await fetch(`${url}/auth/logout`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({token})
  });
};

export const forgotPasswordRequest = async (email: string):
Promise<CustomResponse<TResponseBody>> => {
  return await fetch(`${url}/password-reset`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({"email": email})
  });
};

export const changePasswordRequest = async (form: {password: string, token: string}):
Promise<CustomResponse<TResponseBody>> => {
  return await fetch(`${url}/password-reset/reset`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  });
};

export const getTokenRequest = async (form: {token: string}):
Promise<CustomResponse<TResponseBody>> => {
  return await fetch(`${url}/auth/token`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  })
  .then(res => res.json())
  .catch(err => console.log(err))
};