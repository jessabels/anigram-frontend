import { api } from "../config";

import { handleErrors, loadUserInfo } from "./authentication";

const TOKEN_KEY = "anigram/authentication/token";
const LOAD_POSTS = "anigram/posts";
const LIKE_POST = "anigram/posts/like";
const UNLIKE_POST = "anigram/posts/unlike";
const ERRORS_ARRAY_FORM = "anigram/errors/form";

export const loadPosts = (posts) => ({ type: LOAD_POSTS, posts });

export const like = (likes) => ({ type: LIKE_POST, likes });
export const unlike = (likes) => ({ type: UNLIKE_POST, likes });

export const handleFormErrors = (errors) => {
  return {
    type: ERRORS_ARRAY_FORM,
    errors,
  };
};

export const getAllPosts = () => async (dispatch) => {
  const token = localStorage.getItem(TOKEN_KEY);
  const response = await fetch(`${api}/posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.ok) {
    const posts = await response.json();
    dispatch(loadPosts(posts));
  }
};

export const getMyPosts = () => async (dispatch) => {
  const token = localStorage.getItem(TOKEN_KEY);
  const response = await fetch(`${api}/posts/myPosts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    const posts = await response.json();
    dispatch(loadPosts(posts));
  }
};

export const likePost = (postId) => async (dispatch) => {
  const token = localStorage.getItem(TOKEN_KEY);
  const userId = localStorage.getItem("userId");
  const response = await fetch(`${api}/posts/${postId}/likes`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, postId }),
  });
  if (response.ok) {
    const likes = await response.json();
    dispatch(like(likes));
    dispatch(loadUserInfo());
    dispatch(getAllPosts());
  }
};

export const unlikePost = (postId) => async (dispatch) => {
  const token = localStorage.getItem(TOKEN_KEY);
  const response = await fetch(`${api}/posts/${postId}/likes`, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.ok) {
    const likes = await response.json();
    dispatch(unlike(likes));
    dispatch(loadUserInfo());
    dispatch(getAllPosts());
  }
};

export const createPost = (data) => async (dispatch, getState) => {
  const {
    authentication: { token },
  } = getState();

  try {
    const response = await fetch(`${api}/posts`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    if (response.ok) {
      const newPost = await response.json();
      dispatch(getAllPosts());
      return newPost;
    } else {
      throw response;
    }
  } catch (err) {
    const badRequest = await err.json();
    const errors = badRequest.error;
    await dispatch(handleFormErrors(errors));
  }
};

export const deletePost = (postId) => async (dispatch, getState) => {
  const {
    authentication: { token },
  } = getState();

  try {
    const response = await fetch(`${api}/posts/${postId}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      dispatch(getMyPosts());
    } else {
      throw response;
    }
  } catch (err) {
    console.log(err);
  }
};

export default function reducer(state = {}, action) {
  switch (action.type) {
    case LOAD_POSTS: {
      return {
        ...state,
        posts: action.posts,
      };
    }
    case LIKE_POST: {
      return {
        ...state,
        likes: action.likes,
      };
    }
    case ERRORS_ARRAY_FORM: {
      return {
        ...state,
        formErrors: action.errors,
      };
    }

    default:
      return state;
  }
}
