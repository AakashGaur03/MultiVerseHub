import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const getCurrentState = useSelector((state) => state.getCurrentStatus.state);
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    if (getCurrentState==null) {
      setTimer(0);
    }else{
      setTimer(20)
    }
  }, [getCurrentState]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timer === 0) {
        clearInterval(intervalId);
      } else {
        setTimer((prevTimer) => prevTimer - 1);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timer]);
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
