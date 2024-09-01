import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import ModalComponent from "./ModalComponent";
import { useSelector } from "react-redux";

const OtpModal = ({
  show,
  handleClose,
  handleNewPass,
  length = 6,
  onOTPSubmit,
}) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const status = useSelector((state) => state.forgotPassword.status);
  const message = useSelector((state) => state.forgotPassword.message);
  const error = useSelector((state) => state.forgotPassword.error);

  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0] === "") {
      inputRefs.current[0].focus();
    }
  });

  // const onOTPSubmit = (combinedOTP) => {
  //   console.log(combinedOTP);
  // };

  const handleChange = (index, e) => {
    const value = e.target.value;

    if (isNaN(value)) return;

    const newOtp = [...otp];
    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Submit Trigger

    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) {
      onOTPSubmit(combinedOtp);
    }

    // Move to next input if current is filled

    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === "ArrowLeft") {
      if (inputRefs.current[index - 1] && index > 0) {
        // Focus on the previous input and move the cursor to the end
        inputRefs.current[index - 1].focus();
        setTimeout(() => {
          inputRefs.current[index - 1].setSelectionRange(1, 1);
        }, 0);
      } else if (index === 0) {
        setTimeout(() => {
          inputRefs.current[index].setSelectionRange(1, 1);
        }, 0);
      }
    } else if (e.key === "ArrowRight") {
      if (inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
        setTimeout(() => {
          inputRefs.current[index + 1].setSelectionRange(1, 1);
        }, 0);
      }
    }
  };

  return (
    <ModalComponent show={show} handleClose={handleClose} title="Enter OTP">
      {message && !error ? (
        <div className="text-green-600 text-center">{message}</div>
      ) : (
        <div className="text-red-600 text-center">{message}</div>
      )}
      <form>
        <div className="mb-3">
          <label htmlFor="otp" className="form-label">
            Enter OTP
          </label>
        </div>
      </form>
      {otp.map((value, index) => (
        <input
          type="text"
          ref={(input) => (inputRefs.current[index] = input)}
          key={index}
          value={value}
          onChange={(e) => handleChange(index, e)}
          onClick={(e) => handleClick(index)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          // className="w-9 border-pink-200 border-2 me-3 h-10 text-center"
          className="w-9 me-3 h-10 text-center text-black"
        />
      ))}
    </ModalComponent>
  );
};

export default OtpModal;
