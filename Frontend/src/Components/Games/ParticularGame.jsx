import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getGamesParticularsData } from "../../Features";

const ParticularGame = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [gameData, setGameData] = useState([]);
  const particularGameData = useSelector(
    (state) => state.games.gamesDataParticular
  );
  useEffect(() => {
    dispatch(getGamesParticularsData(id));
  }, []);
  useEffect(() => {
    setGameData(particularGameData);
  }, [particularGameData]);

  return (
  <>
   {gameData && gameData.id}
  </>
  )
};

export default ParticularGame;
