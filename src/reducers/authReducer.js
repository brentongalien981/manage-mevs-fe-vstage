import My from "../utils/My";

function authReducer(state, action) {
  switch (action.type) {
    case "INITIALIZE": return { ...state, ...action.payload };
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