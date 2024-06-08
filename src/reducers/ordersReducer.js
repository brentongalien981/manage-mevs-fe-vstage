import { NUM_ITERMS_PER_PAGE } from "../pages/orders/ordersData";

function ordersReducer(state, action) {
  switch (action.type) {
    case "QUERY_ORDERS_REQUEST": return { ...state, isQuerying: true, queryError: null };
    case "QUERY_ORDERS_SUCCESS": return onQueryOrdersSuccess(state, action);
    case "QUERY_ORDERS_FAIL": return { ...state, queryError: action.error, isQuerying: false };
    case "HANDLE_INPUT_CHANGE": return onHandleInputChange(state, action);
    case "HANDLE_RESET_FILTERS": return { ...state, ordersFilters: action.ordersFilters };
    case "HANDLE_PAGE_NUM_CHANGE": return { ...state, pageNavigatorData: { ...state.pageNavigatorData, page: action.page } };
    case "HANDLE_COLUMN_SORT": return onHandleColumnSort(state, action);
    default: throw new Error("Unknown action: " + action.type);
  }
}


function onHandleColumnSort(state, action) {

  const updatedOrdersTableColumnsData = state.ordersTableColumnsData.map((columnData) => {
    if (columnData.dbPropName === action.columnName) {
      return {
        ...columnData,
        sortOrder: action.updatedSortOrder
      };
    } else {
      return columnData;
    }
  });

  return { ...state, ordersTableColumnsData: updatedOrdersTableColumnsData };
}


function onHandleInputChange(state, action) {

  const updatedOrdersFilters = state.ordersFilters.map((filter) => {
    if (filter.name === action.filterName) {
      return { ...filter, value: action.filterValue };
    } else {
      return filter;
    }
  });

  return { ...state, ordersFilters: updatedOrdersFilters };
}


function onQueryOrdersSuccess(state, action) {

  const updatedNumPages = Math.ceil(parseInt(action.ordersCountWithFilters) / NUM_ITERMS_PER_PAGE);

  const oldPageNavigatorData = state.pageNavigatorData;

  return {
    ...state,
    orders: action.orders,
    pageNavigatorData: { page: oldPageNavigatorData.page, numPages: updatedNumPages },
    isQuerying: false
  };

}


export default ordersReducer;