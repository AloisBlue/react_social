import { combineReducers } from "redux";
import user from "./reducers/user";
import errors from "./reducers/error";
import profiles from "./reducers/profile";
import posts from "./reducers/post";

export default combineReducers({
  user,
  errors,
  profiles,
  posts
})
