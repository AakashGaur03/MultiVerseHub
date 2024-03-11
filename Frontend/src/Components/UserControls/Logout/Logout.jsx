import React from "react";
import { logoutUser } from "../../../index";
import { useSelector, useDispatch } from "react-redux";
const Logout = () => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.logout.logoutMessage);
  const accessToken = useSelector((state) => state.login.accessToken);

  const handleLogout = async () => {
    await dispatch(logoutUser(accessToken));
  };

  return (
    <div>
      {message && <div>{message}</div>}

      <button
        className="bg-green-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-10"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
