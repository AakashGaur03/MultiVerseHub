import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getcricketSearchPlayer,
  getEntertainmentSearchData,
  getNews,
} from "../../Features";
import LocalSearchDialogBox from "./LocalSearchDialogBox";

const LocalSearch = () => {
  const [searchLocalQuery, setSearchLocalQuery] = useState("");
  const [prevSearchLocalQuery, setPrevSearchLocalQuery] = useState("");
  const dispatch = useDispatch();
  const currentSidebar = useSelector((state) => state.sidebar.currentSidebar);
  const searchPlayersData = useSelector((state) => state.cricket.searchPlayer);

  const callSearch = async () => {
    if (location.pathname.includes("/news")) {
      await dispatch(getNews(searchLocalQuery));
    } else if (location.pathname.includes("/entertainment")) {
      let category = "";
      if (currentSidebar === "TV") {
        category = "tv";
      } else {
        category = "movie";
      }
      let payload = {
        category,
        searchLocalQuery,
      };
      await dispatch(getEntertainmentSearchData(payload));
    } else if (location.pathname.includes("/cricket")) {
      let payload = {
        playeraName: searchLocalQuery,
      };
      dispatch(getcricketSearchPlayer(payload));
    }
  };

  const handleLocalSearch = async () => {
    if (searchLocalQuery.trim() === "" && prevSearchLocalQuery.trim() !== "") {
      callSearch();
    } else if (searchLocalQuery.trim() !== "") {
      callSearch();
    }
    setPrevSearchLocalQuery(searchLocalQuery);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleLocalSearch();
    }, 1000);
    return () => clearTimeout(timeout);
  }, [searchLocalQuery]);

  const handleChange = (e) => {
    setSearchLocalQuery(e.target.value);
  };
  return (
    <div>
      <Form className="d-flex">
        <Form.Control
          className="min-w-36"
          type="search"
          placeholder="Search"
          onChange={handleChange}
          value={searchLocalQuery}
          id="searchLocalQuery"
          data-id="qyuery"
        />

        {/* <button type="submit" className="btn btn-outline-primary">
          Submit
        </button> */}
      </Form>
      {searchPlayersData && (
        <LocalSearchDialogBox
          searchPlayersData={searchPlayersData}
          setSearchLocalQuery={setSearchLocalQuery}
        />
      )}
    </div>
  );
};

export default LocalSearch;
