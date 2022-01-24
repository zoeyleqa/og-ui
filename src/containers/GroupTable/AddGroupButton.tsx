import React, { useRef, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { Button } from "../../components/Button";
import { Drawer } from "../../components/Drawer";
import Offcanvas from "bootstrap/js/dist/offcanvas";

const formId = "add-group-form";
const drawerId = "add-group";

interface AddGroupProps {
  addHandler: any;
  addRow: any;
}

export const AddGroupButton = ({ addHandler, addRow }: AddGroupProps) => {
  const { mutate: add, loading } = addHandler({});

  const offcanvasEl = useRef<HTMLElement | null>(null);
  const drawerObj = useRef<Offcanvas | null>(null);

  useEffect(() => {
    if (!offcanvasEl.current) {
      offcanvasEl.current = document.getElementById(`offcanvas-${drawerId}`);

      if (offcanvasEl.current && !drawerObj.current) {
        drawerObj.current = new Offcanvas(offcanvasEl.current);
      }
    }
  }, []);

  const toggleAddPanel = () => {
    if (drawerObj.current) {
      drawerObj.current.toggle();
    }
  };
  const addGroup = () => {
    const form = document.getElementById(formId) as HTMLFormElement;

    const name = form.groupname ? form.groupname.value : "";
    const unit = form.unit ? String(form.unit.value) : "";
    const lead_one = form.lead1 ? String(form.lead1.value) : "";
    const lead_two = form.lead2 ? String(form.lead2.value) : "";
    const args = {
      name,
      unit,
      lead_one,
      lead_two
    };

    add({ ...args })
      .then((retData: { id: any }) => {
        addRow(retData);
        toggleAddPanel();
      })
      .catch((e: any) => {
        console.error(e);
        toggleAddPanel();
      });
  };

  return (
    <>
      <Button
        onClick={toggleAddPanel}
        type="add"
        label="New Group"
        aria-controls={`offcanvas-${drawerId}`}
      />
      <Drawer
        id={drawerId}
        title="Add New Group"
        content={
          <Form id={formId}>
            <Form.Group as={Row} className="mb-3" controlId="groupname">
              <Form.Label column sm="2">
                Group Name
              </Form.Label>
              <Col sm="10">
                <Form.Control required placeholder="Enter Group" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="unit">
              <Form.Label column sm="2">
                Unit
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  required
                  placeholder="Enter Unit"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="lead1">
              <Form.Label column sm="2">
                Lead 1
              </Form.Label>
              <Col sm="10">
                <Form.Control required placeholder="Enter Lead" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="lead2">
              <Form.Label column sm="2">
                Lead 2
              </Form.Label>
              <Col sm="10">
                <Form.Control required placeholder="Enter Lead" />
              </Col>
            </Form.Group>

            <Button
              type="save"
              label="Submit"
              onClick={() => addGroup()}
              loading={loading}
            />
          </Form>
        }
      />
    </>
  );
};
