import { CREATE_POST, GET_POSTS, POSTS_LOADING } from "../types";

const initial = {
  post: null,
  posts: [],
  loading: false
}

export default function posts(state = initial, action = {}) {
  switch (action.type) {
    case CREATE_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case POSTS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    default:
      return state;

  }
}
