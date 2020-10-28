const TOKEN_KEY = "anigram/authentication/token";
const SET_TOKEN = "anigram/authentication/SET_TOKEN";
const REMOVE_TOKEN = "anigram/authentication/REMOVE_TOKEN";

export const setToken = (token) => ({ type: SET_TOKEN, token });
export const removeToken = (token) => ({ type: REMOVE_TOKEN });

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

export const register = (username, password, email) => async (dispatch) => {
  const response = await fetch(`http://localhost:8080/api/users`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, email }),
  });

  if (response.ok) {
    const { token } = await response.json();
    window.localStorage.setItem(TOKEN_KEY, token);
    dispatch(setToken(token));
  }
};

// export const logout = () => async (dispatch, getState) => {
//   const {
//     authentication: { token },
//   } = getState();

//     window.localStorage.removeItem(TOKEN_KEY);
//     dispatch(removeToken());

// };

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_TOKEN: {
      return {
        ...state,
        token: action.token,
      };
    }

    case REMOVE_TOKEN: {
      const newState = { ...state };
      delete newState.token;
      return newState;
    }
    default:
      return state;
  }
}
