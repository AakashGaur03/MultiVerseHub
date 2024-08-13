import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { CustomCard, Weather, WordOfTheDay, truncateText } from "../../index";
import { getNews } from "../../Features";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../GlobalComp/formatDate";

const News = ({ query }) => {
  const [newsData, setNewsData] = useState([]);

  const activeSidebarItem = useSelector(
    (state) => state.sidebar.currentSidebar
  );
  useEffect(() => {
    handleNewsUpdate();
  }, [activeSidebarItem]);

  const handleNewsUpdate = async () => {
    const response = await dispatch(getNews(activeSidebarItem));
    if (response) {
      setNewsData(response.data.data.responseData.results);
    }
  };

  const [financeNews, setFinanceNews] = useState([]);
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNews("finance")).then((response) => {
      setFinanceNews(response.data.data.responseData.results);
    });
  }, []);
  return (
    <div className="w-full">
      <Row>
        <Col md={8} style={{minWidth:"66.66666667%"}}>
          {newsData.length > 0 ? (
            <>
              {newsData.slice(0, 9).map((news, index) => (
                <div key={index}>
                  <CustomCard
                    index={index}
                    imageUrls={
                      news.image_url && !news.image_url.includes("410")
                        ? news.image_url
                        : "/ImageNotFound.png"
                    }
                    onError={(e) => {
                      e.target.src = "/ImageNotFound.png";
                    }}
                    redirectLink={news.link}
                    newsStoryHLine={
                      news.title
                        ? truncateText(news.title, 10)
                        : "No Title Found"
                    }
                    newsStoryIntro={
                      news.description
                        ? truncateText(news.description, 60)
                        : "No Description Found"
                    }
                    newsStorySource={
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
                    }
                    updatedOn={formatDate(news.pubDate)}
                  />
                </div>
              ))}
            </>
          ) : (
            <div>No News data Found</div>
          )}
        </Col>
        <Col md={4}>
          <div className="colMd4Div" style={{ position: "sticky", top: "0" }}>
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
                                news.image_url &&
                                !news.image_url.includes("410")
                                  ? news.image_url
                                  : "/ImageNotFound.png"
                              }
                              onError={(e) => {
                                e.target.src = "/ImageNotFound.png";
                              }}
                            />
                          </Col>
                          <Col
                            md={8}
                            className="d-flex justify-center flex-col"
                          >
                            <div>
                              <a href={news.link} target="_blank">
                                <Card.Body className="limit2Lines hover:text-amber-500">
                                  {news.title
                                    ? truncateText(news.title, 10)
                                    : "No Title Found"}
                                </Card.Body>
                              </a>
                            </div>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  ))}
                </>
              ) : (
                <div>No News data Found</div>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default News;
