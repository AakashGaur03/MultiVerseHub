import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { truncateText } from "../../index";
import { getNews } from "../../Features";
import { useDispatch } from "react-redux";

const News = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [newsData, setNewsData] = useState([]);
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const handleSubmitNews = async (e) => {
    e.preventDefault();

    const response = await dispatch(getNews(query));
    if (response) {
      setNewsData(response.data.data.responseData.results);
    }
  };

  useEffect(() => {});
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

        {/* {newsData.length > 0 ? (
          <>
            <Row className="d-flex gap-y-12 justify-center">
              {newsData.map((news, index) => (
                <React.Fragment key={index}>
                  {index < 8 ? (
                      <Col lg={8}>
                    <Row>
                      <Col lg={6}>
                        <Card style={{ width: "18rem" }}>
                          <Card.Img
                            variant="top"
                            alt="public/ImageNotFound.png"
                            src={
                              news.image_url && !news.image_url.includes("410")
                                ? news.image_url
                                : "/public/ImageNotFound.png"
                            }
                            onError={(e) => {
                              console.error("Error loading image:", e);
                              e.target.src = "/public/ImageNotFound.png";
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
                    </Row>
                      </Col>
                  ) : (
                    <div>Hello</div>
                  )}
                </React.Fragment>
              ))}
            </Row>
          </>
        ) : (
          <div>No data Found</div>
        )} */}
        {newsData.length > 0 ? (
          <>
            <Row className="">
              {/* Display news in two parts: col-md-9 and col-md-3 */}
              <Col lg={9}>
                {/* Render the first 6 news */}
                <Row>
                  {newsData.slice(0, 12).map((news, index) => (
                    <Col lg={6} key={index}>
                      <Card style={{ width: "18rem" }}>
                        <Card.Img
                          variant="top"
                          alt="public/ImageNotFound.png"
                          src={
                            news.image_url && !news.image_url.includes("410")
                              ? news.image_url
                              : "/public/ImageNotFound.png"
                          }
                          onError={(e) => {
                            console.error("Error loading image:", e);
                            e.target.src = "/public/ImageNotFound.png";
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
                {/* Render the remaining news separately */}
                {newsData.slice(6).map((news, index) => (
                  <div key={index}>
                    <Card style={{ width: "18rem" }}>
                      <Card.Img
                        variant="top"
                        alt="public/ImageNotFound.png"
                        src={
                          news.image_url && !news.image_url.includes("410")
                            ? news.image_url
                            : "/public/ImageNotFound.png"
                        }
                        onError={(e) => {
                          console.error("Error loading image:", e);
                          e.target.src = "/public/ImageNotFound.png";
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
    </div>
  );
};

export default News;
