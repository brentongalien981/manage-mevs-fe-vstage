import { useContext, useEffect } from "react";
import DashboardContext from "../contexts/DashboardContext";
import * as dashboardActions from "../actions/dashboardActions";
import useFloatingAlerts from "./useFloatingAlerts";
import My from "../utils/My";
import { initialState } from "../contexts/DashboardProvider";

function useDashboard() {
  const { state, dispatch } = useContext(DashboardContext);
  const { addAlert } = useFloatingAlerts();


  useEffect(() => {
    handleQuery();
  }, []);


  function handleQuery() {
    if (state.isQuerying || state.isResetting) {
      return;
    }

    dashboardActions.query({ state, dispatch, addAlert });
  }

  function handleRangeDateChange(event) {
    dashboardActions.handleRangeDateChange(event, dispatch);
  }

  function handlePeriodFrequencyChange(eventKey) {
    dashboardActions.handlePeriodFrequencyChange(eventKey, dispatch);
  }

  function handleReset() {
    if (state.isQuerying || state.isResetting) {
      return;
    }

    dashboardActions.handleReset({ state, dispatch, addAlert });
  }


  return { ...state, handleRangeDateChange, handlePeriodFrequencyChange, handleQuery, handleReset };
}

export default useDashboard;