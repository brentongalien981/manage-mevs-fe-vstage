import { ordersTableColumnsData } from "../orders/ordersData";

export const orderFormFieldsData = ordersTableColumnsData.map((field) => {

  switch (field.name) {
    case "orderId":
    case "stripePaymentIntentId":
    case "createdAt":
    case "updatedAt": return { ...field, isEditable: false };
    default: return { ...field, isEditable: true };;
  }

});