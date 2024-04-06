import React, { useEffect, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { truncateText } from "../../index";
import { getNews } from "../../Features";
import { useDispatch, useSelector } from "react-redux";

const News = ({
  query,
  setQuery,
  newsData,
  setNewsData,
  handleChange,
  handleSubmitNews,
}) => {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear() % 100;

    return `${day}/${month}/${year}`;
  }
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  // const [query, setQuery] = useState("");
  // const [newsData, setNewsData] = useState([]);
  // const handleChange = (e) => {
  //   setQuery(e.target.value);
  // };
  // const handleSubmitNews = async (e) => {
  //   e.preventDefault();

  //   const response = await dispatch(getNews(query));
  //   if (response) {
  //     setNewsData(response.data.data.responseData.results);
  //   }
  // };

  useEffect(() => {
    dispatch(getNews(query)).then((response) => {
      setNewsData(response.data.data.responseData.results);
    });
  }, []);
  return (
    <div>
      {/* News */}
      {/* <Form onSubmit={handleSubmitNews}>
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
      </Form> */}
      {newsData.length > 0 ? (
        <>
          <Row className="">
            <Col lg={12}>
              <Row>
                {newsData.slice(0,9).map((news, index) => (
                  <Col lg={4} md={6} key={index} className="d-flex justify-center mb-3 mt-3">
                    <Card style={{ width: "18rem" }}>
                      <Card.Img
                        variant="top"
                        alt="ImageNotFound.png"
                        className="cardImages"
                        src={
                          news.image_url && !news.image_url.includes("410")
                            ? news.image_url
                            : "/ImageNotFound.png"
                        }
                        onError={(e) => {
                          console.error("Error loading image:", e);
                          e.target.src = "/ImageNotFound.png";
                        }}
                      />
                      <Card.Body className="minHeightCard">
                        <Card.Title className="limit2Lines">
                          {news.title
                            ? truncateText(news.title, 10)
                            : "No Title Found"}
                        </Card.Title>
                        <Card.Text className="limit5Lines">
                          {news.description
                            ? truncateText(news.description, 60)
                            : "No Description Found"}
                        </Card.Text>
                        <a
                          target="_blank"
                          href={news.link}
                          className="btn border-fuchsia-700 hover:bg-pink-400"
                        >
                          Read Full News
                        </a>
                        <div className="d-flex justify-between mt-6">

                        <a href={news.source_url} target="_blank">
                          <img
                            variant="top"
                            alt="LogoNotAvail.png"
                            height={30}
                            width={30}
                            src={
                              news.source_icon &&
                              !news.source_icon.includes("410")
                                ? news.source_icon
                                : "/LogoNotAvail.png"
                            }
                            onError={(e) => {
                              console.error("Error loading image:", e);
                              e.target.src = "/LogoNotAvail.png";
                              e.target.style.height ="50px";
                              e.target.style.width = "50px";
                            }}
                          />
                        </a>
                        <strong>

                        Updated on : {formatDate(news.pubDate)}
                        </strong>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
            {/* <Col lg={3}>
              {newsData.slice(6).map((news, index) => (
                <div key={index}>
                  <Card style={{ width: "18rem" }}>
                    <Card.Img
                      variant="top"
                      alt="ImageNotFound.png"
                      src={
                        news.image_url && !news.image_url.includes("410")
                          ? news.image_url
                          : "/ImageNotFound.png"
                      }
                      onError={(e) => {
                        console.error("Error loading image:", e);
                        e.target.src = "/ImageNotFound.png";
                      }}
                    />
                    <Card.Body>
                      <Card.Title>
                        {news.title
                          ? truncateText(news.title, 10)
                          : "No Title Found"}
                      </Card.Title>
                      <Card.Text>
                        {news.description
                          ? truncateText(news.description, 60)
                          : "No Description Found"}
                      </Card.Text>
                      <a
                        target="_blank"
                        href={news.link}
                        className="btn border-fuchsia-700 hover:bg-pink-400"
                      >
                        Read Full News
                      </a>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </Col> */}
          </Row>
        </>
      ) : (
        <div>No data Found</div>
      )}
    </div>
  );
};

export default News;
