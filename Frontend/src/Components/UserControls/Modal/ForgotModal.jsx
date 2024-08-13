import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import ModalComponent from "./ModalComponent";
import { useDispatch, useSelector } from "react-redux";
import { createNewPassword, sendOTPMail, verifyOTP } from "../../../Features";
import OtpModal from "./OtpModal";
import NewPassModal from "./NewPassModal";

const ForgotModal = ({
  show,
  handleClose,
  handleOtp,
  showModal,
  handleShow,
  handleLogin,
  showEmailInput,
  setShowEmailInput,
  showOTPForm,
  setShowOTPForm,
  showPasswordRest,
  setShowPasswordRest,
}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [otpToken, setOTPToken] = useState("");
  const [userId, setUserId] = useState("");

  const status = useSelector((state) => state.forgotPassword.status);
  const error = useSelector((state) => state.forgotPassword.error);

  const handleEmailSubmit = async (e) => {
    // console.log(email);
    e.preventDefault();
    const response = await dispatch(sendOTPMail({ email }));
    // console.log(otpToken, "otpToken");
    if (response) {
      console.log("object");
      setShowOTPForm(true);
      setShowEmailInput(false);
      setOTPToken(response.data.data.otpToken, "AA");
      setUserId(response.data.data.userId, "AA");
      handleOtp();
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
      // handleNewPass();
      handleShow("newPass");
    }
  };
  const handleSetPassword = async (e) => {
    e.preventDefault();
    console.log(userId, "aaaa");
    const response = await dispatch(
      createNewPassword({
        userId,
        newPassword: password,
        confirmPassword: confPassword,
      })
    );
    if (response) {
      // console.log("sdsds");
      setShowOTPForm(false);
      setShowPasswordRest(false);
      // handleLogin()
      handleShow("login");
    }
  };

  return (
    <>
      {showEmailInput && (
        <ModalComponent
          show={show}
          handleClose={handleClose}
          title="Reset Password"
        >
          <Form>
            <div className="mb-3">
              <Form.Label>Enter Email </Form.Label>
              <Form.Control
                type="text"
                value={email}
                onChange={handleMailChange}
                required
              ></Form.Control>
            </div>
            <div className="text-center mt-2">
              {/* <Button variant="link" onClick={handleOtp}>
                Next
              </Button> */}
              <Button
                type="submit"
                onClick={handleEmailSubmit}
                className="bg-orange-300"
              >
                Next
              </Button>
            </div>
          </Form>
        </ModalComponent>
      )}
      {/* {showOTPForm && <OtpModal onOTPSubmit={handleOTPSubmit} />} */}
      {showOTPForm && (
        <OtpModal
          show={showModal === "otp"}
          handleClose={handleClose}
          onOTPSubmit={handleOTPSubmit}
        />
      )}

      {showPasswordRest && (
        <NewPassModal
          show={showModal === "newPass"}
          handleClose={handleClose}
          handleSetPassword={handleSetPassword}
          password = {password}
          confPassword = {confPassword}
          handlePassChange={handlePassChange}
          handleConfPassChange={handleConfPassChange}
        />
      )}
    </>
  );
};

export default ForgotModal;
