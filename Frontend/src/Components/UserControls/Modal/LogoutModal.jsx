import React from "react";
import ModalComponent from "./ModalComponent";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../Features";

const LogoutModal = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.logout.logoutMessage);
  const accessToken = useSelector((state) => state.login.accessToken);

  const handleLogout = async () => {
    let res = await dispatch(logoutUser(accessToken));
    console.log(res);
    if (res.message === "User Logged Out") {
      handleClose();
    }
  };
  return (
    <>
      <ModalComponent show={show} handleClose={handleClose} title="Logout ">
        {message && <div>{message}</div>}
        <div className="text-center">
          <button
            className="bg-green-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </ModalComponent>
    </>
  );
};

export default LogoutModal;
