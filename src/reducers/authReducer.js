import My from "../utils/My";

function authReducer(state, action) {
  switch (action.type) {
    case "INITIALIZE": return { ...state, ...action.payload };
    default: throw new Error("Unknown action: " + action.type);
  }
}


export default authReducer;