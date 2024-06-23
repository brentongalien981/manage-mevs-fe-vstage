import { Button, Form, Spinner } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";

const TheForm = ({ pageName }) => {
  const { userCredentials, handleInputChange, handleSignup, isProcessing } =
    useAuth();

  const formInputs = userCredentials.map((inputData, index) => {
    // Don't include the signupKey input in the login form.
    if (inputData.name === "signupKey" && pageName === "login") {
      return null;
    }

    // Return the form input component.
    return (
      <Form.Group className="mb-3" key={index}>
        <Form.Label>{inputData.placeholder}</Form.Label>
        <Form.Control
          type={inputData.type}
          name={inputData.name}
          placeholder={inputData.placeholder}
          value={inputData.value}
          onChange={handleInputChange}
        />
      </Form.Group>
    );
  });

  // Set submit button component for default signup page.
  let submitHandler = handleSignup;
  let submitBtnLabel = "Signup";

  // Set submit button component for login page.
  if (pageName === "login") {
    submitHandler = () => {};
    submitBtnLabel = "Login";
  }

  let submitBtn = <Button onClick={submitHandler}>{submitBtnLabel}</Button>;

  // Set submitBtn to spinner component if processing.
  if (isProcessing) {
    submitBtn = (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" variant="primary" className="me-2" />
      </div>
    );
  }

  // Return the form component.
  return (
    <Form>
      {formInputs}
      <div className="d-grid gap-2 mt-3">{submitBtn}</div>
    </Form>
  );
};

export default TheForm;
