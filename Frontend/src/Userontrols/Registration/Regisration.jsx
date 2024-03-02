import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";



const Regisration = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    password: "",
    email: "",
    avatar: null,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];

    setFormData({
      ...formData,
      avatar: file,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // axios({
    //   method: 'post',
    //   url: '/api/v1/users/register',
    //   data: formData
    // });

    axios.post('http://localhost:8000/api/v1/users/register', formData)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Label htmlFor="userName">username</Form.Label>
        <Form.Control
          type="text"
          onChange={handleChange}
          value={formData.username}
          id="username"
        />

        <Form.Label htmlFor="fullName">Full name</Form.Label>
        <Form.Control
          type="text"
          onChange={handleChange}
          value={formData.fullName}
          id="fullName"
        />

        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control
          type="password"
          onChange={handleChange}
          value={formData.password}
          id="password"
          aria-describedby="passwordHelp"
        />

        <Form.Label htmlFor="email">email</Form.Label>
        <Form.Control
          type="email"
          onChange={handleChange}
          value={formData.email}
          id="email"
          aria-describedby="emailHelpBlock"
        />
        <Form.Label htmlFor="inputavatar5">avatar</Form.Label>
        <Form.Control
          type="file"
          id="inputavatar5"
          aria-describedby="avatarHelpBlock"
          onChange={handleFile}
        />

        <button type="submit">Submit</button>
      </Form>
    </>
  );
};

export default Regisration;