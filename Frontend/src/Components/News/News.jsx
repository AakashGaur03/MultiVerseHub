import React, { useState } from "react";
import { getNewsApi } from "../../Api";
import { Form } from "react-bootstrap";

const News = () => {
  const [query, setQuery] = useState("");
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const handleSubmitNews = async (e) => {
    e.preventDefault();
    const response = await getNewsApi(query);
    console.log(response);
  };
  return (
    <div>
      News
      <Form onSubmit={handleSubmitNews}>
        <Form.Label htmlFor="searchQuery">Search</Form.Label>
        <Form.Control
          type="text"
          onChange={handleChange}
          value={query}
          id="searchQuery"
          data-id="qyuery"
        />

        <button type="submit" className="btn btn-outline-primary">
          Submit
        </button>
      </Form>
    </div>
  );
};

export default News;
