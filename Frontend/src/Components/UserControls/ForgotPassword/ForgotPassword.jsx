import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OtpForm from "./OtpForm";
import { Button, Form } from "react-bootstrap";
import { createNewPassword, sendOTPMail, verifyOTP } from "../../../Features";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [otpToken, setOTPToken] = useState("");
  const [userId, setUserId] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(true);
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [showPasswordRest, setShowPasswordRest] = useState(false);

  const status = useSelector((state) => state.forgotPassword.status);
  const error = useSelector((state) => state.forgotPassword.error);

  const handleEmailSubmit = async (e) => {
    // console.log(email);
    e.preventDefault();
    const response = await dispatch(sendOTPMail({ email }));
    // console.log(otpToken, "otpToken");
    if (response) {
      setOTPToken(response.data.data.otpToken, "AA");
      setUserId(response.data.data.userId, "AA");
      setShowEmailInput(false);
      setShowOTPForm(true);
    }
  };

  const handleMailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfPassChange = (e) => {
    setConfPassword(e.target.value);
  };
  const handleOTPSubmit = async (otp) => {
    const response = await dispatch(verifyOTP({ otp, otpToken }));
    if (response) {
      // console.log("sdsds");
      setShowOTPForm(false);
      setShowPasswordRest(true);
    }
  };
  const handleSetPassword = async (e) => {
    e.preventDefault()
    // console.log(userId,"aaaa")
    const response = await dispatch(createNewPassword({ userId,newPassword:password,confirmPassword:confPassword }));
    if (response) {
      // console.log("sdsds");
      setShowOTPForm(false);
      setShowPasswordRest(true);
    }
  };

  return (
    <>
      {showEmailInput && (
        <div>
          <Form onSubmit={handleEmailSubmit}>
            <Form.Label>Enter Email </Form.Label>
            <Form.Control
              type="text"
              value={email}
              onChange={handleMailChange}
              required
            ></Form.Control>
            <Button type="submit" className="bg-orange-300">
              Submit
            </Button>
          </Form>
        </div>
      )}
      {showOTPForm && <OtpForm onOTPSubmit={handleOTPSubmit} />}
      {showPasswordRest && (
        <div>
          <Form onSubmit={handleSetPassword}>
            <Form.Label>Enter Password </Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={handlePassChange}
              required
            ></Form.Control>
            <Form.Label>Confirm Password </Form.Label>
            <Form.Control
              type="password"
              value={confPassword}
              onChange={handleConfPassChange}
              required
            ></Form.Control>
            <Button className="bg-red-400" type="submit">Set Password</Button>
          </Form>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
