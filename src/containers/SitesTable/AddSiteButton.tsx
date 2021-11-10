import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { Button } from "../../components/Button";
import { Drawer } from "../../components/Drawer";

const formId = "add-site-form";
const drawerId = "add-site";

interface AddSiteProps {
  addHandler: any;
  addRow: any;
}

export const AddSiteButton = ({ addHandler, addRow }: AddSiteProps) => {
  const { mutate: add, loading } = addHandler({});

  const [showAddPanel, setAddPanel] = useState(false);

  const toggleEditPanel = () => {
    if (showAddPanel) {
      let closeBtn = document.getElementById(`offcanvas-${drawerId}-close`);
      if (closeBtn) closeBtn.click();
    }

    setAddPanel(!showAddPanel);
  };

  const addSite = () => {
    const form = document.getElementById(formId) as HTMLFormElement;

    const name = form.sitename ? form.sitename.value : "";
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
        type="add"
        label="New Site"
        data-bs-toggle="offcanvas"
        data-bs-target={`#offcanvas-${drawerId}`}
        aria-controls={`offcanvas-${drawerId}`}
      />
      <Drawer
        id={drawerId}
        title="Add New Site"
        show={showAddPanel}
        content={
          <Form id={formId}>
            <Form.Group as={Row} className="mb-3" controlId="sitename">
              <Form.Label column sm="2">
                Site Name
              </Form.Label>
              <Col sm="10">
                <Form.Control required placeholder="Enter Site" />
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
            <Button
              type="save"
              label="Submit"
              onClick={() => addSite()}
              loading={loading}
            />
          </Form>
        }
      />
    </>
  );
};
