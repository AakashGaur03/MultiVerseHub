import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OtpForm from "./OtpForm";
import { Button, Form } from "react-bootstrap";
import { sendOTPMail, verifyOTP } from "../../../Features";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [otpToken, setOTPToken] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(true);
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [showPasswordRest, setShowPasswordRest] = useState(false);

  const status = useSelector((state) => state.forgotPassword.status);
  const error = useSelector((state) => state.forgotPassword.error);
  const userId = useSelector((state) => state.forgotPassword.userId);

  const handleEmailSubmit = async(e)=>{
    console.log(email)
    e.preventDefault()
    const response =  await dispatch(sendOTPMail({email}))
    // console.log(response.data,"sss")
    // console.log(response.data.otpToken,"BB")
    // console.log(response.data.otpToken,"BB2")
    // console.log(response.data.data,"BB3")
    // console.log(response.data.data.otpToken,"BB4")
    // setOTPToken(response.data.data,"AA")
    console.log(otpToken,"otpToken")
    if (response){
      console.log(response,"sdds")
      console.log("sdsds")
      setOTPToken(response.data.data.otpToken,"AA")
      setShowEmailInput(false)
      setShowOTPForm(true)
    }
  }

  const handleMailChange = (e)=>{
    setEmail(e.target.value);
  }
  const handleOTPSubmit = async(otp)=>{
    const response =  await dispatch(verifyOTP({otp,otpToken}))
    if (response){
      console.log("sdsds")
      setShowOTPForm(false)
      setShowPasswordRest(true)
    }
  }

  return (
    <>
      {showEmailInput && 
      <div>
        <Form onSubmit={handleEmailSubmit}>
          <Form.Label>Enter Email </Form.Label>
          <Form.Control type="text" value={email} onChange={handleMailChange} required></Form.Control>
          <Button type="submit" className="bg-orange-300">Submit</Button>
        </Form>
      </div>
      }
      {showOTPForm && <OtpForm onOTPSubmit={handleOTPSubmit}/>}
      {showPasswordRest && <div>Hiiii</div>}
    </>
  );
};

export default ForgotPassword;
