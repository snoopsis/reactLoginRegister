import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  USER_ERROR,
  EDIT_USER,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  SET_CURRENT,
  MUDA_SENHA
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case USER_ERROR:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload
      };
    case EDIT_USER:
      return {
        ...state,
        user: state.user,
        loading: false,
        resposta: action.resposta
      };
    case MUDA_SENHA:
      return {
        ...state,
        loading: false,
        resposta: action.resposta
      };
    case SET_CURRENT:
      return {
        ...state,
        user: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        resposta: null
      };
    default:
      return state;
  }
};
