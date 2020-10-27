const TOKEN_KEY = "anigram/authentication/token";
const SET_TOKEN = "anigram/authentication/SET_TOKEN";

export const setToken = (token) => ({ type: SET_TOKEN, token });

export const loadToken = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN_KEY);
  if (token) {
    dispatch(setToken(token));
  }
};

export const login = (email, password) => async (dispatch) => {
  const response = await fetch(`http://localhost:8080/api/session`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const { token } = await response.json();
    window.localStorage.setItem(TOKEN_KEY, token);
    dispatch(setToken(token));
  }
};

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_TOKEN: {
      return {
        ...state,
        token: action.token,
      };
    }

    default:
      return state;
  }
}
