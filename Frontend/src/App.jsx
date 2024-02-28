import { useState, useEffect } from "react";
import axios from "axios";


function App() {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    // axios
    //   .get("api/v1/users/joke")
    //   .then((res) => {
    //     setJokes(res.data);
    //   })
    //   .catch((err) => {
    //     console.log("Error : ", err);
    //   });
  }, []);

  return (
    <>
      <div>Hello</div>
      <div>Jokes : {jokes.length}</div>
      {jokes.map((joke) => (
        <div key={joke.id}>
          <h3>{joke.title}</h3>
          <h5>{joke.content}</h5>
        </div>
      ))}
    </>
  );
}

export default App;
