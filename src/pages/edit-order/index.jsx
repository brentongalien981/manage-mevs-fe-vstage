import React from "react";
import { useParams } from "react-router-dom";

const EditOrder = () => {
  const { orderId } = useParams();

  return (
    <div>
      <h1>Edit Order</h1>
      <p>Order ID: {orderId}</p>
    </div>
  );
};

export default EditOrder;
