import { useContext, useEffect } from "react";
import OrdersContext from "../contexts/OrdersContext";
import * as ordersActions from "../actions/ordersActions";

function useOrders() {

  const { state, dispatch } = useContext(OrdersContext);


  function queryOrders() {
    ordersActions.queryOrders(state, dispatch);
  }

  function handleInputChange(event) {
    ordersActions.handleInputChange(event, dispatch);
  }

  function handleApplyFilters() {
    ordersActions.queryOrders(state, dispatch);
  }

  function handleResetFilters() {
    ordersActions.handleResetFilters(dispatch);
  }

  function handlePageNumChange(e) {
    ordersActions.handlePageNumChange(e, dispatch);
  }

  function handlePageNumEnter(e) {
    ordersActions.handlePageNumEnter(e, state, dispatch);
  }

  function handlePageNext() {
    ordersActions.handlePageNext(state, dispatch);
  }

  function handlePagePrevious() {
    ordersActions.handlePagePrevious(state, dispatch);
  }

  function handleColumnSort(columnName, currentSortOrder) {
    ordersActions.handleColumnSort(columnName, currentSortOrder, state, dispatch);
  }




  return {
    state,
    queryOrders,
    handleInputChange,
    handleApplyFilters,
    handleResetFilters,
    handlePageNumEnter,
    handlePageNumChange,
    handlePageNext,
    handlePagePrevious,
    handleColumnSort
  };

}


export default useOrders;