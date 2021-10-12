import React from "react";
import { Modal } from "react-bootstrap";
import { Button } from "../Button";

export interface ModalDialog {
  title?: String;
  show: boolean;
  toggleShow: () => void;
  action: () => void;
  ctaTitle: string;
  ctaBtnType: string;
  content: any;
}

export const ModalDialog = ({
  title = "Dialog",
  show,
  toggleShow,
  action,
  ctaTitle,
  ctaBtnType,
  content,
  ...rest
}: ModalDialog) => {
  return (
    <Modal
      show={show}
      onHide={toggleShow}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
      <Modal.Footer>
        <Button type="cancel" onClick={toggleShow} />
        <Button
          type={ctaBtnType}
          label={ctaTitle}
          onClick={action}
          {...rest}
        />
      </Modal.Footer>
    </Modal>
  );
};
