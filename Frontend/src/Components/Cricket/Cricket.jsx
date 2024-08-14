import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getCricket,
  getCricketImageCBs,
  getCricketNewsCBs,
  getCricketPointsTable,
  getCricketRanking,
} from "../../Features";
import truncateText from "../../GlobalComp/TruncateText";
import { formatDate } from "../../GlobalComp/formatDate";
import { getImageUrl } from "../../GlobalComp/getImageFunc";
import CustomCard from "../../GlobalComp/CustomCard";

const Cricket = ({ setQuery }) => {
  const activeSidebarItem = useSelector(
    (state) => state.sidebar.currentSidebar
  );
  const [typeMatches, setTypeMatches] = useState([]);
  const [cricketData, setCricketData] = useState([]);
  const [newCricketData, setNewCricketData] = useState([]);
  const [rankingData, setRankingData] = useState([]);
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
    dispatch(getCricket()).then((response) => {
      const typeMatches = response.data.responseData.typeMatches;
      setTypeMatches(typeMatches);
      let InterMatches = typeMatches.find(
        (match) => match.matchType == "International"
      );
      let WomenMatches = typeMatches.find(
        (match) => match.matchType == "Women"
      );
      let LeagueMatches = typeMatches.find(
        (match) => match.matchType == "League"
      );

      let IntlMatches = InterMatches.seriesMatches
        .filter((match) => match.seriesAdWrapper)
        .slice(0, 2); // It slices number of series to 2

      let LegMatches = LeagueMatches.seriesMatches
        .filter((match) => match.seriesAdWrapper)
        .slice(0, 2); // It slices number of series to 2

      let WomMatches = WomenMatches.seriesMatches
        .filter((match) => match.seriesAdWrapper)
        .slice(0, 2); // It slices number of series to 2

      let newCricketData2 = [];

      // Adding International matches to newCricketData2
      LegMatches.forEach((match) => {
        if (Array.isArray(match.seriesAdWrapper.matches)) {
          newCricketData2.push(...match.seriesAdWrapper.matches.slice(0, 2)); // It slices mathces in series to 2
        }
      });
      IntlMatches.forEach((match) => {
        if (Array.isArray(match.seriesAdWrapper.matches)) {
          newCricketData2.push(...match.seriesAdWrapper.matches.slice(0, 2)); // It slices mathces in series to 2
        }
      });
      WomMatches.forEach((match) => {
        if (Array.isArray(match.seriesAdWrapper.matches)) {
          newCricketData2.push(...match.seriesAdWrapper.matches.slice(0, 2)); // It slices mathces in series to 2
        }
      });

      // Update the state once with all the data
      setCricketData(newCricketData2);
      setNewCricketData(newCricketData2);
    });
  }, []);
  useEffect(() => {
    const updateCricketData = async () => {
      if (activeSidebarItem === "All") {
        setCricketData(newCricketData);
      } else if (activeSidebarItem === "Rankings") {
        if (rankingData.length <= 0) {
          const response = await dispatch(
            getCricketRanking("odi", "", "allrounders")
          );
          setRankingData(response);
          navigate(`ranking`, {
            state: { rankingsData: response },
          });
        } else {
          navigate(`ranking`, {
            state: { rankingsData: rankingData },
          });
        }
      } else {
        let InterMatches = typeMatches.find(
          (match) => match.matchType == activeSidebarItem
        );

        let IntlMatches = InterMatches?.seriesMatches
          .filter((match) => match.seriesAdWrapper)
          .slice(0, 2); // It slices number of series to 2

        let FilteredCricketData = [];
        IntlMatches?.forEach((match) => {
          if (Array.isArray(match.seriesAdWrapper.matches)) {
            FilteredCricketData.push(...match.seriesAdWrapper.matches); // It slices mathces in series to 2
          }
          console.log(FilteredCricketData);
        });
        setCricketData(FilteredCricketData);
        console.log("routing");
        console.log("routed");
      }
    };

    updateCricketData();
  }, [activeSidebarItem]);
  useEffect(() => {
    getCricketNews();
  }, []);

  const getCricketNews = async () => {
    const response = await dispatch(getCricketNewsCBs());
    console.log(response, "HJ");

    let temp = response.storyList.filter((element) => element.story);
    setValidNews(temp);
    temp.forEach((news, index) => {
      if (news.story.imageId) {
        // setTimeout(() => fetchImage(news.story.imageId), index * 500); // Delay each image fetch by 500ms
        setTimeout(() => {
          getImageUrl(
            news.story.imageId,
            imageUrls,
            setImageUrls,
            setLoadingImages,
            dispatch
          );
        }, 1000);
      }
    });
    console.log(validNews, "validNews");
  };

  const generateRedirectLink = (id, headLine) => {
    let splitHLine = headLine.split(" ");
    let joinedHLine = splitHLine.join("-");
    let url = `https://www.cricbuzz.com/cricket-news/${id}/${joinedHLine}`;
    return url;
  };

  return (
    <div className="overflow-y-auto pl-0 md:pl-11 ">
      <div className="flex overflow-y-auto ">
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
          <div>No Cricket Data Available</div>
        )}
      </div>
      <div>
        {validNews.length > 0 ? (
          <>
            {validNews.slice(0, 9).map((news, index) => (
              <div key={index}>
                <CustomCard
                  index={index}
                  imageUrls={imageUrls[news.story.imageId]}
                  onError={(e) => {
                    e.target.src = "/ImageNotFound.png";
                  }}
                  redirectLink={generateRedirectLink(
                    news.story.id,
                    news.story.hline
                  )}
                  newsStoryHLine={
                    news.story.hline
                      ? truncateText(news.story.hline, 10)
                      : "No Title Found"
                  }
                  newsStoryIntro={
                    news.story.intro
                      ? truncateText(news.story.intro, 60)
                      : "No Description Found"
                  }
                  newsStorySource={
                    news.story.source == "Cricbuzz" && (
                      <a href="https://www.cricbuzz.com/" target="_blank">
                        <img
                          className="rounded-full"
                          variant="top"
                          alt="LogoNotAvail.png"
                          height={30}
                          width={30}
                          src="/cricbuzzLogo.png"
                        />
                      </a>
                    )
                  }
                  updatedOn={formatDate(news.story.pubTime)}
                />
              </div>
            ))}
          </>
        ) : (
          <div>No Cricket News Found</div>
        )}
      </div>
    </div>
  );
};

export default Cricket;
