import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getCricketNewsCBs, getCricketPointsTable } from "../../Features";
import { Card, Col, Row } from "react-bootstrap";
import truncateText from "../../GlobalComp/TruncateText";
import formatDate from "../../GlobalComp/formatDate";

const Cricket = ({
  query,
  setQuery,
  cricketData,
  setCricketData,
  handleChange,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pointstable, setpointstable] = useState({ id: null, data: [] });
  const [imageUrl, setImageUrl] = useState("");
  const [validNews, setValidNews] = useState("");

  const getPointsTable = async (id) => {
    try {
      const response = await dispatch(getCricketPointsTable(id));
      console.log(response, "1");
      setQuery("");
      let datatoStrore = {};
      if (response) {
        console.log(
          response.pointsTable.map((element) => element),
          "JJJJ"
        );
        console.log(response.pointsTable);
        datatoStrore = {
          id,
          data: response.pointsTable.map((element) => element),
        };
      } else {
        datatoStrore = {
          id: -1,
          data: [],
        };
      }
      setpointstable(datatoStrore);

      navigate(`${id}/pointsTable`, {
        state: { pointsTableData: datatoStrore },
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCricketNews();
  }, []);

  const getCricketNews = async () => {
    const response = await dispatch(getCricketNewsCBs());
    console.log(response, "HJ");
    // let ValidNews = []
    // response.storyList.forEach(element => {
    //   if(element.story){
    //     ValidNews.push(element)
    //   }
    // });
    let temp = response.storyList.filter((element) => element.story);
    setValidNews(temp);
    console.log(validNews,"validNews")
  };

  return (
    <>
      <div className="flex overflow-y-auto">
        {cricketData.length > 0 ? (
          cricketData.map((data, index) => (
            <div className="min-w-52 me-4" md={4} key={index}>
              <div>
                {data.matchInfo?.matchDesc} {data.matchInfo?.seriesName}{" "}
                {data.matchInfo?.matchFormat}
              </div>
              <div>
                {data.matchInfo.team1?.teamSName}
                {data.matchScore?.team1Score?.inngs1.runs &&
                  !data.matchScore?.team1Score?.inngs2?.runs && (
                    <>
                      : {data.matchScore?.team1Score?.inngs1.runs}-
                      {data.matchScore?.team1Score?.inngs1.wickets} (
                      {data.matchScore?.team1Score?.inngs1.overs})
                    </>
                  )}
                {data.matchScore?.team1Score?.inngs1.runs &&
                  data.matchScore?.team1Score?.inngs2?.runs && (
                    <>
                      : {data.matchScore?.team1Score?.inngs1.runs}-
                      {data.matchScore?.team1Score?.inngs1.wickets}{" "}
                      {data.matchScore?.team1Score?.inngs2?.runs}-
                      {data.matchScore?.team1Score?.inngs2?.wickets}
                    </>
                  )}
              </div>
              <div></div>
              <div>
                {data.matchInfo.team2?.teamSName}
                {data.matchScore?.team2Score?.inngs1.runs &&
                  !data.matchScore?.team2Score?.inngs2?.runs && (
                    <>
                      : {data.matchScore?.team2Score?.inngs1.runs}-
                      {data.matchScore?.team2Score?.inngs1.wickets} (
                      {data.matchScore?.team2Score?.inngs1.overs})
                    </>
                  )}
                {data.matchScore?.team2Score?.inngs1.runs &&
                  data.matchScore?.team2Score?.inngs2?.runs && (
                    <>
                      : {data.matchScore?.team2Score?.inngs1.runs}-
                      {data.matchScore?.team2Score?.inngs1.wickets}{" "}
                      {data.matchScore?.team2Score?.inngs2?.runs}-
                      {data.matchScore?.team2Score?.inngs2?.wickets}
                    </>
                  )}
              </div>
              <div></div>
              <div>{data.matchInfo?.status}</div>
              <NavLink
                className="cursor-pointer"
                onClick={() => getPointsTable(data.matchInfo.seriesId)}
              >
                Table
              </NavLink>
            </div>
          ))
        ) : (
          <div>No Data Available</div>
        )}
      </div>
      {/* <button onClick={() => getCricketNews()}>GET NEWS</button> */}
<div>

      {validNews.length > 0 ? (
        <>
          {validNews.slice(0, 9).map((news, index) => (
            <Card
              style={{}}
              key={index}
              className="my-8 ms-3 rounded-2xl border-0"
            >
              <Card.Body className="minHeightCard">
                <Row>
                  <Col md={4} className="d-flex align-items-center">
                    {/* <Card.Img
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
                        /> */}
                  </Col>
                  <Col md={8} className="d-flex justify-center flex-col">
                    <div>
                      {/* <a href={news.link} target="_blank"> */}
                      <Card.Title className="limit2Lines hover:text-amber-500">
                        {news.story.hline
                          ? truncateText(news.story.hline, 10)
                          : "No Title Found"}
                      </Card.Title>
                      {/* </a> */}
                      <Card.Text className="limit5Lines">
                        {news.story.intro
                          ? truncateText(news.story.intro, 60)
                          : "No Description Found"}
                      </Card.Text>
                    </div>
                    <div>
                      <div className="d-flex justify-between mt-6">
                        {/* <a href={news.source_url} target="_blank">
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
                            </a> */}
                        <strong>Updated on : {formatDate(news.story.pubTime)}</strong>
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
</div>
    </>
  );
};

export default Cricket;
