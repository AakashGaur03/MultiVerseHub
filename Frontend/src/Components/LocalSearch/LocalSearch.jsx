import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getEntertainmentSearchData, getNews } from "../../Features";

const LocalSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [prevSearchQuery, setPrevSearchQuery] = useState("");
  const dispatch = useDispatch();
  const currentSidebar = useSelector((state) => state.sidebar.currentSidebar);

  const handleLocalSearch = async () => {
    if (searchQuery.trim() === "" && prevSearchQuery.trim() !== "") {
      if (location.pathname.includes("/news")) {
        await dispatch(getNews(searchQuery));
      } else if (location.pathname.includes("/entertainment")) {
        let category = "";
        if (currentSidebar === "TV") {
          category = "tv";
        } else {
          category = "movie";
        }
        console.log(category);
        let payload = {
          category,
          searchQuery,
        };
        console.log(searchQuery.trim(), "ff");
        // if(searchQuery.trim()!==""){
        await dispatch(getEntertainmentSearchData(payload));
        // }
      }
    } else if (searchQuery.trim() !== "") {
      // If the current query is not empty, call the search API
      if (location.pathname.includes("/news")) {
        await dispatch(getNews(searchQuery));
      } else if (location.pathname.includes("/entertainment")) {
        let category = "";
        if (currentSidebar === "TV") {
          category = "tv";
        } else {
          category = "movie";
        }
        let payload = {
          category,
          searchQuery,
        };
        await dispatch(getEntertainmentSearchData(payload));
      }
    }
    setPrevSearchQuery(searchQuery);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleLocalSearch();
    }, 1000);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };
  return (
    <div>
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search"
          onChange={handleChange}
          value={searchQuery}
          id="searchQuery"
          data-id="qyuery"
        />

        {/* <button type="submit" className="btn btn-outline-primary">
          Submit
        </button> */}
      </Form>
    </div>
  );
};

export default LocalSearch;
