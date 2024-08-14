import React from "react";
import { Form } from "react-bootstrap";

const LocalSearch = ({ query, handleChange }) => {
  const handleSubmitNews = (e) =>{
    e.preventDefault()
  }
  return (
    <div>
      {/* <Form onSubmit={handleSubmitNews} className="d-flex">
        <Form.Control
          type="text"
          placeholder="Search"
          onChange={handleChange}
          value={query}
          id="searchQuery"
          data-id="qyuery"
        />

        <button type="submit" className="btn btn-outline-primary">
          Submit
        </button>
      </Form> */}
    </div>
  );
};

export default LocalSearch;
