import { api } from "../config";
import { getMyPosts } from "./posts";
const TOKEN_KEY = "anigram/authentication/token";
const SET_TOKEN = "anigram/authentication/SET_TOKEN";
const REMOVE_TOKEN = "anigram/authentication/REMOVE_TOKEN";
const SET_CURRENT_USER = "SET_CURRENT_USER";
const ERRORS_ARRAY_LOGIN = "anigram/errors/login";
const ERRORS_ARRAY_SIGNUP = "anigram/errors/signup";

export const setToken = (token) => ({ type: SET_TOKEN, token });
export const removeToken = (token) => ({ type: REMOVE_TOKEN });
export const setCurrentUser = (userId, username, avatar, likes) => ({
  type: SET_CURRENT_USER,
  userId,
  username,
  avatar,
  likes,
});

export const handleErrors = (errors) => {
  return {
    type: ERRORS_ARRAY_LOGIN,
    errors,
  };
};

export const handleSignupErrors = (errors) => {
  return {
    type: ERRORS_ARRAY_SIGNUP,
    errors,
  };
};

export const loadToken = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN_KEY);
  if (token) {
    dispatch(setToken(token));
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
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
    } else {
      throw response;
    }
  } catch (err) {
    const badRequest = await err.json();
    const errors = badRequest.error;
    dispatch(handleErrors(errors));
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
    dispatch(getMyPosts());
    return user;
  }
};

export const register = (username, password, email, confirmPassword) => async (
  dispatch
) => {
  try {
    const response = await fetch(`${api}/users`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email, confirmPassword }),
    });

    if (response.ok) {
      const { token, user } = await response.json();
      window.localStorage.setItem(TOKEN_KEY, token);
      window.localStorage.setItem("userId", user.id);
      dispatch(setToken(token));
      dispatch(loadUserInfo());
    } else {
      throw response;
    }
  } catch (err) {
    const badRequest = await err.json();
    const errors = badRequest.error;
    dispatch(handleSignupErrors(errors));
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
    case ERRORS_ARRAY_LOGIN: {
      return {
        ...state,
        loginErrors: action.errors,
      };
    }

    case ERRORS_ARRAY_SIGNUP: {
      return {
        ...state,
        signupErrors: action.errors,
      };
    }

    default:
      return state;
  }
}
