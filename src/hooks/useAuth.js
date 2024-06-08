import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

function useAuth() {

  const { state, dispatch } = useContext(AuthContext);

  return {
    ...state
  };

}


export default useAuth;