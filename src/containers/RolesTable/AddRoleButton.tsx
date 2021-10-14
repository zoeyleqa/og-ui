import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { Button } from "../../components/Button";
import { Drawer } from "../../components/Drawer";

const formId = "add-role-form";
const drawerId = "add";

interface AddRoleProps {
  addHandler: any;
  addRow: any;
}

export const AddRoleButton = ({ addHandler, addRow }: AddRoleProps) => {
  const { mutate: add, loading } = addHandler({});

  const [showAddPanel, setAddPanel] = useState(false);

  const toggleEditPanel = () => {
    if (showAddPanel) {
      let closeBtn = document.getElementById(`offcanvas-${drawerId}-close`);
      if (closeBtn) closeBtn.click();
    }

    setAddPanel(!showAddPanel);
  };

  const addRole = () => {
    const form = document.getElementById(formId) as HTMLFormElement;

    const name = form.rolename ? form.rolename.value : "";
    const description = form.description ? String(form.description.value) : "";
    const pay = form.pay ? String(form.pay.value) : "";
    const args = {
      name,
      description,
      pay
    };

    add({ ...args })
      .then((retData: { id: any }) => {
        addRow(retData);
        toggleEditPanel();
      })
      .catch((e: any) => {
        console.error(e);
        toggleEditPanel();
      });
  };

  return (
    <>
      <Button
        onClick={toggleEditPanel}
        type="edit"
        data-bs-toggle="offcanvas"
        data-bs-target={`#offcanvas-${drawerId}`}
        aria-controls={`offcanvas-${drawerId}`}
      />
      <Drawer
        id={drawerId}
        title="Edit Role"
        show={showAddPanel}
        content={
          <Form id={formId}>
            <Form.Group as={Row} className="mb-3" controlId="rolename">
              <Form.Label column sm="2">
                Role Name
              </Form.Label>
              <Col sm="10">
                <Form.Control required placeholder="Enter Role" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="description">
              <Form.Label column sm="2">
                Description
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  required
                  as="textarea"
                  placeholder="Add description here"
                  style={{ height: "100px" }}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="pay">
              <Form.Label column sm="2">
                Daily Pay (&#x24;USD)
              </Form.Label>
              <Col sm="10">
                <Form.Control required placeholder="Enter Pay" />
              </Col>
            </Form.Group>
            <Button type="save" onClick={() => addRole()} loading={loading} />
          </Form>
        }
      />
    </>
  );
};
