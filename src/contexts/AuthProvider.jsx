import { useEffect, useReducer } from "react";
import AuthContext from "./AuthContext";
import authReducer from "../reducers/authReducer";
import MyJsonLocalStorage from "../utils/MyJsonLocalStorage";

const initialState = {
  isLoggedIn: false,
  username: null,
  token: null,
  profilePhotoSource: null,
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Check existing auth credentials from localStorage.
    const storedAuth = MyJsonLocalStorage.get("auth");
    let payload = { ...initialState };

    if (storedAuth?.isLoggedIn && storedAuth?.token) {
      payload = {
        isLoggedIn: true,
        username: storedAuth.username,
        token: storedAuth.token,
        profilePhotoSource: storedAuth.profilePhotoSource,
      };
    }

    dispatch({
      type: "INITIALIZE",
      payload: payload,
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
