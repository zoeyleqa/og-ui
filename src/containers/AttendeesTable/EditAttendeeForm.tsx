import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { Button } from "../../components/Button";

const formId = "edit-attendee-form";

interface EditFormProps {
  id: string | number;
  rowId: string;
  attendeeData: any;
  editHandler: any;
  updateRow: any;
  toggleDrawer: () => void;
}

export const EditAttendeeForm = ({
  id,
  rowId,
  attendeeData,
  editHandler,
  updateRow,
  toggleDrawer
}: EditFormProps) => {
  const { mutate: update, loading } = editHandler({ item_id: id });

  const updateAttendee = () => {
    const form = document.getElementById(formId + id) as HTMLFormElement;

    const name = form.attendeename ? form.attendeename.value : "";
    const description = form.description ? String(form.description.value) : "";
    const pay = form.pay ? String(form.pay.value) : "";
    const args = {
      name,
      description,
      pay
    };

    update({ ...args })
      .then((retData: { id: any }) => {
        updateRow(parseInt(rowId), retData);
        toggleDrawer();
      })
      .catch((e: any) => {
        console.error(e);
        toggleDrawer();
      });
  };

  return (
    <Form id={formId + id}>
      <Form.Group as={Row} className="mb-3" controlId="attendeename">
        <Form.Label column sm="2">
          Attendee Name
        </Form.Label>
        <Col sm="10">
          <Form.Control defaultValue={attendeeData.name} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="description">
        <Form.Label column sm="2">
          Description
        </Form.Label>
        <Col sm="10">
          <Form.Control
            as="textarea"
            placeholder="Add description here"
            defaultValue={attendeeData.description}
            style={{ height: "100px" }}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="pay">
        <Form.Label column sm="2">
          Daily Pay (&#x24;USD)
        </Form.Label>
        <Col sm="10">
          <Form.Control defaultValue={attendeeData.pay} />
        </Col>
      </Form.Group>
      <Button type="save" onClick={() => updateAttendee()} loading={loading} />
    </Form>
  );
};
