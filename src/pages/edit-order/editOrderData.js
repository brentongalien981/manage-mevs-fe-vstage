import My from "../../utils/My";
import { ordersTableColumnsData } from "../orders/ordersData";

export const orderFormFieldsData = getOrderFormFieldsData();


function getOrderFormFieldsData() {
  let data = [];

  ordersTableColumnsData.forEach((field) => {
    // Inject additional data.
    if (field.name === "street1") {
      data.push({ name: "shippingFee", dbPropName: "shippingFee", type: "text", value: "", isSortable: true, sortOrder: "none", placeholder: "Shipping Fee", isEditable: false });
      data.push({ name: "tax", dbPropName: "tax", type: "text", value: "", isSortable: true, sortOrder: "none", placeholder: "Tax", isEditable: false });
    }
    data.push(field);
  });

  // Modify the data further by adding isEditable property.
  data = data.map((field) => {

    switch (field.name) {
      case "orderId":
      case "stripePaymentIntentId":
      case "shipmentId":
      case "shippingFee":
      case "tax":
      case "createdAt":
      case "updatedAt": return { ...field, isEditable: false };
      default: return { ...field, isEditable: true };;
    }

  });

  return data;
}