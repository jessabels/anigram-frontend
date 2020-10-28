const GET_USER = "anigram/user";

export const user = (token, userData) => ({
  type: GET_USER,
  token,
  user: userData,
});

export const getUserInfo = (token) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:8080/api/users/token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const userData = await response.json();
      dispatch(user(token, userData));
    } else {
      throw response;
    }
  } catch (err) {
    const badRequest = await err.json();
    console.log(badRequest);
    const arrayOfErrs = badRequest.error.errors;
    console.log(arrayOfErrs);
  }
};
export default function reducer(state = { user: { user } }, action) {
  switch (action.type) {
    case GET_USER:
      // return {
      //   token: action.token,
      //   user: {
      //     id: action.user.id,
      //     username: action.user.username,
      //     avatar: action.user.avatar,
      //   },
      const newState = {
        token: action.token,
        user: {
          id: action.user.id,
          username: action.user.username,
          avatar: action.user.avatar,
        },
      };
      return {
        ...state,
        ...newState,
      };

    default:
      return state;
  }
}
