// Fetching All images at once but making 30 api call at once

// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useLocation } from "react-router-dom";
// import { getCricketImages } from "../../Features";

// const Ranking = () => {
//   const location = useLocation();
//   const Data = location.state?.rankingsData;
//   const dispatch = useDispatch();
//   const [rankingData, setRankingData] = useState([]);
//   const [imageUrls, setImageUrls] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (Data) {
//       setRankingData(Data);
//       fetchImageUrls(Data.rank);
//     }
//   }, [Data]);

//   const fetchImageUrls = async (ranks) => {
//     setLoading(true);
//     const maxRequestsPerSecond = 1; // Adjust according to your API rate limit
//     const delay = 1000 / maxRequestsPerSecond;

//     try {
//       const urls = [];
//       for (let i = 0; i < ranks.length; i++) {
//         const response = await dispatch(getCricketImages(ranks[i].faceImageId));
//         urls.push(response.imageUrl || ''); // Push imageUrl or an empty string if undefined
//         if (i < ranks.length - 1) {
//           await new Promise(resolve => setTimeout(resolve, delay)); // Delay between API calls
//         }
//       }
//       setImageUrls(urls);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching image URLs:", error);
//       setLoading(false);
//       // Handle the error appropriately
//     }
//   };

//   return (
//     <div>
//       {loading ? (
//         <div>Loading...</div>
//       ) : rankingData.rank?.length > 0 ? (
//         rankingData.rank.map((data, index) => (
//           <div key={index}>
//             <div>{data.rank}</div>
//             <img src={imageUrls[index]} alt={`Player ${data.rank}`} />
//           </div>
//         ))
//       ) : (
//         <div>No Data Available</div>
//       )}
//     </div>
//   );
// };

// export default Ranking;

// Fetching Image on Click of Each for avoiding unnecessary API calls
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getCricketImages } from "../../Features";

const Ranking = () => {
  const location = useLocation();
  const Data = location.state?.rankingsData;
  const dispatch = useDispatch();
  const [rankingData, setRankingData] = useState([]);
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    if (Data) {
      setRankingData(Data);
    }
  }, [Data]);

  const getImageUrl = async (faceImageId) => {
    if (Data) {
    if (!imageUrls[faceImageId]) {
        try {
          const response = await dispatch(getCricketImages(faceImageId));
          if (response.imageUrl) {
            setImageUrls(prevState => ({
              ...prevState,
              [faceImageId]: response.imageUrl 
            }));
          }
        } catch (error) {
          console.error("Error fetching image URL:", error);
        }
      }
    }
  };

  return (
    <div>
      {rankingData.rank?.length > 0 ? (
        <div>
          {rankingData.rank.map((data, index) => (
            <div key={index}>
              <div>{data.rank}</div>
              <div onClick={() => getImageUrl(data.faceImageId)}>{data.faceImageId}</div>
              <img src={imageUrls[data.faceImageId]} alt="" />
            </div>
          ))}
        </div>
      ) : (
        <div>No Data Available</div>
      )}
    </div>
  );
};

export default Ranking;
