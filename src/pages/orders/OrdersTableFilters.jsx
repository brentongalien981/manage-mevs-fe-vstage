import { Button, Card, Form } from "react-bootstrap";
// import { filtersInputData } from "./ordersData";
import useOrders from "../../hooks/useOrders";

const OrdersTableFilters = () => {
  const { state, handleInputChange, handleApplyFilters, handleResetFilters } =
    useOrders();

  function getInputFilters() {
    return state.ordersFilters.map((data) => {
      // For dropdown input type.
      if (data.type === "select") {
        return (
          <Form.Select
            key={data.name}
            name={data.name}
            value={data.value}
            onChange={handleInputChange}
            className="order-filter-inputs"
          >
            {data.options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </Form.Select>
        );
      }

      // Set input labels for date input types.
      let inputLabel = null;
      if (data.type === "date") {
        inputLabel = (
          <Form.Label className="date-input-labels">
            {data.placeholder}
          </Form.Label>
        );
      }

      // FormGroups for regular input types.
      return (
        <Form.Group key={data.name} className="order-filter-inputs">
          {inputLabel}
          <Form.Control
            type={data.type}
            name={data.name}
            value={data.value}
            onChange={handleInputChange}
            placeholder={data.placeholder}
          />
        </Form.Group>
      );
    });
  }

  return (
    <div className="w-100">
      <h2>Orders Filter</h2>

      <div>
        <Card>
          <Card.Body>
            <Form>
              {getInputFilters()}

              <Form.Group className="d-flex justify-content-between order-filter-inputs">
                <Button size="sm" color="primary" onClick={handleApplyFilters}>
                  Apply
                </Button>
                <Button size="sm" variant="danger" onClick={handleResetFilters}>
                  Reset All
                </Button>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default OrdersTableFilters;
