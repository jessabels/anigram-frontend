import { loadUserInfo } from "./authentication";

const TOKEN_KEY = "anigram/authentication/token";
const LOAD_POSTS = "anigram/posts";
const LIKE_POST = "anigram/posts/like";
const UNLIKE_POST = "anigram/posts/unlike";
// const CREATE_POST = "anigram/posts/create";

export const loadPosts = (posts) => ({ type: LOAD_POSTS, posts });

export const like = (likes) => ({ type: LIKE_POST, likes });
export const unlike = (likes) => ({ type: UNLIKE_POST, likes });
// export const post = (post) => ({ type: CREATE_POST, post });

export const getAllPosts = () => async (dispatch) => {
  const token = localStorage.getItem(TOKEN_KEY);
  const response = await fetch(`http://localhost:8080/api/posts`, {
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
  const response = await fetch(
    `http://localhost:8080/api/posts/${postId}/likes`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId, postId }),
    }
  );
  if (response.ok) {
    const likes = await response.json();
    dispatch(like(likes));
    dispatch(loadUserInfo());
  }
};

export const unlikePost = (postId) => async (dispatch) => {
  const token = localStorage.getItem(TOKEN_KEY);
  const response = await fetch(
    `http://localhost:8080/api/posts/${postId}/likes`,
    {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (response.ok) {
    const likes = await response.json();
    dispatch(unlike(likes));
    dispatch(loadUserInfo());
  }
};

export const createPost = (data) => async (dispatch, getState) => {
  const {
    authentication: { token },
  } = getState();
  const response = await fetch(`http://localhost:8080/api/posts`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });

  if (response.ok) {
    const newPost = await response.json();
    // dispatch(post(newPost));
    dispatch(getAllPosts());
    return newPost;
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
    // case CREATE_POST: {
    //   return {
    //     ...state,
    //     posts: { ...state.posts, ...action.post },
    //   };
    // }
    default:
      return state;
  }
}
