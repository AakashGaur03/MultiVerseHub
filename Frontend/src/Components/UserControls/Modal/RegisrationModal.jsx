import React, { useState } from "react";
import ModalComponent from "./ModalComponent";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../Features";


const RegisrationModal = ({ show, handleClose,handleShow }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.register.loading);
  const message = useSelector((state) => state.register.message);

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
      console.log(res)
      if(res.statusCode==200){
        handleShow("login")
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
        handleClose={handleClose}
        title="Register In to Your"
      >
        {message && <div>{message}</div>}
        <Form onSubmit={handleSubmit}>
          <Form.Label htmlFor="registerUsername">username</Form.Label>
          <Form.Control
            type="text"
            onChange={handleChange}
            value={formData.username}
            data-id="username"
            id="registerUsername"
          />

          <Form.Label htmlFor="registerFullName">Full name</Form.Label>
          <Form.Control
            type="text"
            onChange={handleChange}
            value={formData.fullName}
            data-id="fullName"
            id="registerFullName"
          />

          <Form.Label htmlFor="registerPassword">Password</Form.Label>
          <Form.Control
            type="password"
            onChange={handleChange}
            value={formData.password}
            data-id="password"
            id="registerPassword"
          />

          <Form.Label htmlFor="registerEmail">email</Form.Label>
          <Form.Control
            type="email"
            onChange={handleChange}
            value={formData.email}
            data-id="email"
            id="registerEmail"
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
      </ModalComponent>
    </>
  );
};

export default RegisrationModal;