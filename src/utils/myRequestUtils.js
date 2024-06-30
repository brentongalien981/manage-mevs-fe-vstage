import My from "./My";
import MyJsonLocalStorage from "./MyJsonLocalStorage";

export async function myFetch({ url, method = "GET", body, onSuccess, onFailure, onValidationErrors, showLogs = true }) {

  // Log fetch info.
  logMyFetchInfo(url, method)

  const token = getToken();


  try {
    url = import.meta.env.VITE_APP_BACKEND_URL + url;

    const response = await fetch(url, {
      method: method,
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();


    if (response.status === 200 || response.status === 201) {
      showLogs ? onDefaultSuccess(data) : null;
      onSuccess?.(data);
    } else {

      // Handle multiple validation errors.
      if (data.multipleErrorsObj) {
        showLogs ? onDefaultValidationFailure(data.multipleErrorsObj) : null;
        onValidationErrors?.(data.multipleErrorsObj);
      }

      // Handle single error.
      if (data.error) {
        const errorMsg = data.error.friendlyErrorMessage ?? "Oops, something went wrong...";
        throw new Error(errorMsg);
      }
    }

  } catch (e) {
    showLogs ? onDefaultFailure(e.message) : null;
    onFailure?.(e.message);
  }

}


function getToken() {
  const storedAuth = MyJsonLocalStorage.get("auth");

  if (storedAuth) {
    return storedAuth.token;
  }

  return null;
}


function onDefaultFailure(errorMsg) {
  My.log("Oops, error in METHOD: onDefaultFailure()...");
  My.log(`Error: ${errorMsg}`);
}


function onDefaultValidationFailure(validationError) {
  My.log("Oops, error in METHOD: onDefaultValidationFailure()...");
  My.log(`Error: ${validationError.friendlyErrorMessage}`);
  My.log("Validation Errors:");
  My.log(validationError.errors);
}


function logMyFetchInfo(url, method) {
  My.log("\n###########################################");
  My.log("myFetch Info:");
  My.log(`${method} request to url: ${url}`);
  My.log("###########################################\n");
}


function onDefaultSuccess(data) {
  My.log("METHOD: onDefaultSuccess()...");
  My.log("data ==> ...");
  My.displayJsonContents(data);
}