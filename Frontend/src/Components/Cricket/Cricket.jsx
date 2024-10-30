import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addFavSection, getCricket, getCricketNewsCBs, removeFavSection } from "../../Features";
import truncateText from "../../GlobalComp/TruncateText";
import { formatDate } from "../../GlobalComp/formatDate";
import { getImageUrl } from "../../GlobalComp/getImageFunc";
import CustomCard from "../../GlobalComp/CustomCard";
import LikeButton from "../../GlobalComp/LikeButton";
import { handleLikeOperation } from "../../GlobalComp/handleLikeClick";

const Cricket = ({ setQuery }) => {
  const activeSidebarItem = useSelector((state) => state.sidebar.currentSidebar);
  const loaderMatchTrue = useSelector((state) => state.cricket.matchStatus === "loading");

  const loaderNewsTrue = useSelector((state) => state.cricket.newsStatus === "loading");

  const matchData = useSelector((state) => state.cricket.matchData);
  const newsData = useSelector((state) => state.cricket.newsData);

  const [isLoadingNews, setIsLoadingNews] = useState(false);
  const [isLoadingMatch, setIsLoadingMatch] = useState(false);
  const [typeMatches, setTypeMatches] = useState([]);
  const [cricketData, setCricketData] = useState([]);
  const [newCricketData, setNewCricketData] = useState([]);
  // const [rankingData, setRankingData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imageUrls, setImageUrls] = useState({});
  const [loadingImages, setLoadingImages] = useState({});
  // const [pointstable, setpointstable] = useState({ id: null, data: [] });
  const [validNews, setValidNews] = useState([]);

  const [likedItems, setLikedItems] = useState({});
  const [favSectionDataAll, setFavSectionDataAll] = useState({});
  const favSectionData = useSelector((state) => state?.favSection?.allItem?.data?.favorite);
  const favSectionGameLoader = useSelector((state) => state?.favSection?.loader);
  const [isFavLoading, setIsFavLoading] = useState(false);

  const handleLikeClick = async (itemData, category = "cricketMatch") => {
    // Different data formats based on category
    if (category === "cricketMatch") {
      itemData = {
        id: itemData.matchInfo.matchId,
        cricketMatchId: itemData.matchInfo.matchId,
        seriesId: itemData.matchInfo.seriesId,
        description: itemData.matchInfo.matchDesc,
        seriesName: itemData.matchInfo.seriesName,
        matchFormat: itemData.matchInfo.matchFormat,
        team1SName: itemData.matchInfo.team1?.teamSName,
        team1inngs1runs: itemData.matchScore?.team1Score?.inngs1.runs,
        team1inngs1wickets: itemData.matchScore?.team1Score?.inngs1.wickets,
        team1inngs1overs: itemData.matchScore?.team1Score?.inngs1.overs,
        team1inngs2runs: itemData.matchScore?.team1Score?.inngs2?.runs,
        team1inngs2wickets: itemData.matchScore?.team1Score?.inngs2?.wickets,
        team2SName: itemData.matchInfo.team2?.teamSName,
        team2inngs1runs: itemData.matchScore?.team2Score?.inngs1.runs,
        team2inngs1wickets: itemData.matchScore?.team2Score?.inngs1.wickets,
        team2inngs1overs: itemData.matchScore?.team2Score?.inngs1.overs,
        team2inngs2runs: itemData.matchScore?.team2Score?.inngs2?.runs,
        team2inngs2wickets: itemData.matchScore?.team2Score?.inngs2?.wickets,
        matchStatus: itemData.matchInfo.status,
      };
    } else if (category === "cricketNews") {
      itemData = {
        id: itemData.story.id,
        cricketNewsId: itemData.story.id,
        imageId: itemData.story.imageId,
        hLine: itemData.story.hline,
        intro: itemData.story.intro,
        source: itemData.story.source,
        pubTime: itemData.story.pubTime,
      };
    }

    // Pass itemData and category to handleLikeOperation
    await handleLikeOperation({
      category,
      itemData,
      favSectionDataAll,
      setLikedItems,
      dispatch,
      addFavSection,
      removeFavSection,
    });
  };

  useEffect(() => {
    setFavSectionDataAll(favSectionData);
  }, [favSectionData]);

  useEffect(() => {
    setIsFavLoading(favSectionGameLoader);
  }, [favSectionGameLoader]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (favSectionDataAll && Object.keys(favSectionDataAll).length > 0) {
          // Map liked items
          const likedMatches = favSectionDataAll?.cricketMatch?.reduce((acc, match) => {
            acc[match.cricketMatchId] = true;
            return acc;
          }, {});
          const likedNews = favSectionDataAll?.cricketNews?.reduce((acc, news) => {
            acc[news.cricketNewsId] = true;
            return acc;
          }, {});

          // Set liked items
          setLikedItems({ ...likedMatches, ...likedNews });
        }
      } catch (error) {
        console.error("Error fetching cricket favorites:", error);
      }
    };

    fetchFavorites();
  }, [favSectionDataAll]);

  useEffect(() => {
    setIsLoadingNews(loaderNewsTrue);
  }, [loaderNewsTrue]);
  useEffect(() => {
    setIsLoadingMatch(loaderMatchTrue);
  }, [loaderMatchTrue]);

  const getPointsTable = async (id) => {
    setQuery("");
    setTimeout(() => {
      navigate(`${id}/pointsTable`);
    }, 0);
  };

  const callThisFunc = () => {
    let InterMatches = typeMatches?.find((match) => match.matchType === "International");
    let WomenMatches = typeMatches?.find((match) => match.matchType === "Women");
    let LeagueMatches = typeMatches?.find((match) => match.matchType === "League");

    let IntlMatches = InterMatches?.seriesMatches.filter((match) => match.seriesAdWrapper).slice(0, 2);

    let LegMatches = LeagueMatches?.seriesMatches.filter((match) => match.seriesAdWrapper).slice(0, 2);

    let WomMatches = WomenMatches?.seriesMatches.filter((match) => match.seriesAdWrapper).slice(0, 2);

    let newCricketData2 = [];

    LegMatches?.forEach((match) => {
      if (Array.isArray(match.seriesAdWrapper.matches)) {
        newCricketData2.push(...match.seriesAdWrapper.matches.slice(0, 2));
      }
    });
    IntlMatches?.forEach((match) => {
      if (Array.isArray(match.seriesAdWrapper.matches)) {
        newCricketData2.push(...match.seriesAdWrapper.matches.slice(0, 2));
      }
    });
    WomMatches?.forEach((match) => {
      if (Array.isArray(match.seriesAdWrapper.matches)) {
        newCricketData2.push(...match.seriesAdWrapper.matches.slice(0, 2));
      }
    });

    setTimeout(() => {
      setCricketData(newCricketData2);
      setNewCricketData(newCricketData2);
    }, 0);
  };

  useEffect(() => {
    if (matchData?.data?.responseData?.typeMatches?.length > 0) {
      const thistypeMatches = matchData?.data?.responseData?.typeMatches;
      setTypeMatches(thistypeMatches);
    } else {
      if (!matchData) {
        dispatch(getCricket());
      }
    }
  }, [matchData]);

  useEffect(() => {
    if (typeMatches?.length > 0) {
      callThisFunc();
    }
  }, [typeMatches]);

  useEffect(() => {
    const updateCricketData = async () => {
      if (activeSidebarItem === "All") {
        setCricketData(newCricketData);
      } else if (activeSidebarItem === "Rankings") {
        navigate(`ranking`);
      } else {
        let InterMatches = typeMatches.find((match) => match.matchType == activeSidebarItem);

        let IntlMatches = InterMatches?.seriesMatches.filter((match) => match.seriesAdWrapper).slice(0, 2); // It slices number of series to 2

        let FilteredCricketData = [];
        IntlMatches?.forEach((match) => {
          if (Array.isArray(match.seriesAdWrapper.matches)) {
            FilteredCricketData.push(...match.seriesAdWrapper.matches); // It slices mathces in series to 2
          }
        });
        // console.log(cricketData);
        setCricketData(FilteredCricketData);
      }
    };

    updateCricketData();
  }, [activeSidebarItem, typeMatches]);

  useEffect(() => {
    if (newsData?.storyList.length > 0) {
      let temp = newsData.storyList.filter((element) => element.story);
      setValidNews(temp);
    } else {
      if (!newsData) {
        // setTimeout(() => {
        dispatch(getCricketNewsCBs());
        // }, 500);
      }
    }
  }, [newsData]);

  useEffect(() => {
    if (validNews.length > 0) {
      getCricketNews();
    }
    // console.log(validNews);
  }, [validNews]);

  const getCricketNews = async () => {
    validNews?.forEach((news, index) => {
      if (news.story.imageId) {
        // setTimeout(() => fetchImage(news.story.imageId), index * 500); // Delay each image fetch by 500ms
        setTimeout(() => {
          getImageUrl(news.story.imageId, imageUrls, setImageUrls, setLoadingImages, dispatch);
        }, 1000);
      }
    });
  };

  const generateRedirectLink = (id, headLine) => {
    // let splitHLine = headLine.split(" ");
    // let joinedHLine = splitHLine.join("-");
    // let removeExtracomma = joinedHLine.replace(",", "");
    // let removeExtracomma2 = removeExtracomma.replace("'", "");
    // let finalUrl = removeExtracomma2.replace(/-+/g, "-");
    let finalUrl = headLine
      .replace(/'/g, "") // Remove single quotes
      .replace(/,/g, "") // Remove double quotes
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-"); // Replace multiple hyphens with a single hyphen

    let url = `https://www.cricbuzz.com/cricket-news/${id}/${finalUrl}`;
    return url;
  };

  return (
    <div className="overflow-y-auto pl-0 md:pl-11 w-full">
      {isFavLoading && (
        <div className="overlay">
          <div className="loader2"></div>
        </div>
      )}
      <div className="flex overflow-y-auto ">
        {cricketData.length > 0 ? (
          cricketData.map((data, index) => (
            <div className="min-w-52 me-4 relative" md={4} key={index}>
              <div className="absolute z-10 right-4 bottom-0">
                <LikeButton
                  customHeight="30px"
                  customWidth="30px"
                  customId={`likeButton-cricket-match-${data?.matchInfo?.matchId}`}
                  isActive={!!likedItems[data?.matchInfo?.matchId]}
                  onClick={() => handleLikeClick(data, "cricketMatch")}
                />
              </div>
              <div>
                {data.matchInfo?.matchDesc} {data.matchInfo?.seriesName} {data.matchInfo?.matchFormat}
              </div>
              <div>
                {data.matchInfo.team1?.teamSName}
                {data.matchScore?.team1Score?.inngs1.runs && !data.matchScore?.team1Score?.inngs2?.runs && (
                  <>
                    : {data.matchScore?.team1Score?.inngs1.runs}-{data.matchScore?.team1Score?.inngs1.wickets} (
                    {data.matchScore?.team1Score?.inngs1.overs})
                  </>
                )}
                {data.matchScore?.team1Score?.inngs1.runs && data.matchScore?.team1Score?.inngs2?.runs && (
                  <>
                    : {data.matchScore?.team1Score?.inngs1.runs}-{data.matchScore?.team1Score?.inngs1.wickets}{" "}
                    {data.matchScore?.team1Score?.inngs2?.runs}-{data.matchScore?.team1Score?.inngs2?.wickets}
                  </>
                )}
              </div>
              <div></div>
              <div>
                {data.matchInfo.team2?.teamSName}
                {data.matchScore?.team2Score?.inngs1.runs && !data.matchScore?.team2Score?.inngs2?.runs && (
                  <>
                    : {data.matchScore?.team2Score?.inngs1.runs}-{data.matchScore?.team2Score?.inngs1.wickets} (
                    {data.matchScore?.team2Score?.inngs1.overs})
                  </>
                )}
                {data.matchScore?.team2Score?.inngs1.runs && data.matchScore?.team2Score?.inngs2?.runs && (
                  <>
                    : {data.matchScore?.team2Score?.inngs1.runs}-{data.matchScore?.team2Score?.inngs1.wickets}{" "}
                    {data.matchScore?.team2Score?.inngs2?.runs}-{data.matchScore?.team2Score?.inngs2?.wickets}
                  </>
                )}
              </div>
              <div></div>
              <div>{data.matchInfo?.status}</div>
              <NavLink className="cursor-pointer" onClick={() => getPointsTable(data.matchInfo.seriesId)}>
                Table
              </NavLink>
            </div>
          ))
        ) : isLoadingMatch ? (
          <div className="w-full flex justify-center align-items-center mt-5">
            <div className="loader"></div>
          </div>
        ) : (
          <div>No Cricket Match Data Found</div>
        )}
      </div>
      <div>
        {validNews.length > 0 ? (
          <>
            {validNews.slice(0, 9).map((news, index) => (
              <div key={index} className="relative">
                <CustomCard
                  alt={"Cricket"}
                  index={index}
                  imageUrls={imageUrls[news.story.imageId]}
                  onError={(e) => {
                    e.target.src = "/ImageNotFound.png";
                  }}
                  redirectLink={generateRedirectLink(news.story.id, news.story.hline)}
                  newsStoryHLine={news.story.hline ? truncateText(news.story.hline, 10) : "No Title Found"}
                  newsStoryIntro={news.story.intro ? truncateText(news.story.intro, 60) : "No Description Found"}
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
                <div className="absolute z-10 right-4 top-[-30px]">
                  <LikeButton
                    customHeight="30px"
                    customWidth="30px"
                    customId={`likeButton-cricket-news-${news.story.id}`}
                    isActive={!!likedItems[news?.story.id]}
                    onClick={() => handleLikeClick(news, "cricketNews")}
                  />
                </div>
              </div>
            ))}
          </>
        ) : isLoadingNews ? (
          <div className="w-full flex justify-center hscreen align-items-center">
            <div className="loader"></div>
          </div>
        ) : (
          <div>No Cricket News Found</div>
        )}
      </div>
    </div>
  );
};

export default Cricket;
