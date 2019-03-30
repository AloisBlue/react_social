
import { GET_ALL_PROFILES, PROFILES_LOADING, GET_PROFILE, CLEAR_CURRENT_PROFILE,
  CREATE_PROFILE, ADD_EXPERIENCE, ADD_EDUCATION, REMOVE_FROM_PROFILE, GET_BY_HANDLE } from "../types";

const initial = {
  profile: null,
  profiles: null,
  loading: false
}

export default function profiles(state = initial, action = {}) {
  switch (action.type) {
    case PROFILES_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case GET_ALL_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    case CREATE_PROFILE:
        return{
          ...state,
          profile: action.payload
        };
    case ADD_EXPERIENCE:
        return {
          ...state,
          experience: action.payload
        };
    case ADD_EDUCATION:
        return {
          ...state,
          education: action.payload
        };
    case REMOVE_FROM_PROFILE:
      return {
        ...state
      };
    case GET_BY_HANDLE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
