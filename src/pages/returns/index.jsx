import React from "react";
import AuthGuard from "../../components/guards/AuthGuard";

const Returns = () => {
  return (
    <AuthGuard>
      <div>
        <h2>Returns</h2>
        <p>Welcome Returns baby!</p>
      </div>
    </AuthGuard>
  );
};

export default Returns;
