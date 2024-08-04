import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getGamesSectionData ,getGamesSectionDataCategoryWise} from "../../Features";
import { formatDateinHumanredable } from "../../GlobalComp/formatDate";

const Games = () => {
  const dispatch = useDispatch();
  const [allgames, setAllGames] = useState([]);

  useEffect(() => {
    callAPI();
  }, []);
  const callAPI = async () => {
    // const response = await dispatch(getGamesSectionData());
    const payload = {
      category: "mmorpg",
    }
    const response = await dispatch(getGamesSectionDataCategoryWise(payload));
    console.log(response);
    setAllGames(response);
  };
  return (
    <div className="min-h-screen">
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
    </div>
  );
};

export default Games;
