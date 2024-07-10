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


export const orderItemPropsData = [
  { name: "orderItemId", dbPropName: "_id", value: "", placeholder: "Order Item ID" },
  { name: "quantity", dbPropName: "quantity", value: "", placeholder: "Qty" },
  { name: "price", dbPropName: "price", value: "", placeholder: "Price" }
];


export const orderItemProductPropsData = [
  { name: "productId", dbPropName: "_id", value: "", placeholder: "Product ID" },
  { name: "name", dbPropName: "name", value: "", placeholder: "Name" },
  { name: "model", dbPropName: "model", value: "", placeholder: "Model" },
];


export const orderItemProductBrandPropsData = [
  // { name: "brandId", dbPropName: "_id", value: "", placeholder: "Brand ID" },
  { name: "brandName", dbPropName: "name", value: "", placeholder: "Brand" },
];


export const orderItemProductCategoryPropsData = [
  // { name: "categoryId", dbPropName: "_id", value: "", placeholder: "Category ID" },
  { name: "categoryName", dbPropName: "name", value: "", placeholder: "Category" },
];


// Each row of orderItem has sections: orderItem, product, brand, category.
export const orderItemRowSections = [
  {
    name: "orderItem",
    getSource: (orderItem) => orderItem,
    sourcePropsData: orderItemPropsData
  },
  {
    name: "product",
    getSource: (orderItem) => orderItem.product,
    sourcePropsData: orderItemProductPropsData,
  },
  {
    name: "brand",
    getSource: (orderItem) => orderItem.product.brand,
    sourcePropsData: orderItemProductBrandPropsData,
  },
  {
    name: "category",
    getSource: (orderItem) => orderItem.product.category,
    sourcePropsData: orderItemProductCategoryPropsData,
  }
];