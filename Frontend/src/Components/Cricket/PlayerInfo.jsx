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
      <Row className="my-3">
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
                  className="max-w-64"
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
                      <th className="text-center">Test(Best)</th>
                      <th className="text-center">ODI(Best)</th>
                      <th className="text-center">T20(Best)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center">All Rounder</td>
                      <td className="text-center">
                        {playerData?.info?.rankings?.all?.testRank ?? "-"}(
                        {playerData?.info?.rankings?.all?.testBestRank ?? "-"})
                      </td>
                      <td className="text-center">
                        {playerData?.info?.rankings?.all?.odiRank ?? "-"}(
                        {playerData?.info?.rankings?.all?.odiBestRank ?? "-"})
                      </td>
                      <td className="text-center">
                        {playerData?.info?.rankings?.all?.t20Rank ?? "-"}(
                        {playerData?.info?.rankings?.all?.t20BestRank ?? "-"})
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">Batting</td>
                      <td className="text-center">
                        {playerData?.info?.rankings?.bat?.testRank ?? "-"}(
                        {playerData?.info?.rankings?.bat?.testBestRank ?? "-"})
                      </td>
                      <td className="text-center">
                        {playerData?.info?.rankings?.bat?.odiRank ?? "-"}(
                        {playerData?.info?.rankings?.bat?.odiBestRank ?? "-"})
                      </td>
                      <td className="text-center">
                        {playerData?.info?.rankings?.bat?.t20Rank ?? "-"}(
                        {playerData?.info?.rankings?.bat?.t20BestRank ?? "-"})
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">Bowling</td>
                      <td className="text-center">
                        {playerData?.info?.rankings?.bowl?.testRank ?? "-"}(
                        {playerData?.info?.rankings?.bowl?.testBestRank ?? "-"})
                      </td>
                      <td className="text-center">
                        {playerData?.info?.rankings?.bowl?.odiRank ?? "-"}(
                        {playerData?.info?.rankings?.bowl?.odiBestRank ?? "-"})
                      </td>
                      <td className="text-center">
                        {playerData?.info?.rankings?.bowl?.t20Rank ?? "-"}(
                        {playerData?.info?.rankings?.bowl?.t20BestRank ?? "-"})
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
          <div className="mb-3 text-center uppercase font-semibold text-2xl text-gray-300 ">
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
          <div className="my-3 text-center uppercase font-semibold text-2xl text-gray-300 ">
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
          <div className="my-3 text-center uppercase font-semibold text-2xl text-gray-300 ">
            Career Information
          </div>
          <Table borderless hover variant="dark" responsive>
            <tbody>
              {playerData?.career?.values.map((value, index) => (
                <React.Fragment key={index}>
                  {value.debut && (
                    <tr>
                      <td>
                        <strong>{value.name.toUpperCase()} Debut</strong>
                      </td>
                      <td>{value.debut}</td>
                    </tr>
                  )}
                  {value.lastPlayed && (
                    <tr>
                      <td>
                        <strong>Last {value.name.toUpperCase()}</strong>
                      </td>
                      <td>{value.lastPlayed}</td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </Table>
          {/* <div>{playerData?.info?.bio}</div> */}
        </Col>
      </Row>
      <div className="my-3 text-center uppercase font-semibold text-2xl text-gray-300 ">
        Player Bio
      </div>
      <div
        className="mt-3"
        style={{ color: "wheat" }}
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      ></div>
      {/* <iframe srcDoc={playerData?.info?.bio} className="text-white w-100">

          
</iframe> */}
    </>
  );
};

export default PlayerInfo;
