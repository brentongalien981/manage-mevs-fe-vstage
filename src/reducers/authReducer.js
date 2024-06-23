import My from "../utils/My";
import MyJsonLocalStorage from "../utils/MyJsonLocalStorage";

function authReducer(state, action) {
  switch (action.type) {
    case "INITIALIZE": return { ...state, ...action.payload };
    case "SIGNUP_REQUEST":
    case "LOGIN_REQUEST": return { ...state, isProcessing: true, error: null, validationErrors: [] };
    case "SIGNUP_FAIL":
    case "LOGIN_FAIL": return { ...state, isProcessing: false, error: action.error, validationErrors: action.validationErrors ?? [] };
    case "SIGNUP_SUCCESS":
    case "LOGIN_SUCCESS": return { ...state, isLoggedIn: true, email: action.email, token: action.token, isProcessing: false };
    case "HANDLE_INPUT_CHANGE": return onHandleInputChange(state, action);
    default: throw new Error("Unknown action: " + action.type);
  }
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