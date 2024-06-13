import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import * as authActions from "../actions/authActions";

function useAuth() {

  const { state, dispatch } = useContext(AuthContext);


  function handleInputChange(event) {
    authActions.handleInputChange(event, dispatch);
  }


  return {
    ...state,
    handleInputChange
  };

}


export default useAuth;