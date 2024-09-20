import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { CustomCard, Weather, WordOfTheDay, truncateText } from "../../index";
import { getFinanceNews, getNews } from "../../Features";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../GlobalComp/formatDate";


const News = () => {
  // const [newsData, setNewsData] = useState([]);
  const loaderTrueNews = useSelector((state) => state.news.status === "loading");
  const [isLoadingNews, setIsLoadingNews] = useState(false);
  useEffect(() => {
    setIsLoadingNews(loaderTrueNews);
  }, [loaderTrueNews]);

  const loaderTrueFinance = useSelector(
    (state) => state.news.financeStatus === "loading"
  );
  const [isLoadingFinance, setIsLoadingFinance] = useState(false);
  useEffect(() => {
    setIsLoadingFinance(loaderTrueFinance);
  }, [loaderTrueFinance]);

  const activeSidebarItem = useSelector(
    (state) => state.sidebar.currentSidebar
  );
  const newsDataNew = useSelector(
    (state) => state.news?.data?.data?.responseData?.results
  );
  const financenewsDataNew = useSelector(
    (state) => state.news?.financeData?.data?.responseData?.results
  );
  useEffect(() => {
    handleNewsUpdate();
  }, [activeSidebarItem]);

  const handleNewsUpdate = async () => {
    await dispatch(getNews(activeSidebarItem));
  };

  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const callFinanceNewsApi = async () => {
    console.log("Is it CAlling");
    await dispatch(getFinanceNews("finance"));
  };
  useEffect(() => {
    callFinanceNewsApi();
  }, []);
  return (
    <div className="w-full pl-0 md:pl-11">
      <Row>
        <Col md={8} style={{ minWidth: "66.66666667%" }}>
          {newsDataNew?.length > 0 ? (
            <>
              {newsDataNew?.slice(0, 9).map((news, index) => (
                <div key={index}>
                  <CustomCard
                    alt={"News"}
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
          ) : isLoadingNews ? (
            <div className="w-full flex justify-center hscreen align-items-center">
              <div className="loader"></div>
            </div>
          ) : (
            <div>No News data Found</div>
          )}
        </Col>
        <Col md={4}>
          <div className="colMd4Div" style={{ position: "sticky", top: "0" }}>
            <Weather />
            <WordOfTheDay />

            <div>
              {financenewsDataNew?.length > 0 ? (
                <>
                  {financenewsDataNew?.slice(0, 6).map((news, index) => (
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
                                <Card.Body className="limit2Lines hover:text-amber-500 p-0">
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
              ) : isLoadingFinance ? (
                <div className="w-full flex justify-center hscreen align-items-center">
                  <div className="loader"></div>
                </div>
              )  : (
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
