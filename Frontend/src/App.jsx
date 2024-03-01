import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import Regisration from './Userontrols/Registration/Regisration';
// import axios from "axios";


function App() {
  // const [jokes, setJokes] = useState([]);

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
      <div className="">Hello</div>
      <Regisration />
      {/* <div>Hello</div>
      <div>Jokes : {jokes.length}</div>
      */}
    </>
  );
}

export default App;
