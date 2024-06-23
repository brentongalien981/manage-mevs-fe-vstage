import My from "../utils/My";
import MyJsonLocalStorage from "../utils/MyJsonLocalStorage";
import { myFetch } from "../utils/myRequestUtils";

export async function handleSignup(userCredentials, dispatch, addAlert) {

  // Dispatch the request for loading...
  dispatch({
    type: "SIGNUP_REQUEST"
  });


  // Prepare reduced userCredentials.
  let reducedUserCredentialsObj = {};
  for (const cred of userCredentials) {
    reducedUserCredentialsObj[cred.name] = cred.value;
  }


  // Make a POST request to signup.
  await myFetch({
    url: `/auth/signup`,
    method: "POST",
    body: reducedUserCredentialsObj,
    onSuccess: (data) => {

      // Save the auth credentials to localStorage.
      MyJsonLocalStorage.set("auth", {
        isLoggedIn: true,
        email: data.email,
        token: data.token
      });

      dispatch({
        type: "SIGNUP_SUCCESS",
        token: data.token,
        email: data.email
      });

      // Add an alert.
      addAlert({
        variant: "success",
        message: "Signup successful!"
      });
    },
    onFailure: (errorMessage) => {
      dispatch({
        type: "SIGNUP_FAIL",
        error: errorMessage,
      });
    },
    onValidationErrors: (multipleErrorsObj) => {
      dispatch({
        type: "SIGNUP_FAIL",
        validationErrors: multipleErrorsObj.errors
      });

    }
  });
}


export async function handleLogin(userCredentials, dispatch, addAlert) {
  // Dispatch the request for loading...
  dispatch({
    type: "LOGIN_REQUEST"
  });


  // Prepare reduced userCredentials.
  let reducedUserCredentialsObj = {};
  for (const cred of userCredentials) {
    reducedUserCredentialsObj[cred.name] = cred.value;
  }


  // Make a POST request to signup.
  await myFetch({
    url: `/auth/login`,
    method: "POST",
    body: reducedUserCredentialsObj,
    onSuccess: (data) => {

      // Save the auth credentials to localStorage.
      MyJsonLocalStorage.set("auth", {
        isLoggedIn: true,
        email: data.email,
        token: data.token
      });

      dispatch({
        type: "LOGIN_SUCCESS",
        token: data.token,
        email: data.email
      });

      // Add an alert.
      addAlert({
        variant: "success",
        message: "Login successful!"
      });
    },
    onFailure: (errorMessage) => {
      dispatch({
        type: "LOGIN_FAIL",
        error: errorMessage,
      });
    },
    onValidationErrors: (multipleErrorsObj) => {
      dispatch({
        type: "LOGIN_FAIL",
        validationErrors: multipleErrorsObj.errors
      });
    }
  });
}


export function handleInputChange(event, dispatch) {
  const inputName = event.target.name;
  const inputValue = event.target.value;

  dispatch({
    type: "HANDLE_INPUT_CHANGE",
    inputName,
    inputValue
  });
}