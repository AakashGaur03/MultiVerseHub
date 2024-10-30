import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import ModalComponent from "./ModalComponent";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../index";

const LoginModal = ({ show, handleClose, handleForgot }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.login.loading);
  const message = useSelector((state) => state.login.message);
  // const currentState = useSelector((state) => state.login.currentState);
  const currentState = useSelector((state) => state.getCurrentStatus.isUserLoggedIn);

  const [errMessage, setErrMessage] = useState("");
  const [userNameOrPass, setUserNameOrPass] = useState(false);

  const [loginData, setLoginData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    // console.log(e.target)
    // const { id, value } = e.target;
    const { dataset, value } = e.target;
    const id = dataset.id;
    setLoginData({
      ...loginData,
      [id]: value,
    });
  };

  useEffect(() => {
    if (loginData.email || loginData.username) {
      setUserNameOrPass(true);
    } else {
      setUserNameOrPass(false);
    }
  }, [loginData.email, loginData.username]);

  useEffect(() => {
    setTimeout(() => {
      setErrMessage(message);
    }, 0);
  }, [message]);
  const handleModalClose = () => {
    setLoginData({
      username: "",
      email: "",
      password: "",
    });
    setErrMessage("");
    handleClose();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let resData;
      if (userNameOrPass) {
        resData = await dispatch(loginUser(loginData));
        // console.log(resData);
        setErrMessage(message);
      } else {
        setErrMessage("Username or Email is required");
      }
      if (resData) {
        // handleClose();
      }
    } catch (error) {
      console.log("Error Logging In User", error);
    }
  };

  return (
    <ModalComponent show={show} handleClose={handleModalClose} title="Log In to Your">
      {errMessage && !currentState && <div className="text-red-600 text-center">{errMessage}</div>}
      {errMessage && currentState && <div className="text-green-600 text-center">{errMessage}</div>}
      {!currentState && (
        <Form onSubmit={handleSubmit}>
          <div className="mb-3">
            <Form.Label htmlFor="loginEmail">email</Form.Label>
            <Form.Control
              type="email"
              onChange={handleChange}
              value={loginData.email}
              id="loginEmail"
              data-id="email"
            />
            <div className="form-text text-white">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <Form.Label htmlFor="loginUsername">username</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChange}
              value={loginData.username}
              data-id="username"
              id="loginUsername"
            />
          </div>
          <div className="mb-3">
            <Form.Label htmlFor="loginPassword">Password</Form.Label>
            <Form.Control
              type="password"
              onChange={handleChange}
              value={loginData.password}
              data-id="password"
              id="loginPassword"
              required
              minLength={6}
            />
          </div>
          <div className="mb-3 d-flex">
            <Button variant="link" onClick={handleForgot}>
              Forget Password
            </Button>
            {/* <Button className='btn bg-slate-600 hover:bg-slate-900'>Forgot Password</Button> */}
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-outline-primary" disabled={loading}>
              Submit
            </button>
          </div>
        </Form>
      )}
    </ModalComponent>
  );
};

export default LoginModal;
