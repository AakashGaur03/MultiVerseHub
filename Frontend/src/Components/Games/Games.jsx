import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  // getGamesSectionData,
  getGamesSectionDataCategoryWise,
  getGamesParticularsData,
} from "../../Features";
import { formatDateinHumanredable } from "../../GlobalComp/formatDate";
import { useNavigate } from "react-router-dom";

const Games = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [allgames, setAllGames] = useState([]);

  useEffect(() => {
    callAPI();
  }, []);
  const callAPI = async () => {
    const payload = {
      category: "mmorpg",
    };
    const response = await dispatch(getGamesSectionDataCategoryWise(payload));
    console.log(response);
    setAllGames(response);
  };
  const particularGameCall = async (id) => {
    navigate(`/game/${id}`)
  };
  return (
    <>
      {/* <div className="min-h-screen">
        {allgames.length > 0 &&
          allgames.map((game) => (
            <Card key={game.id} className="my-8 ms-3 rounded-2xl border-0">
              <Card.Body className="minHeightCard">
                <Row>
                  <Col md={4} className="d-flex align-items-center">
                    <Card.Img
                      variant="top"
                      alt="ImageNotFound.png"
                      className="cardImages"
                      src={game.thumbnail}
                    />
                  </Col>
                  <Col md={8} className="d-flex justify-center flex-col">
                    <div>
                      <a
                        href={game.game_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Card.Title className="limit2Lines hover:text-amber-500">
                          {game.title}
                        </Card.Title>
                      </a>
                      <Card.Text className="limit5Lines">
                        {game.short_description}
                      </Card.Text>
                    </div>
                    <div>
                      <div className="d-flex justify-between mt-6 ml-8">
                        <strong className="me-8">
                          Released on:{" "}
                          {formatDateinHumanredable(game.release_date)}
                        </strong>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
      </div> */}
      <div className=" my-2 ">
        <div className="flex flex-wrap justify-center pb-4 pt-10">
          {allgames?.length > 0 ? (
            allgames.map((data, index) => (
              <div
                className="activeClass m-4 cursor-pointer relative"
                key={data.id}
                onClick={() => particularGameCall(data.id)}
              >
                <Card
                  style={{ width: "18rem" }}
                  className="overflow-x-auto rounded-3xl "
                >
                  <Card.Img
                    variant="top"
                    className="h-100"
                    src={`${data.thumbnail}`}
                  />
                </Card>
                <div className="text-center mt-2 text-ellipsis w-60 whitespace-nowrap overflow-hidden font-semibold text-gray-300">
                  {data.title}
                </div>
                {data.release_date && (
                  <div className="text-center mt-2 text-ellipsis w-60 whitespace-nowrap overflow-hidden font-semibold text-gray-300">
                    Release Date : {formatDateinHumanredable(data.release_date)}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div>No Data to Show</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Games;
