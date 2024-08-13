import React from "react";
import { Card, Col, Row } from "react-bootstrap";

const CustomCard = (props) => {
  return (
    <div>
      {/* {props.index} */}
      <Card
        style={{}}
        key={props.index}
        className="my-8 ms-3 rounded-2xl border-0"
      >
        <Card.Body className="minHeightCard">
          <Row>
            <Col md={4} className="d-flex align-items-center">
              <Card.Img
                variant="top"
                alt="ImageNotFound.png"
                className="cardImages"
                src={props.imageUrls}
                onError={props.onError}
              />
            </Col>
            <Col md={8} className="d-flex justify-center flex-col">
              <div>
                <a href={props.redirectLink} target="_blank">
                  <Card.Title className="limit2Lines hover:text-amber-500">
                    {props.newsStoryHLine}
                  </Card.Title>
                </a>
                <Card.Text className="limit5Lines">
                  {props.newsStoryIntro}
                </Card.Text>
              </div>
              <div>
                <div className="d-flex justify-between mt-6 ml-8">
                  {props.newsStorySource}
                  <strong className="me-8">
                    Updated on : {props.updatedOn}
                  </strong>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CustomCard;

// key={index}
// src={imageUrls[news.story.imageId]}
// onError={(e) => {
//     e.target.src = "/ImageNotFound.png";
//   }}
// href={generateRedirectLink(news.story.id, news.story.hline)}

{
  /* <Card.Title className="limit2Lines hover:text-amber-500">
{news.story.hline
  ? truncateText(news.story.hline, 10)
  : "No Title Found"}
</Card.Title> */
}

{
  /* <Card.Text className="limit5Lines">
                  {news.story.intro
                    ? truncateText(news.story.intro, 60)
                    : "No Description Found"}
                </Card.Text> */
}

// {news.story.source == "Cricbuzz" && (
//     <a href="https://www.cricbuzz.com/" target="_blank">
//       <img
//         className="rounded-full"
//         variant="top"
//         alt="LogoNotAvail.png"
//         height={30}
//         width={30}
//         src="/cricbuzzLogo.png"
//       />
//     </a>
//   )}
{
  /* <strong className="me-8">
Updated on : {formatDate(news.story.pubTime)}
</strong> */
}
