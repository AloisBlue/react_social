import { GET_ALL_PROFILES, CREATE_PROFILE, PROFILES_LOADING, GET_PROFILE,
          GET_ERRORS, CLEAR_CURRENT_PROFILE, ADD_EXPERIENCE, ADD_EDUCATION,
          REMOVE_FROM_PROFILE, GET_BY_HANDLE
        } from "../types";
import api from "../api";
import { clearError } from "./auth";

export const getAllProfiles = (data) => ({
  type: GET_ALL_PROFILES,
  payload: data
});

export const profilesLoading = () => ({
  type: PROFILES_LOADING
});

export const clearCurrent = () => ({
  type: CLEAR_CURRENT_PROFILE
})

export const getSingleProfile = (data) => ({
  type: GET_PROFILE,
  payload: data
});

export const getByHandle = (data) => ({
  type: GET_BY_HANDLE,
  payload: data
})

export const getErrors = (err) => ({
  type: GET_ERRORS,
  payload: err.response.data
});

export const createMyProfile = (data) => ({
  type: CREATE_PROFILE,
  payload: data
});

export const addUserExperience = (data) => ({
  type: ADD_EXPERIENCE,
  payload: data
});

export const addUserEducation = (data) => ({
  type: ADD_EDUCATION,
  payload: data
});

export const removeFromProfile = (data) => ({
  type: REMOVE_FROM_PROFILE,
  payload: data
});


export const getProfiles = () => dispatch => {
  dispatch(profilesLoading());
  api.profile
    .getProfiles()
    .then(profiles => {
      dispatch(getAllProfiles(profiles));
    })
    .catch(err => {
      dispatch({
        type: GET_ALL_PROFILES,
        payload: err
      })
    });
  };

export const getProfile = () => dispatch => {
  dispatch(profilesLoading());
  api.profile
    .getProfile()
    .then(profile => {
      dispatch(clearError());
      dispatch(getSingleProfile(profile))
    })
    .catch(err => {
      dispatch(getErrors(err))
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    });
};

export const clearCurrentProfile = () => dispatch => {
  dispatch(clearCurrent());
};

export const createProfile = (newProfile, history) => (dispatch) => {
  api.profile
    .createProfile(newProfile)
    .then(profile => {
      dispatch(clearError());
      dispatch(createMyProfile(profile));
      history.push("/dashboard")
    })
    .catch(err => {
      dispatch(getErrors(err));
    })
}

export const addExperience = (newExperience, history) => (dispatch) => {
  api.profile
    .addExperience(newExperience)
    .then(experience => {
      dispatch(clearError());
      dispatch(addUserExperience(experience));
      history.push("/dashboard")
    })
    .catch(err => {
      dispatch(getErrors(err))
    })
}

export const addEducation = (newEducation, history) => (dispatch) => {
  api.profile
    .addEducation(newEducation)
    .then(education => {
      dispatch(clearError());
      dispatch(addUserEducation(education));
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch(getErrors(err))
    })
}

export const deleteExperience = (id) => (dispatch) => {
  api.profile
    .deleteExperience(id)
    .then(res => {
      dispatch(removeFromProfile());
      dispatch(getSingleProfile(res));
    })
    .catch(err => {
      dispatch(getErrors(err))
    });
}

export const deleteEducation = (id) => (dispatch) => {
  api.profile
    .deleteEducation(id)
    .then(res => {
      dispatch(removeFromProfile());
      dispatch(getSingleProfile(res));
    })
    .catch(err => {
      dispatch(getErrors(err))
    });
}

export const getProfileByHandle = (handle) => (dispatch) => {
  dispatch(profilesLoading());
  api.profile
    .getProfileByHandle(handle)
    .then(profile => {
      dispatch(getByHandle(profile))
    })
    .catch(err => {
      dispatch(getErrors(err))
    })
}
