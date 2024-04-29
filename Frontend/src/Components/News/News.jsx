import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Weather, WordOfTheDay, truncateText } from "../../index";
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

  const [financeNews,setFinanceNews] = useState([])
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
    dispatch(getNews("finance")).then((response) => {
      setFinanceNews(response.data.data.responseData.results);
    });
  }, []);
  return (
    <div>
      <Row>
        <Col md={8}>
          {newsData.length > 0 ? (
            <>
              {newsData.slice(0, 9).map((news, index) => (
                <Card
                  style={{}}
                  key={index}
                  // className="my-8 ms-3 rounded-2xl border-zinc-600"
                  className="my-8 ms-3 rounded-2xl border-0"
                >
                  <Card.Body className="minHeightCard">
                    <Row>
                      <Col md={4} className="d-flex align-items-center">
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
                            e.target.src = "/ImageNotFound.png";
                          }}
                        />
                      </Col>
                      <Col md={8} className="d-flex justify-center flex-col">
                        <div>
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
                        </div>
                        <div>
                          <a
                            target="_blank"
                            href={news.link}
                            className="btn border-fuchsia-700 hover:bg-pink-400 text-white"
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
                                  e.target.style.height = "50px";
                                  e.target.style.width = "50px";
                                }}
                              />
                            </a>
                            <strong>
                              Updated on : {formatDate(news.pubDate)}
                            </strong>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </>
          ) : (
            <div>No data Found</div>
          )}
        </Col>
        <Col md={4}>
          <Weather />
          <WordOfTheDay />

          <div>
            {financeNews.length > 0 ? (
              <>
                {financeNews.slice(0, 6).map((news, index) => (
                  <Card
                    style={{}}
                    key={index}
                    className="my-8 ms-3 rounded-2xl border-0"
                  >
                    <Card.Body className="minHeightCard">
                      <Row>
                        <Col md={4} className="d-flex align-items-center">
                          <Card.Img
                            variant="top"
                            alt="ImageNotFound.png"
                            className=""
                            src={
                              news.image_url && !news.image_url.includes("410")
                                ? news.image_url
                                : "/ImageNotFound.png"
                            }
                            onError={(e) => {
                              e.target.src = "/ImageNotFound.png";
                            }}
                          />
                        </Col>
                        <Col md={8} className="d-flex justify-center flex-col">
                          <div>
                            <Card.Body className="limit2Lines">
                              {news.title
                                ? truncateText(news.title, 10)
                                : "No Title Found"}
                            </Card.Body>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ))}
              </>
            ) : (
              <div>No data Found</div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default News;
