import React from "react";
import { Button, Form } from "react-bootstrap";
import ModalComponent from "./ModalComponent";

const NewPassModal = ({
  show,
  handleClose,
  handleSetPassword,
  password,
  confPassword,
  handlePassChange,
  handleConfPassChange,
}) => (
  <ModalComponent
    show={show}
    handleClose={handleClose}
    title="Create New Password"
  >
    <Form>
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
        <Button variant="link" onClick={handleSetPassword}>
          Confirm
        </Button>
      </div>
    </Form>
  </ModalComponent>
);

export default NewPassModal;
