function dashboardReducer(state, action) {
  switch (action.type) {
    case "QUERY": return { ...state, data: action.payload };
    default: throw new Error("Unknown action: " + action.type);
  }
}

export default dashboardReducer;