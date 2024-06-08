import { useReducer } from "react";
import {
  generateFakeOrders,
  initialOrdersFilters,
  ordersTableColumnsData,
} from "../pages/orders/ordersData";
import OrdersContext from "./OrdersContext";
import ordersReducer from "../reducers/ordersReducer";

const initialState = {
  isQuerying: false,
  queryError: null,
  ordersFilters: [...initialOrdersFilters],
  ordersTableColumnsData,
  pageNavigatorData: { page: 1, numPages: 12 },
  orders: generateFakeOrders(10),
};

function OrdersProvider({ children }) {
  const [state, dispatch] = useReducer(ordersReducer, initialState);

  return (
    <OrdersContext.Provider value={{ state, dispatch }}>
      {children}
    </OrdersContext.Provider>
  );
}

export default OrdersProvider;
