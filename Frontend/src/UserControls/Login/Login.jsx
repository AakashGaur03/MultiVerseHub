import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../Features';
import { Form } from 'react-bootstrap';

const Login = () => {

  const dispatch = useDispatch()
  const loading = useSelector((state) => state.login.loading);
  const message = useSelector((state) => state.login.message);

  const [loginData,setLoginData] = useState({
    username:"",
    email:"",
    password:""
  })

  const handleChange = (e) => {
    console.log(e.target)
    // const { id, value } = e.target;
    const { dataset, value } = e.target;
    const id = dataset.id
    setLoginData({
      ...loginData,
      [id]: value,
    });
  };

  const handleSubmit= async(e)=>{
    e.preventDefault()
    await dispatch(loginUser(loginData))

    try {
      
    } catch (error) {
      console.log("Error Logging In User",error)
    }
  }

  return (
    <div className="">
    {message && <div>{message}</div>}
      <Form onSubmit={handleSubmit}>

      <Form.Label htmlFor="loginEmail">email</Form.Label>
        <Form.Control
          type="email"
          onChange={handleChange}
          value={loginData.email}
          id="loginEmail"
          data-id="email"
        />
       
        <Form.Label htmlFor="loginUsername">username</Form.Label>
        <Form.Control
          type="text"
          onChange={handleChange}
          value={loginData.username}
          data-id="username"
          id="loginUsername"
        />

        <Form.Label htmlFor="loginPassword">Password</Form.Label>
        <Form.Control
          type="password"
          onChange={handleChange}
          value={loginData.password}
          data-id="password"
          id="loginPassword"
        />

        <button type="submit" className="btn btn-outline-primary" disabled={loading}>Submit</button>
      </Form>
    </div>
  )
}

export default Login
