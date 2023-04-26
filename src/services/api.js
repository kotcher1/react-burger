const url = 'https://norma.nomoreparties.space/api'

export const getIngredients = fetch(`${url}/ingredients`).then(res => res.json())

export const sendEmailForReset = async (email) => {
  return await fetch(`${url}/password-reset`, {
    method: 'POST',
    body: JSON.stringify(email),
  })
  .then(res => res.json())
}

export const sendNewPassword = async (password, token) => {
  return await fetch(`${url}/password-reset/reset`, {
    method: 'POST',
    body: JSON.stringify(password, token),
  })
  .then(res => res.json())
}

export const createUser = async (name, email, password) => {
  return await fetch(`${url}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "email": email, 
      "password": password, 
      "name": name
    }),
  })
  .then(res => res.json())
}