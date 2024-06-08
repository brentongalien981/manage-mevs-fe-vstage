import React from "react";
import { Form, Pagination } from "react-bootstrap";
import useOrders from "../../hooks/useOrders";

const PageNavigator = (props) => {
  const {
    state,
    handlePageNumChange,
    handlePageNumEnter,
    handlePageNext,
    handlePagePrevious,
  } = useOrders();

  const pageNumInput = (
    <Form className="mx-4 w-50 form-inline d-flex justify-content-center">
      <Form.Group className="w-50 pr-1">
        <Form.Control
          value={state.pageNavigatorData.page}
          type="number"
          min="1"
          name="pageNum"
          onChange={handlePageNumChange}
          onKeyPress={handlePageNumEnter}
          className="mb-3 w-100"
        />
      </Form.Group>

      <Form.Group className="w-50 pl-1 mb-2">
        <Form.Label>{" of " + state.pageNavigatorData.numPages}</Form.Label>
      </Form.Group>
    </Form>
  );

  return (
    <div className="d-flex justify-content-center mt-4">
      <Pagination aria-label="Page navigation example">
        <Pagination.Prev onClick={handlePagePrevious} />

        {pageNumInput}

        <Pagination.Next onClick={handlePageNext} />
      </Pagination>
    </div>
  );
};

export default PageNavigator;
