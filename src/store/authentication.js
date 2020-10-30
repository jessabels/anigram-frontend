import { api } from "../config";
const TOKEN_KEY = "anigram/authentication/token";
const SET_TOKEN = "anigram/authentication/SET_TOKEN";
const REMOVE_TOKEN = "anigram/authentication/REMOVE_TOKEN";
const SET_CURRENT_USER = "SET_CURRENT_USER";
export const setToken = (token) => ({ type: SET_TOKEN, token });
export const removeToken = (token) => ({ type: REMOVE_TOKEN });
export const setCurrentUser = (userId, username, avatar, likes) => ({
  type: SET_CURRENT_USER,
  userId,
  username,
  avatar,
  likes,
});

export const loadToken = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN_KEY);
  if (token) {
    dispatch(setToken(token));
  }
};

export const login = (email, password) => async (dispatch) => {
  const response = await fetch(`${api}/session`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const data = await response.json();
    const { token, userId, username, avatar, likes } = data;
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem("userId", userId);

    dispatch(setToken(token));
    dispatch(setCurrentUser(userId, username, avatar, likes));
  }
};

export const loadUserInfo = () => async (dispatch) => {
  const userId = window.localStorage.getItem("userId");
  const response = await fetch(`${api}/users/${userId}`);
  const data = await response.json();
  const { username, avatar, likes } = data;
  dispatch(setCurrentUser(userId, username, avatar, likes));
};

export const updateAvatar = (avatar) => async (dispatch, getState) => {
  const {
    authentication: { token, userId },
  } = getState();

  const response = await fetch(`${api}/users/${userId}`, {
    method: "put",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ avatar }),
  });

  if (response.ok) {
    const user = await response.json();
    dispatch(loadUserInfo());
    return user;
  }
};

export const register = (username, password, email) => async (dispatch) => {
  const response = await fetch(`${api}/users`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, email }),
  });

  if (response.ok) {
    const { token, user } = await response.json();
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem("userId", user.id);
    dispatch(setToken(token));
    dispatch(loadUserInfo());
  }
};

export const logout = () => async (dispatch, getState) => {
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem("userId");
  dispatch(removeToken());
};

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_TOKEN: {
      return {
        ...state,
        token: action.token,
      };
    }
    case SET_CURRENT_USER: {
      return {
        ...state,
        userId: action.userId,
        username: action.username,
        avatar: action.avatar,
        likes: action.likes,
      };
    }

    case REMOVE_TOKEN: {
      return {};
    }
    default:
      return state;
  }
}
