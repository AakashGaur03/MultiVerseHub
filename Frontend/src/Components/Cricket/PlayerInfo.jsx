import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getcricketPlayerInfo } from "../../Features";
import { useDispatch, useSelector } from "react-redux";

const PlayerInfo = () => {
  const { playerId } = useParams();
  const dispatch = useDispatch();
  const currentPlayerInfo = useSelector((state) => state.cricket.playerInfo);
  const [playerData, setPlayerData] = useState({});
  useEffect(() => {
    let payload = {
      playerId,
    };
    dispatch(getcricketPlayerInfo(payload));
  }, [playerId]);
  useEffect(() => {
    setPlayerData(currentPlayerInfo);
    console.log(playerData);
  }, [currentPlayerInfo]);
  console.log(playerId);
  return (
    <>
      <div>Hello</div>
    </>
  );
};

export default PlayerInfo;
