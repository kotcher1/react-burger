const url = 'https://norma.nomoreparties.space/api/ingredients'

export const getIngredients = fetch(url).then(res => res.json())