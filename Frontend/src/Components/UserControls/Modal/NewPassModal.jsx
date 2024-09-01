import React from "react";
import { Button, Form } from "react-bootstrap";
import ModalComponent from "./ModalComponent";
import { useDispatch, useSelector } from "react-redux";
import { updateErrorAndMessage } from "../../../Features";

const NewPassModal = ({
  show,
  handleClose,
  handleSetPassword,
  password,
  confPassword,
  setPassword,
  setConfPassword,
  handlePassChange,
  handleConfPassChange,
}) => {
  const status = useSelector((state) => state.forgotPassword.status);
  const message = useSelector((state) => state.forgotPassword.message);
  const error = useSelector((state) => state.forgotPassword.error);
  const dispatch = useDispatch();

  const handleModalClose = () => {
    setPassword("");
    setConfPassword("");
    handleClose();
  };
  const handleSetPasswordFirst = (e) => {
    e.preventDefault();
    if (password !== confPassword) {
      dispatch(
        updateErrorAndMessage({
          error: true,
          message: "Password and Confirm Password Mismatch",
        })
      );
    } else {
      setPassword("");
      setConfPassword("");
      handleSetPassword();
    }
  };
  return (
    <ModalComponent
      show={show}
      handleClose={handleModalClose}
      title="Create New Password"
    >
      <Form onSubmit={(e) => handleSetPasswordFirst(e)}>
        {message && !error ? (
          <div className="text-green-600 text-center">{message}</div>
        ) : (
          <div className="text-red-600 text-center">{message}</div>
        )}
        <div className="mb-3">
          <Form.Label>Enter Password </Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={handlePassChange}
            required
          ></Form.Control>
        </div>
        <div className="mb-3">
          <Form.Label>Confirm Password </Form.Label>
          <Form.Control
            type="password"
            value={confPassword}
            onChange={handleConfPassChange}
            required
          ></Form.Control>
        </div>
        <div className="text-center mt-2">
          <Button variant="link" type="submit">
            Confirm
          </Button>
        </div>
      </Form>
    </ModalComponent>
  );
};

export default NewPassModal;
