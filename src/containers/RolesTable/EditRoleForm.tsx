import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { Button } from "../../components/Button";

const formId = "edit-role-form";

interface EditFormProps {
  id: string | number;
  rowId: string;
  roleData: any;
  editHandler: any;
  updateRow: any;
  toggleDrawer: () => void;
}

export const EditRoleForm = ({
  id,
  rowId,
  roleData,
  editHandler,
  updateRow,
  toggleDrawer
}: EditFormProps) => {
  const { mutate: update, loading } = editHandler({ item_id: id });

  const updateRole = () => {
    const form = document.getElementById(formId + id) as HTMLFormElement;

    const name = form.rolename ? form.rolename.value : "";
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
      <Form.Group as={Row} className="mb-3" controlId="rolename">
        <Form.Label column sm="2">
          Role Name
        </Form.Label>
        <Col sm="10">
          <Form.Control defaultValue={roleData.name} />
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
            defaultValue={roleData.description}
            style={{ height: "100px" }}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="pay">
        <Form.Label column sm="2">
          Daily Pay (&#x24;USD)
        </Form.Label>
        <Col sm="10">
          <Form.Control defaultValue={roleData.pay} />
        </Col>
      </Form.Group>
      <Button type="save" onClick={() => updateRole()} loading={loading} />
    </Form>
  );
};
