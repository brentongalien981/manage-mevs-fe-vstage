import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import { faBell } from "@fortawesome/free-regular-svg-icons";

const SingleErrorAlert = () => {
  const { error } = useAuth();

  if (error) {
    return (
      <Alert variant="danger" dismissible>
        <div className="alert-icon">
          <FontAwesomeIcon icon={faBell} fixedWidth />
        </div>
        <div className="alert-message">{error}</div>
      </Alert>
    );
  }

  return null;
};

export default SingleErrorAlert;
