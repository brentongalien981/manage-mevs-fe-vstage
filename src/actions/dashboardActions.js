import My from "../utils/My";
import { myFetch } from "../utils/myRequestUtils";

export async function query({ state, dispatch, addAlert }) {

  if (state.isQuerying || state.isResetting) {
    return;
  }

  // Dispatch the request for loading...
  dispatch({
    type: "QUERY_REQUEST"
  });


  // Set request params.
  const dashboardParams = {
    rangeStartDateStr: state.rangeStartDateStr,
    rangeEndDateStr: state.rangeEndDateStr,
    periodFrequency: state.periodFrequency,
  };

  // Make a POST request to query.
  await myFetch({
    url: `/dashboard/query`,
    method: "POST",
    body: dashboardParams,
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