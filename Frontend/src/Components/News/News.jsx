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
      News
      {
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

          {newsData.length > 0 ? (
            <>
              <Row className="">
                <Col lg={9}>
                  <Row>
                    {newsData.slice(0, 8).map((news, index) => (
                      <Col lg={6} key={index}>
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
                      </Col>
                    ))}
                  </Row>
                </Col>
                <Col lg={3}>
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
                </Col>
              </Row>
            </>
          ) : (
            <div>No data Found</div>
          )}
        </Form>
      }
    </div>
  );
};

export default News;
