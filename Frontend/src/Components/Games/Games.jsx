import React, { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getGamesSectionData } from "../../Features";

const Games = () => {
  const dispatch = useDispatch();
  const arr = [
    {
      id: 521,
      title: "Diablo Immortal",
      thumbnail: "https://www.freetogame.com/g/521/thumbnail.jpg",
      short_description:
        "Built for mobile and also released on PC, Diablo Immortal fills in the gaps between Diablo II and III in an MMOARPG environment.",
      game_url: "https://www.freetogame.com/open/diablo-immortal",
      genre: "MMOARPG",
      platform: "PC (Windows)",
      publisher: "Blizzard Entertainment",
      developer: "Blizzard Entertainment",
      release_date: "2022-06-02",
      freetogame_profile_url: "https://www.freetogame.com/diablo-immortal",
    },
  ];

  useEffect(() => {
    // callAPI();
  }, []);
  const callAPI = async () => {
    const response = await dispatch(getGamesSectionData());
    console.log(response);
  };
  return (
    <div className="min-h-screen">
      <button onClick={()=>callAPI()}>Click</button>
      {arr.map((game) => (
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
                      Updated on: {game.release_date}
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
