import { Alert } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";

const ValidationErrorsAlert = () => {
  const { validationErrors } = useAuth();

  if (validationErrors.length > 0) {
    return (
      <Alert variant="danger" dismissible>
        <div className="alert-icon">
          <FontAwesomeIcon icon={faBell} fixedWidth />
        </div>
        <div className="alert-message">
          <ul className="mb-0">
            {validationErrors.map((validationFieldError, index) => (
              <li key={index}>{validationFieldError.message}</li>
            ))}
          </ul>
        </div>
      </Alert>
    );
  }

  return null;
};

export default ValidationErrorsAlert;
