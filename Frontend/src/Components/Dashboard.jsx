import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const getCurrentState = useSelector((state) => state.getCurrentStatus.state);
  // const [timer, setTimer] = useState(
  //   localStorage.getItem("timerVal") || localStorage.setItem("timerVal", 50)
  // );
  const [timer, setTimer] = useState(() => {
    const savedTimer = localStorage.getItem("timerVal");
    return savedTimer !== null ? parseInt(savedTimer, 10) : 50;
  });

  useEffect(() => {
    if (getCurrentState == null) {
      setTimer(0);
      setTimer(localStorage.setItem("timerVal", 0));
    } else {
      // setTimer(
      //   localStorage.getItem("timerVal") || localStorage.setItem("timerVal", 50)
      // );
      const savedTimer = localStorage.getItem("timerVal");
      let updateTimer =
        savedTimer !== null && savedTimer != 0 ? parseInt(savedTimer, 10) : 50;
      setTimer(updateTimer);
      localStorage.setItem("timerVal", updateTimer);
    }
  }, [getCurrentState]);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     if (timer === 0) {
  //       localStorage.setItem("timerVal", 0);
  //       clearInterval(intervalId);
  //     } else {
  //       localStorage.setItem("timerVal", timer);
  //       setTimer((prevTimer) => prevTimer - 1);
  //     }
  //   }, 1000);
  //   return () => clearInterval(intervalId);
  // }, [timer]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1 || !prevTimer) {
          // localStorage.setItem("timerVal", 0);
          clearInterval(intervalId);
          return 0; // giving to setTimer
        }
        const newTimer = prevTimer - 1;
        if (newTimer) {
          localStorage.setItem("timerVal", newTimer);
        } else {
          localStorage.setItem("timerVal", 50);
        }
        return newTimer; // giving to setTimer
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      <div>
        Due to Inactivity of server sometimes inital load time can be Upto 50
        Sec
      </div>
      {timer > 0 && (
        <div>Please Wait maximum for : {timer} to get Response</div>
      )}
      {!timer > 0 && (
        <div>Thanks for your patience you can now Enjoy our services</div>
      )}
    </>
  );
};

export default Dashboard;
