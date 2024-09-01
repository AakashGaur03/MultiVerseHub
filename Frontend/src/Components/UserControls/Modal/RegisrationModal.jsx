import React, { useEffect, useState } from "react";
import ModalComponent from "./ModalComponent";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../Features";

const RegisrationModal = ({ show, handleClose, handleShow }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.register.loading);
  const message = useSelector((state) => state.register.message);
  const userRegistered = useSelector((state) => state.register.userRegistered);
  const [errMessage, setErrMessage] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setErrMessage(message);
    }, 0);
  }, [message]);
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    password: "",
    email: "",
    avatar: null,
  });

  const handleChange = (e) => {
    const { dataset, value } = e.target;
    const id = dataset.id;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      avatar: file,
    }));
  };
  const handleModalClose = () => {
    setFormData({
      username: "",
      fullName: "",
      password: "",
      email: "",
      avatar: null,
    });
    setErrMessage("");
    handleClose();
  };
  const handleLogin = () => {
    handleShow("login");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData(); // Create a new FormData object

      // Append each field to the FormData object
      formDataToSend.append("username", formData.username);
      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("avatar", formData.avatar);

      const res = await dispatch(registerUser(formDataToSend));
      console.log(res);
      if (res.statusCode == 200) {
        // handleShow("login");
      }
      // await dispatch(registerUser(formData));
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <>
      <ModalComponent
        show={show}
        handleClose={handleModalClose}
        title="Register In to Your"
      >
        {/* {message && <div>{message}</div>} */}
        {errMessage === "User Registered Successfully" ? (
          <div className="text-green-600 text-center">{errMessage}</div>
        ) : (
          <div className="text-red-600 text-center">{errMessage}</div>
        )}

        {!userRegistered && (
          <Form onSubmit={handleSubmit}>
            <Form.Label htmlFor="registerUsername">username</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChange}
              value={formData.username}
              data-id="username"
              id="registerUsername"
              required
            />

            <Form.Label htmlFor="registerFullName">Full name</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChange}
              value={formData.fullName}
              data-id="fullName"
              id="registerFullName"
              required
            />

            <Form.Label htmlFor="registerPassword">Password</Form.Label>
            <Form.Control
              type="password"
              onChange={handleChange}
              value={formData.password}
              data-id="password"
              id="registerPassword"
              required
              minLength={6}
            />

            <Form.Label htmlFor="registerEmail">email</Form.Label>
            <Form.Control
              type="email"
              onChange={handleChange}
              value={formData.email}
              data-id="email"
              id="registerEmail"
              required
            />
            <Form.Label htmlFor="avatar">avatar</Form.Label>
            <input
              type="file"
              data-id="avatar"
              id="avatar"
              onChange={handleFile}
            />

            <button
              type="submit"
              className="btn btn-outline-primary"
              disabled={loading}
            >
              Submit
            </button>
          </Form>
        )}
        {userRegistered && (
          <div className="text-center">
            <button
              className="bg-green-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        )}
      </ModalComponent>
    </>
  );
};

export default RegisrationModal;
