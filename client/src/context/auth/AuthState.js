import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";
import authReducer from "./AuthReducer";
import setAuthToken from "../../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  EDIT_USER,
  USER_ERROR,
  SET_CURRENT,
  MUDA_SENHA,
  MUDA_FOTO
} from "../types";

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
    resposta: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("/api/auth");

      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR
      });
    }
  };

  // Register User
  const register = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post("/api/users", formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  // Login User
  const login = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post("/api/auth", formData, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  // Update User
  const editUser = async user => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.put(`/api/users/${user._id}`, user, config);

      dispatch({
        type: EDIT_USER,
        payload: res.data,
        resposta: res.status
      });
    } catch (error) {
      dispatch({
        type: USER_ERROR,
        payload: error.response.msg
      });
    }
  };

  // Muda Senha
  const mudaSenha = async user => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.put(`/api/users/senha/${user.id}`, user, config);

      dispatch({
        type: MUDA_SENHA,
        payload: res.data,
        resposta: res.status
      });
    } catch (error) {
      dispatch({
        type: USER_ERROR,
        payload: error.response.msg
      });
    }
  };

  // Muda Foto
  const mudaFoto = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post(
        `/api/users/avatar/${state.user._id}`,
        formData,
        config
      );

      dispatch({
        type: MUDA_FOTO,
        payload: res.data,
        resposta: res.status
      });
    } catch (error) {
      dispatch({
        type: USER_ERROR,
        payload: error.response.msg
      });
    }
  };

  // Changes current user
  const changeUser = user => {
    dispatch({
      type: SET_CURRENT,
      payload: user
    });
  };

  // Logout
  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  // Clear Errors
  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        login,
        logout,
        clearErrors,
        loadUser,
        editUser,
        changeUser,
        resposta: state.resposta,
        mudaSenha,
        mudaFoto
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
