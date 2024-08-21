import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getcricketPlayerInfo } from "../../Features";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Table } from "react-bootstrap";
import DOMPurify from "dompurify";
import { getImageUrl } from "../../GlobalComp/getImageFunc";

const PlayerInfo = () => {
  const { playerId } = useParams();
  const dispatch = useDispatch();
  const currentPlayerInfo = useSelector((state) => state.cricket.playerInfo);
  const [playerData, setPlayerData] = useState({});
  const [imageUrls, setImageUrls] = useState({});
  const [loadingImages, setLoadingImages] = useState({});
  const sanitizedContent = DOMPurify.sanitize(playerData?.info?.bio || "");
  useEffect(() => {
    if (playerData?.info?.faceImageId) {
      getImageUrl(
        playerData?.info?.faceImageId,
        imageUrls,
        setImageUrls,
        setLoadingImages,
        dispatch
      );
    }
  }, [playerData, imageUrls]);
  useEffect(() => {
    let payload = {
      playerId,
      prevData: currentPlayerInfo,
    };
    dispatch(getcricketPlayerInfo(payload));
  }, [playerId]);
  useEffect(() => {
    setPlayerData(currentPlayerInfo?.[playerId]);
    console.log(currentPlayerInfo, "currentPlayerInfo");
    console.log(playerData, "playerData");
  }, [currentPlayerInfo]);
  console.log(playerId);

  return (
    <>
      {/* <Table borderless hover variant="dark">
        <thead>
          <tr>
            {playerData?.batting?.headers?.map((header, index) => (
              <th key={index} className="p-2 border-b text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {playerData?.batting?.values?.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b">
              {row.values.map((value, colIndex) => (
                <td key={colIndex} className="p-2 border-b text-left">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table> */}
      {/* <table className="min-w-full border-collapse border"> */}
      {/* <Table borderless hover variant="dark"responsive >
      <thead>
        <tr>
          <th className="p-2 border-b text-left">Format</th>
          {currentPlayerInfo?.batting?.values?.map((row, index) => (
            <th key={index} className="p-2 border-b text-left">
              {row.values[0]}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {currentPlayerInfo?.batting?.headers?.slice(1).map((header, headerIndex) => (
          <tr key={headerIndex} className="border-b">
            <td className="p-2 border-b text-left">{header}</td>
            {currentPlayerInfo?.batting?.values?.map((row, colIndex) => (
              <td key={colIndex} className="p-2 border-b text-left">
                {row.values[headerIndex + 1]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table> */}

      <Row className="my-4">
        <Col lg={3}>
          {/* <div className="sticky top-20"> */}
          <div className="">
            <div className="flex justify-center">
              {loadingImages[playerData?.info?.faceImageId] ? (
                <div>Lading...</div>
              ) : (
                <img
                  src={
                    imageUrls[playerData?.info?.faceImageId] ||
                    "/ImageNotFound.png"
                  }
                  alt={playerData?.info?.name || "Player Image"}
                />
              )}
            </div>
            <div>
              <div className="text-center uppercase font-semibold text-xl text-gray-300 mt-3">
                {playerData?.info?.name}
              </div>
              <div className="text-center uppercase font-semibold  text-gray-300">
                {playerData?.info?.intlTeam && playerData?.info?.intlTeam}
              </div>
            </div>
            {/* <div>
              <div className="mt-4 text-center uppercase font-semibold  text-gray-300">
                Personal Information
              </div>
              <div className="">
                {playerData?.info?.DoB && (
                  <div className="flex justify-between flex-wrap">
                    <div>Born :</div>
                    <div>{playerData?.info?.DoB}</div>
                  </div>
                )}
              </div>
              <div className="">
                {playerData?.info?.birthPlace && (
                  <div className="flex justify-between flex-wrap">
                    <div>Birth Place :</div>
                    <div>{playerData?.info?.birthPlace}</div>
                  </div>
                )}
              </div>
              <div className="">
                {playerData?.info?.height && (
                  <div className="flex justify-between flex-wrap">
                    <div>Height : </div>
                    <div>{playerData?.info?.height}</div>
                  </div>
                )}
              </div>
              <div className="">
                {playerData?.info?.role && (
                  <div className="flex justify-between flex-wrap">
                    <div>Role : </div>
                    <div>{playerData?.info?.role}</div>
                  </div>
                )}
              </div>
              <div className="">
                {playerData?.info?.bat && (
                  <div className="flex justify-between flex-wrap">
                    <div>Batting Style : </div>
                    <div>{playerData?.info?.bat}</div>
                  </div>
                )}
              </div>
              <div className="">
                {playerData?.info?.bowl && (
                  <div className="flex justify-between flex-wrap">
                    <div>Bowling Style : </div>
                    <div>{playerData?.info?.bowl}</div>
                  </div>
                )}
              </div>
            </div> */}
            <div>
              <div className="mt-4 text-center uppercase font-semibold  text-gray-300">
                Personal Information
              </div>
              <Table borderless hover variant="dark" responsive>
                <tbody>
                  {playerData?.info?.DoB && (
                    <tr>
                      <td>Born</td>
                      <td>{playerData?.info?.DoB}</td>
                    </tr>
                  )}
                  {playerData?.info?.birthPlace && (
                    <tr>
                      <td>Birth Place</td>
                      <td>{playerData?.info?.birthPlace}</td>
                    </tr>
                  )}
                  {playerData?.info?.height && (
                    <tr>
                      <td>Height</td>
                      <td>{playerData?.info?.height}</td>
                    </tr>
                  )}
                  {playerData?.info?.role && (
                    <tr>
                      <td>Role</td>
                      <td>{playerData?.info?.role}</td>
                    </tr>
                  )}
                  {playerData?.info?.bat && (
                    <tr>
                      <td>Batting Style</td>
                      <td>{playerData?.info?.bat}</td>
                    </tr>
                  )}
                  {playerData?.info?.bowl && (
                    <tr>
                      <td>Bowling Style</td>
                      <td>{playerData?.info?.bowl}</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
            <div>
              <div className="mt-4 text-center uppercase font-semibold  text-gray-300">
                ICC Rankings
              </div>
              <div>
                <Table borderless hover variant="dark" responsive>
                  <thead>
                    <tr>
                      <th className="text-center"></th>
                      <th className="text-center">Test</th>
                      <th className="text-center">ODI</th>
                      <th className="text-center">T20</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center">All Rounder</td>
                      <td className="text-center">
                        {playerData?.info?.rankings?.all?.testRank ?? "-"}
                      </td>
                      <td className="text-center">
                        {playerData?.info?.rankings?.all?.odiRank ?? "-"}
                      </td>
                      <td className="text-center">
                        {playerData?.info?.rankings?.all?.t20Rank ?? "-"}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">Batting</td>
                      <td className="text-center">
                        {playerData?.info?.rankings?.bat?.testRank ?? "-"}
                      </td>
                      <td className="text-center">
                        {playerData?.info?.rankings?.bat?.odiRank ?? "-"}
                      </td>
                      <td className="text-center">
                        {playerData?.info?.rankings?.bat?.t20Rank ?? "-"}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">Bowling</td>
                      <td className="text-center">
                        {playerData?.info?.rankings?.bowl?.testRank ?? "-"}
                      </td>
                      <td className="text-center">
                        {playerData?.info?.rankings?.bowl?.odiRank ?? "-"}
                      </td>
                      <td className="text-center">
                        {playerData?.info?.rankings?.bowl?.t20Rank ?? "-"}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
            <div>
              <div className="mt-4 text-center uppercase font-semibold  text-gray-300">
                Team Information
              </div>
              <div className="mt-3 text-center">{playerData?.info?.teams}</div>
            </div>
          </div>
        </Col>
        <Col lg={9}>
          <div className="text-center uppercase font-semibold text-2xl text-gray-300 ">
            Batting Career Summary
          </div>
          <Table borderless hover variant="dark" responsive>
            <thead>
              <tr>
                <th className="sticky-col p-2 border-b text-center z-0">
                  Format
                </th>
                {playerData?.batting?.values?.map((row, index) => (
                  <th key={index} className="p-2 border-b text-center">
                    {row.values[0] === "Not Out" ? "NO" : row.values[0]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {playerData?.batting?.headers
                ?.slice(1)
                .map((header, headerIndex) => (
                  <tr key={headerIndex} className="border-b">
                    <td className="sticky-col p-2 border-b text-center z-0">
                      {header}
                    </td>
                    {playerData?.batting?.values?.map((row, colIndex) => (
                      <td key={colIndex} className="p-2 border-b text-center">
                        {row.values[headerIndex + 1]}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </Table>
          <div className="mt-3 text-center uppercase font-semibold text-2xl text-gray-300 ">
            Bowling Career Summary
          </div>
          <Table borderless hover variant="dark" responsive>
            <thead>
              <tr>
                <th className="sticky-col p-2 border-b text-center z-0">
                  Format
                </th>
                {playerData?.bowling?.values?.map((row, index) => (
                  <th key={index} className="p-2 border-b text-center">
                    {row.values[0] === "Not Out" ? "NO" : row.values[0]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {playerData?.bowling?.headers
                ?.slice(1)
                .map((header, headerIndex) => (
                  <tr key={headerIndex} className="border-b">
                    <td className="sticky-col p-2 border-b text-center z-0">
                      {header}
                    </td>
                    {playerData?.bowling?.values?.map((row, colIndex) => (
                      <td key={colIndex} className="p-2 border-b text-center">
                        {row.values[headerIndex + 1]}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </Table>
          <div className="mt-3 text-center uppercase font-semibold text-2xl text-gray-300 ">
            Career Information
          </div>
          <div className="lh-lg">
            {playerData?.career?.values.map((value, index) => (
              <div key={index}>
                {value.debut && (
                  <div>
                    <strong>{value.name.toUpperCase()} Debut :</strong>
                    {value.debut}
                  </div>
                )}
                {value.lastPlayed && (
                  <div>
                    <strong>Last {value.name.toUpperCase()} :</strong>
                    {value.lastPlayed}
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* <div>{playerData?.info?.bio}</div> */}
          <div className="mt-3 text-center uppercase font-semibold text-2xl text-gray-300 ">
            Player Bio
          </div>
          {/* <div
            className="mt-3 text-gray-300"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          ></div> */}
        </Col>
      </Row>
<iframe srcDoc={playerData?.info?.bio} className="text-white w-100">

          
</iframe>

    </>
  );
};

export default PlayerInfo;
