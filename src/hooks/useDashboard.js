import { useContext, useEffect } from "react";
import DashboardContext from "../contexts/DashboardContext";
import * as dashboardActions from "../actions/dashboardActions";
import useFloatingAlerts from "./useFloatingAlerts";

function useDashboard() {
  const { state, dispatch } = useContext(DashboardContext);
  const { addAlert } = useFloatingAlerts();


  useEffect(() => {
    handleQuery();
  }, []);


  function handleQuery() {
    dashboardActions.query({ state, dispatch, addAlert });
  }

  function handleRangeDateChange(event) {
    dashboardActions.handleRangeDateChange(event, dispatch);
  }

  function handlePeriodFrequencyChange(eventKey) {
    dashboardActions.handlePeriodFrequencyChange(eventKey, dispatch);
  }


  return { ...state, handleRangeDateChange, handlePeriodFrequencyChange, handleQuery };
}

export default useDashboard;