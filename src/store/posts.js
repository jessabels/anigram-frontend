const LOAD_POSTS = "anigram/posts";
const TOKEN_KEY = "anigram/authentication/token";

export const loadPosts = (posts) => ({ type: LOAD_POSTS, posts });

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

export default function reducer(state = {}, action) {
  switch (action.type) {
    case LOAD_POSTS: {
      return {
        ...state,
        posts: action.posts,
      };
    }
    default:
      return state;
  }
}
