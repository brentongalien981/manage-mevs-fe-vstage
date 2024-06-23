import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import * as authActions from "../actions/authActions";
import useFloatingAlerts from "./useFloatingAlerts";

function useAuth() {

  const { state, dispatch } = useContext(AuthContext);
  const { addAlert } = useFloatingAlerts();


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


  return {
    ...state,
    handleInputChange,
    handleSignup,
    handleLogin
  };

}


export default useAuth;