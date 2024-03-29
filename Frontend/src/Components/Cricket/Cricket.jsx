// import React from 'react'

// const cricket = () => {
//   return (
//     <div className='min-h-screen'>
//       Cricket
//     </div>
//   )
// }

// export default cricket
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { truncateText } from "../../index";
import { getCricket } from "../../Features";
import { useDispatch } from "react-redux";

const Cricket = () => {
  const dispatch = useDispatch();
  const [cricketQuery, setCricketQuery] = useState("");
  const [cricketData, setCricketData] = useState([]);
  const handleChange = (e) => {
    setCricketQuery(e.target.value);
  };
  const handleSubmitCricket = async (e) => {
    e.preventDefault();

    const response = await dispatch(getCricket(cricketQuery));
    if (response) {
      setCricketData(response.data.data.responseData.results);
    }
  };

  useEffect(() => {
    dispatch(getCricket(cricketQuery)).then((response) => {
      console.log(response, "AA");
      console.log(response.data.responseData, "BB");
      const matchTypes = response.data.responseData.typeMatches.map((matchType) => {
        console.log(matchType.seriesMatches, "CC")
        return matchType.seriesMatches
      });
      console.log(matchTypes, "DD");
      // setCricketData(response.data.data.responseData.results);
    });
  }, []);
  return (
    <div>
      Cricket
      <Form onSubmit={handleSubmitCricket}>
        <Form.Label htmlFor="searchQuery">Search</Form.Label>
        <Form.Control
          type="text"
          onChange={handleChange}
          value={cricketQuery}
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

export default Cricket;
