import { initialOrdersFilters } from "../pages/orders/ordersData";
import My from "../utils/My";
import { myFetch } from "../utils/myRequestUtils";

export async function queryOrders(state, dispatch, pageNavigatorData = {}, reducedSortFilters = null) {

  // Return if currently querying.
  if (state.isQuerying) {
    console.log(`Currently querying... Please wait...`);
    return;
  }

  // Dispatch the request for loading...
  dispatch({
    type: "QUERY_ORDERS_REQUEST"
  });


  // Prepare request params.
  const reducedOrdersFilters = state.ordersFilters.map((f) => {
    return {
      name: f.name,
      value: f.value
    };
  });

  // Set sort filters.
  let sortFilters = [];
  if (reducedSortFilters) { sortFilters = reducedSortFilters; }
  else { sortFilters = prepareReducedSortFilters(state.ordersTableColumnsData); }

  // Set request params.
  const requestParams = {
    ordersFilters: reducedOrdersFilters,
    pageNavigatorData: { ...state.pageNavigatorData, ...pageNavigatorData }, // If pageNavigatorData param is provided, override the state's value.
    sortFilters
  };

  // Stringify sort params.
  const requestParamsStr = `?queryObj=${JSON.stringify(requestParams)}`;

  // Read orders from backend.
  await myFetch({
    url: `/orders/queryOrders${requestParamsStr}`,
    onSuccess: (data) => {
      dispatch({
        type: "QUERY_ORDERS_SUCCESS",
        orders: data.orders,
        ordersCountWithFilters: data.ordersCountWithFilters
      });
    },
    onFailure: (errorMessage) => {
      dispatch({
        type: "QUERY_ORDERS_FAIL",
        error: errorMessage,
      });
    },
  });

}


export function handleInputChange(event, dispatch) {
  const filterName = event.target.name;
  const filterValue = event.target.value;

  dispatch({
    type: "HANDLE_INPUT_CHANGE",
    filterName,
    filterValue
  });
}


export function handlePageNumChange(event, dispatch) {
  dispatch({
    type: "HANDLE_PAGE_NUM_CHANGE",
    page: event.target.value
  });
}


export function handlePageNumEnter(event, state, dispatch) {
  if (event.key !== "Enter") {
    return;
  }

  event.preventDefault();

  handlePageNavigate(state, dispatch, "CURRENT_PAGE");
}


export function handlePageNext(state, dispatch) {
  handlePageNavigate(state, dispatch, "NEXT_PAGE");
}


export function handlePagePrevious(state, dispatch) {
  handlePageNavigate(state, dispatch, "PREVIOUS_PAGE");
}


export function handleResetFilters(dispatch) {
  dispatch({
    type: "HANDLE_RESET_FILTERS",
    ordersFilters: [...initialOrdersFilters]
  });
}


export function handleColumnSort(columnName, currentSortOrder, state, dispatch) {

  // Set the new sort order.
  let updatedSortOrder = "none";
  switch (currentSortOrder) {
    case "none":
      updatedSortOrder = "ascending";
      break;
    case "ascending":
      updatedSortOrder = "descending";
      break;
    case "descending":
      updatedSortOrder = "none";
      break;
  }

  // Dispatch the action.
  dispatch({
    type: "HANDLE_COLUMN_SORT",
    columnName,
    updatedSortOrder
  });

  // Set reduced sort filters.
  const reducedSortFilters = [];
  for (const columnData of state.ordersTableColumnsData) {

    const reducedColumnName = columnData.dbPropName;
    let reducedSortOrder = columnData.sortOrder;

    if (reducedColumnName === columnName) {
      reducedSortOrder = updatedSortOrder;
    }

    if (reducedSortOrder === "none") {
      continue;
    }

    reducedSortFilters.push({
      name: reducedColumnName,
      sortOrder: reducedSortOrder
    });
  }


  queryOrders(state, dispatch, {}, reducedSortFilters);
}


// Helper Functions
function handlePageNavigate(state, dispatch, navigationType = "CURRENT_PAGE") {


  const currentPageNum = parseInt(state.pageNavigatorData.page);

  // Check for validity.
  if (isNaN(currentPageNum)) { return; }


  let newPageNum = currentPageNum;

  switch (navigationType) {
    case "CURRENT_PAGE":
      if (newPageNum <= 0 || newPageNum > state.pageNavigatorData.numPages) { return; }
      break;
    case "NEXT_PAGE":
      ++newPageNum;
      if (newPageNum > state.pageNavigatorData.numPages) { return; }
      break;
    case "PREVIOUS_PAGE":
      --newPageNum;
      if (newPageNum <= 0) { return; }
      break;
  }


  dispatch({
    type: "HANDLE_PAGE_NUM_CHANGE",
    page: newPageNum
  });


  const pageNavigatorData = { ...state.pageNavigatorData, page: newPageNum };

  queryOrders(state, dispatch, pageNavigatorData);
}


function prepareReducedSortFilters(ordersTableColumnsData) {
  // Set reduced sort filters.
  const reducedSortFilters = [];
  for (const columnData of ordersTableColumnsData) {
    if (columnData.sortOrder === "none") {
      continue;
    }

    reducedSortFilters.push({
      name: columnData.dbPropName,
      sortOrder: columnData.sortOrder
    });
  }

  return reducedSortFilters;
}