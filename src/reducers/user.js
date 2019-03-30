import { USER_LOGGED_IN, USER_LOGGED_OUT, USER_SIGNED_UP, DELETE_USER_ACCOUNT } from "../types";
import isEmpty from "../validations/isEmpty";

const initial = {
  isAuthenticated: false,
  user: {}
}

export default function user(state = initial, action = {}) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    case USER_LOGGED_OUT:
      return initial;
    case USER_SIGNED_UP:
      return action.user;
    case DELETE_USER_ACCOUNT:
        return {};
    default:
      return state;

  }
}
