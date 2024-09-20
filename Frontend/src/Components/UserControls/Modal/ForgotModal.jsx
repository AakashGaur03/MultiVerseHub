import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import ModalComponent from "./ModalComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewPassword,
  sendOTPMail,
  updateErrorAndMessage,
  verifyOTP,
} from "../../../Features";
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
  const message = useSelector((state) => state.forgotPassword.message);
  const error = useSelector((state) => state.forgotPassword.error);

  const handleEmailSubmit = async (e) => {
    // console.log(email);
    e.preventDefault();
    const response = await dispatch(sendOTPMail({ email }));
    // console.log(otpToken, "otpToken");
    if (response) {
      setShowOTPForm(true);
      setShowEmailInput(false);
      setEmail("");
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
  const handleSetPassword = async (e = null) => {
    if (e) e.preventDefault();
    console.log(userId, "aaaa");
    const response = await dispatch(
      createNewPassword({
        userId,
        newPassword: password,
        confirmPassword: confPassword,
      })
    );
    console.log(response);
    if (response) {
      console.log("sdsds");
      setShowOTPForm(false);
      setShowPasswordRest(false);
      dispatch(updateErrorAndMessage({ error: false, message: "" }));
      // handleLogin()
      handleShow("login");
    }
  };
  const handleModalClose = () => {
    setEmail("");
    handleClose();
  };
  return (
    <>
      {showEmailInput && (
        <ModalComponent
          show={show}
          handleClose={handleModalClose}
          title="Reset Password"
        >
          {message && !error ? (
            <div className="text-green-600 text-center">{message}</div>
          ) : (
            <div className="text-red-600 text-center">{message}</div>
          )}
          <Form onSubmit={handleEmailSubmit}>
            <div className="mb-3">
              <Form.Label>Enter Email </Form.Label>
              <Form.Control
                type="email"
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
                className="bg-orange-300"
                disabled={status === "loading"}
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
          setPassword={setPassword}
          setConfPassword={setConfPassword}
          password={password}
          confPassword={confPassword}
          handlePassChange={handlePassChange}
          handleConfPassChange={handleConfPassChange}
        />
      )}
    </>
  );
};

export default ForgotModal;
