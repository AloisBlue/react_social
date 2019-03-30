import { CREATE_POST, GET_POSTS, POSTS_LOADING, LIKE_POST } from "../types";
import api from "../api";
import { clearError } from "./auth";
import { getErrors } from "./profiles";

export const createUserPost = (data) => ({
  type: CREATE_POST,
  payload: data
});

export const getAllPosts = (data) => ({
  type: GET_POSTS,
  payload: data
});

export const postsLoading = () => ({
  type: POSTS_LOADING
});

export const likeThePost = (data) => ({
  type: LIKE_POST,
  payload: data
})

export const createPost = (addPost) => (dispatch) => {
  api.post
    .createPost(addPost)
    .then(post => {
      dispatch(clearError());
      dispatch(createUserPost(post));
      // window.location.reload(true);
    })
    .catch(err => {
      dispatch(getErrors(err));
    });
}

export const getPosts = () => (dispatch) => {
  dispatch(postsLoading());
  api.post
    .getPosts()
    .then(posts => {
      dispatch(clearError());
      dispatch(getAllPosts(posts));
    })
    .catch(err => {
      dispatch({
        type: GET_POSTS,
        payload: err
      });
    })
}

export const likePost = () => (dispatch) => {
  api.post
    .likePost()
    .then(like => {
      dispatch(clearError());
      dispatch(getAllPosts());
    })
    .catch(err => {
      dispatch(getErrors(err));
    });
}
