import My from "../utils/My";
import MyJsonLocalStorage from "../utils/MyJsonLocalStorage";

function authReducer(state, action) {
  switch (action.type) {
    case "INITIALIZE": return { ...state, ...action.payload };
    case "SIGNUP_REQUEST": return { ...state, isProcessing: true, error: null, validationErrors: [] };
    case "SIGNUP_SUCCESS": return onSignupSuccess(state, action);
    case "SIGNUP_FAIL": return { ...state, isProcessing: false, error: action.error, validationErrors: action.validationErrors ?? [] };
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


function onSignupSuccess(state, action) {

  return {
    ...state,
    isLoggedIn: true,
    email: action.email,
    token: action.token,
    isProcessing: false
  };
}


export default authReducer;