import { asyncHandler } from "../utils/asyncHandler.js";

const allJokes = asyncHandler(async (req, res) => {
  const jokes = [
    {
      id: 1,
      title: "JOKE1",
      content: "This is JOKE1",
    },
    {
      id: 2,
      title: "JOKE2",
      content: "This is JOKE2",
    },
    {
      id: 3,
      title: "JOKE3",
      content: "This is JOKE3",
    },
    {
      id: 4,
      title: "JOKE4",
      content: "This is JOKE4",
    },
    {
      id: 5,
      title: "JOKE5",
      content: "This is JOKE5",
    },
  ];

  res.send(jokes);
});

console.log(allJokes,"22")

export { allJokes };
