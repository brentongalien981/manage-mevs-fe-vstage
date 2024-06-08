import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AuthGuard = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <>{children}</>;
  }

  return <Navigate to="/notfound" />;
};

export default AuthGuard;
