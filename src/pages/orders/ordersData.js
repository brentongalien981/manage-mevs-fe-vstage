import My from "../../utils/My";
import MyDateUtils from "../../utils/MyDateUtils";
import { faker } from '@faker-js/faker';


export const NUM_ITERMS_PER_PAGE = 10;


export const orderStatusOptions = [
  { id: -100, name: "ORDER_FAILED", readableName: "Order Failed" },
  { id: -200, name: "ORDER_PROCESS_NOT_COMPLETE", readableName: "Order Process Not Complete" },
  { id: -300, name: "REFUND_NOT_COMPLETE", readableName: "Refund Not Complete" },
  { id: -401, name: "DELIVERY_NOT_COMPLETE", readableName: "Delivery Not Complete" },

  { id: 0, name: "SELECT_ORDER_STATUS", readableName: "Select Order Status" },

  { id: 100, name: "PAYMENT_RECEIVED", readableName: "Payment Received" },
  { id: 200, name: "ORDER_PROCESSING", readableName: "Order Processing" },
  { id: 201, name: "ORDER_PROCESSED", readableName: "Order Processed" },

  { id: 300, name: "REFUND_PROCESSING", readableName: "Refund Processing" },
  { id: 301, name: "REFUND_COMPLETE", readableName: "Refund Complete" },

  { id: 400, name: "ORDER_DISPATCHED", readableName: "Order Dispatched" },
  { id: 401, name: "ORDER_BEING_SHIPPED", readableName: "Order Being Shipped" },
  { id: 402, name: "ORDER_DELIVERED", readableName: "Order Delivered" },


];


export const initialOrdersFilters = [
  { name: "orderId", dbPropName: "_id", type: "text", value: "", isSortable: true, sortOrder: "none", placeholder: "Order ID" },
  { name: "stripePaymentIntentId", dbPropName: "stripePaymentIntentId", type: "text", value: "", isSortable: true, sortOrder: "none", placeholder: "Payment ID" },

  { name: "orderStatus", dbPropName: "orderStatus", type: "select", value: 0, isSortable: false, sortOrder: "none", placeholder: "Status", options: orderStatusOptions },

  { name: "firstName", dbPropName: "firstName", type: "text", value: "", isSortable: true, sortOrder: "none", placeholder: "First Name" },
  { name: "lastName", dbPropName: "lastName", type: "text", value: "", isSortable: true, sortOrder: "none", placeholder: "Last Name" },
  { name: "phone", dbPropName: "phone", type: "phone", value: "", isSortable: true, sortOrder: "none", placeholder: "Phone #" },
  { name: "email", dbPropName: "email", type: "email", value: "", isSortable: true, sortOrder: "none", placeholder: "Email" },

  { name: "street1", dbPropName: "street1", type: "text", value: "", isSortable: true, sortOrder: "none", placeholder: "Street1" },
  { name: "city", dbPropName: "city", type: "text", value: "", isSortable: true, sortOrder: "none", placeholder: "City" },
  { name: "province", dbPropName: "province", type: "text", value: "", isSortable: true, sortOrder: "none", placeholder: "Province" },
  { name: "country", dbPropName: "country", type: "text", value: "", isSortable: true, sortOrder: "none", placeholder: "Country" },
  { name: "postalCode", dbPropName: "postalCode", type: "text", value: "", isSortable: true, sortOrder: "none", placeholder: "Postal Code" },

  { name: "orderDateStart", dbPropName: "orderDateStart", type: "date", value: MyDateUtils.getDateString(365), isSortable: true, sortOrder: "none", placeholder: "Order Date Start" },
  { name: "orderDateEnd", dbPropName: "orderDateEnd", type: "date", value: MyDateUtils.getDateString(), isSortable: true, sortOrder: "none", placeholder: "Order Date End" },
];


export const ordersTableColumnsData = initialOrdersFilters.map((filter) => {

  switch (filter.name) {
    case "orderDateStart": return { ...filter, name: "createdAt", dbPropName: "createdAt", placeholder: "Created At" };
    case "orderDateEnd": return { ...filter, name: "updatedAt", dbPropName: "updatedAt", placeholder: "Updated At" };
    default: return filter;
  }

});



export function generateFakeOrders(numOrders = 1) {

  let orders = [];

  for (let i = 0; i < numOrders; i++) {
    orders.push({
      orderId: My.generateRandomString(8),
      stripePaymentIntentId: My.generateRandomString(8),
      orderStatus: getRandomOrderStatus(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      street1: faker.location.streetAddress(),
      city: faker.location.city(),
      province: faker.location.state({ abbreviated: true }),
      country: faker.location.country(),
      postalCode: faker.location.zipCode(),
      createdAt: MyDateUtils.getDateString(7),
      updatedAt: MyDateUtils.getDateString()
    });
  }

  return orders;

}


export function getRandomOrderStatus() {
  const randomNum = My.getRandomNumber(0, orderStatusOptions.length - 1);
  const option = orderStatusOptions[randomNum];
  return option?.name;
}