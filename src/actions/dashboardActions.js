import { initialState } from "../contexts/DashboardProvider";
import My from "../utils/My";
import { myFetch } from "../utils/myRequestUtils";

export async function query({ state, dispatch, addAlert, customDashboardParams }) {

  // Dispatch the request for loading...
  dispatch({
    type: "QUERY_REQUEST"
  });


  // Set request params. If customDashboardParams is not provided, use the current state.
  const dashboardParams = customDashboardParams || {
    rangeStartDateStr: state.rangeStartDateStr,
    rangeEndDateStr: state.rangeEndDateStr,
    periodFrequency: state.periodFrequency,
  };

  // TODO: DELETE
  My.log("##################################");
  My.log("dashboardParams ==> ...");
  My.log(dashboardParams);
  My.log("##################################");

  // Make a POST request to query.
  await myFetch({
    url: `/dashboard/query`,
    method: "POST",
    body: dashboardParams,
    showLogs: false,
    onSuccess: (data) => {
      dispatch({
        type: "QUERY_SUCCESS",
        ordersDataForCurrentDateRange: data.ordersDataForCurrentDateRange,
        ordersDataForPreviousDateRange: data.ordersDataForPreviousDateRange
      });
    },
    onFailure: (errorMessage) => {

      addAlert({
        variant: "danger",
        message: `Dashboard data query failed: ${errorMessage}`
      });

      dispatch({
        type: "QUERY_FAIL",
        error: errorMessage,
      });
    }
  });

}


export function handleRangeDateChange(event, dispatch) {

  const inputName = event.target.name;
  const inputValue = event.target.value;

  dispatch({
    type: "HANDLE_TIMELINE_PARAM_CHANGE",
    inputName,
    inputValue
  });

}


export function handlePeriodFrequencyChange(eventKey, dispatch) {
  dispatch({
    type: "HANDLE_PERIO_FREQUENCY_CHANGE",
    periodFrequency: eventKey
  });
}


export function handleReset({ state, dispatch, addAlert }) {

  const customDashboardParams = {
    rangeStartDateStr: initialState.rangeStartDateStr,
    rangeEndDateStr: initialState.rangeEndDateStr,
    periodFrequency: initialState.periodFrequency
  };

  dispatch({
    type: "RESET",
    customDashboardParams
  });

  query({ state, dispatch, addAlert, customDashboardParams });

}