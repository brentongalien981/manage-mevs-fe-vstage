import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const GuestGuard = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/notfound" />;
  }

  return <>{children}</>;
};

export default GuestGuard;
