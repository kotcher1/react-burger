export const GET_ORDER_ID_REQUEST = 'GET_ORDER_ID_REQUEST';
export const GET_ORDER_ID_SUCCESS = 'GET_ORDER_ID_SUCCESS';
export const GET_ORDER_ID_FAILED = 'GET_ORDER_ID_FAILED';
export const RESET_ORDER = 'RESET_ORDER'

export function addId(ingredients) {
  return function(dispatch) {
    dispatch({
      type: GET_ORDER_ID_REQUEST
    });
    fetch('https://norma.nomoreparties.space/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "ingredients": ingredients,
      })
    })
    .then(res => res.json())
    .catch((err) => {
      dispatch({
        type: GET_ORDER_ID_FAILED
      });
    })
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_ORDER_ID_SUCCESS,
          order: res,
        });
      } else {
        dispatch({
          type: GET_ORDER_ID_FAILED
        });
      }
    });
  }
};
