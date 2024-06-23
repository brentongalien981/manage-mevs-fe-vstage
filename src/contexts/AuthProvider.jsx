import { useEffect, useReducer } from "react";
import AuthContext from "./AuthContext";
import authReducer from "../reducers/authReducer";
import MyJsonLocalStorage from "../utils/MyJsonLocalStorage";

export const DEFAULT_STATE = {
  isLoggedIn: false,
  username: null,
  email: null,
  token: null,
  profilePhotoSource: null,
  userCredentials: [
    { name: "email", type: "email", value: "", placeholder: "Email" },
    { name: "password", type: "password", value: "", placeholder: "Password" },
    { name: "signupKey", type: "text", value: "", placeholder: "Signup Key" },
  ],
  isProcessing: false,
  error: null,
  validationErrors: [],
};

const initialState = { ...DEFAULT_STATE };

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
        email: storedAuth.email,
        token: storedAuth.token,
        profilePhotoSource: storedAuth.profilePhotoSource,
      };
    }

    // Init user auth with empty or stored auth credentials.
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
