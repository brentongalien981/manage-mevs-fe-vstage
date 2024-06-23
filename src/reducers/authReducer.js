import { DEFAULT_STATE } from "../contexts/AuthProvider";

function authReducer(state, action) {
  switch (action.type) {
    case "INITIALIZE": return { ...state, ...action.payload };
    case "SIGNUP_REQUEST":
    case "LOGIN_REQUEST": return { ...state, isProcessing: true, error: null, validationErrors: [] };
    case "SIGNUP_FAIL":
    case "LOGIN_FAIL": return { ...state, isProcessing: false, error: action.error, validationErrors: action.validationErrors ?? [] };
    case "SIGNUP_SUCCESS":
    case "LOGIN_SUCCESS": return onAuthSuccess(state, action);
    case "LOGOUT": return onLogout(state, action);
    case "HANDLE_INPUT_CHANGE": return onHandleInputChange(state, action);
    default: throw new Error("Unknown action: " + action.type);
  }
}


function onLogout(state, action) {
  const defaultUserCredentials = DEFAULT_STATE.userCredentials.map((credential) => {
    return { ...credential, value: "" };
  });

  return { ...DEFAULT_STATE, userCredentials: defaultUserCredentials };
}


function onAuthSuccess(state, action) {
  const defaultUserCredentials = DEFAULT_STATE.userCredentials.map((credential) => {
    return { ...credential, value: "" };
  });

  return { ...DEFAULT_STATE, userCredentials: defaultUserCredentials, isLoggedIn: true, email: action.email, token: action.token };
}


function onHandleInputChange(state, action) {

  const updatedUserCredentials = state.userCredentials.map((credential) => {
    let updatedCred = credential;
    if (credential.name === action.inputName) {
      updatedCred.value = action.inputValue;
    }
    return updatedCred;
  });

  return { ...state, userCredentials: updatedUserCredentials };
}


export default authReducer;