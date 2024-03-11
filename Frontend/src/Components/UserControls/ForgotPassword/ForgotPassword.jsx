import React from "react";
import { Button, Form } from "react-bootstrap";

const ForgotPassword = () => {
    const handleSendMail =(e)=>{
        e.preventDefault()
        console.log("object")
    }
  return (
    <>
      <Form onSubmit={handleSendMail}>
        <Form.Label>Enter Email to recieve OTP</Form.Label>
        <Form.Control type="email" required></Form.Control>
        <Button type="submit" className="bg-orange-500">Submit</Button>
      </Form>
    </>
  );
};

export default ForgotPassword;
