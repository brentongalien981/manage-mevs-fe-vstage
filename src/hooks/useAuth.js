import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import * as authActions from "../actions/authActions";
import useFloatingAlerts from "./useFloatingAlerts";
import { useNavigate } from "react-router-dom";

function useAuth() {

  const { state, dispatch } = useContext(AuthContext);
  const { addAlert } = useFloatingAlerts();
  const navigate = useNavigate();


  function handleInputChange(event) {
    authActions.handleInputChange(event, dispatch);
  }

  function handleSignup() {
    if (state.isProcessing) {
      return;
    }
    authActions.handleSignup(state.userCredentials, dispatch, addAlert);
  }

  function handleLogin() {
    if (state.isProcessing) {
      return;
    }
    authActions.handleLogin(state.userCredentials, dispatch, addAlert);
  }


  function handleLogout() {
    authActions.handleLogout(dispatch, addAlert, navigate);
  }


  return {
    ...state,
    handleInputChange,
    handleSignup,
    handleLogin,
    handleLogout
  };

}


export default useAuth;