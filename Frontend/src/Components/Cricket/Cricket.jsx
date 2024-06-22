import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getCricketImageCBs,
  getCricketNewsCBs,
  getCricketPointsTable,
} from "../../Features";
import { Card, Col, Row } from "react-bootstrap";
import truncateText from "../../GlobalComp/TruncateText";
import formatDate from "../../GlobalComp/formatDate";
import { getImageUrl } from "../../GlobalComp/getImageFunc";

const Cricket = ({
  query,
  setQuery,
  cricketData,
  setCricketData,
  handleChange,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imageUrls, setImageUrls] = useState({});
  const [loadingImages, setLoadingImages] = useState({});
  const [pointstable, setpointstable] = useState({ id: null, data: [] });
  const [validNews, setValidNews] = useState("");

  const getPointsTable = async (id) => {
    try {
      const response = await dispatch(getCricketPointsTable(id));
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

    let temp = response.storyList.filter((element) => element.story);
    setValidNews(temp);
    temp.forEach((news, index) => {
      // if (news.story.imageId) {
      //   fetchImage(news.story.imageId);
      // }
      if (news.story.imageId) {
        // setTimeout(() => fetchImage(news.story.imageId), index * 500); // Delay each image fetch by 500ms
        setTimeout(() => {
          
          getImageUrl(news.story.imageId,imageUrls,setImageUrls,setLoadingImages,dispatch)
        }, 1000);

      }
    });
    console.log(validNews, "validNews");
  };

  // const fetchImage = async (imageId) => {
  //   setLoadingImages((prev) => ({ ...prev, [imageId]: true }));
  //   try {
  //     const response = await dispatch(getCricketImageCBs(imageId));
  //     if (response) {
  //       setImageUrls((prevState) => ({
  //         ...prevState,
  //         [imageId]: response.imageUrl,
  //       }));
  //     }
  //   } catch (error) {
  //     console.error("Error fetching image:", error);
  //   } finally {
  //     setLoadingImages((prevState) => ({
  //       ...prevState,
  //       [imageId]: false,
  //     }));
  //   }
  // };
  const generateRedirectLink = (id,headLine) =>{
    let splitHLine = headLine.split(" ")
    let joinedHLine = splitHLine.join('-')
    let url = `https://www.cricbuzz.com/cricket-news/${id}/${joinedHLine}`
    return url
  }

  return (
    <div className="overflow-y-auto">
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
                      <Card.Img
                        variant="top"
                        alt="ImageNotFound.png"
                        className="cardImages"
                        src={imageUrls[news.story.imageId]}
                        onError={(e) => {
                          e.target.src = "/ImageNotFound.png";
                        }}
                      />
                    </Col>
                    <Col md={8} className="d-flex justify-center flex-col">
                      <div>
                        <a href={generateRedirectLink(news.story.id,news.story.hline)} target="_blank">
                          <Card.Title className="limit2Lines hover:text-amber-500">
                            {news.story.hline
                              ? truncateText(news.story.hline, 10)
                              : "No Title Found"}
                          </Card.Title>
                        </a>
                        <Card.Text className="limit5Lines">
                          {news.story.intro
                            ? truncateText(news.story.intro, 60)
                            : "No Description Found"}
                        </Card.Text>
                      </div>
                      <div>
                        <div className="d-flex justify-between mt-6 ml-8">
                          {news.story.source=="Cricbuzz" &&<a href='https://www.cricbuzz.com/' target="_blank">
                              <img
                              className="rounded-full"
                                variant="top"
                                alt="LogoNotAvail.png"
                                height={30}
                                width={30}
                                src='/cricbuzzLogo.png'
                              />
                            </a>}
                          <strong className="me-8">
                            Updated on : {formatDate(news.story.pubTime)}
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
      </div>
    </div>
  );
};

export default Cricket;
