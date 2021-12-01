import React, { useRef, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { Button } from "../../components/Button";
import { Drawer } from "../../components/Drawer";
import Offcanvas from "bootstrap/js/dist/offcanvas";

const formId = "add-event-form";
const drawerId = "add-event";

interface AddEventProps {
  addHandler: any;
  addRow: any;
}

export const AddEventButton = ({ addHandler, addRow }: AddEventProps) => {
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
  const addEvent = () => {
    const form = document.getElementById(formId) as HTMLFormElement;

    const name = form.eventname ? form.eventname.value : "";
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
        label="New Event"
        aria-controls={`offcanvas-${drawerId}`}
      />
      <Drawer
        id={drawerId}
        title="Add New Event"
        content={
          <Form id={formId}>
            <Form.Group as={Row} className="mb-3" controlId="eventname">
              <Form.Label column sm="4">
                Event Name
              </Form.Label>
              <Col sm="8">
                <Form.Control required placeholder="Enter Event" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="openDate">
              <Form.Label column sm="4">
                Open Date
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="date"
                  required
                  placeholder="Enter date here"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="infilSuspenseDate">
              <Form.Label column sm="4">
                Infil Suspense Date
              </Form.Label>
              <Col sm="8">
                <Form.Control required placeholder="Enter date" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="poSuspenseDate">
              <Form.Label column sm="4">
                PO Suspense Date
              </Form.Label>
              <Col sm="8">
                <Form.Control required placeholder="Enter date" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="finalSuspenseDate">
              <Form.Label column sm="4">
                Final Suspense Date
              </Form.Label>
              <Col sm="8">
                <Form.Control required placeholder="Enter date" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="startDate">
              <Form.Label column sm="4">
                Start Date
              </Form.Label>
              <Col sm="8">
                <Form.Control required placeholder="Enter date" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="endDate">
              <Form.Label column sm="4">
                End Date
              </Form.Label>
              <Col sm="8">
                <Form.Control required placeholder="Enter date" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="exfilSuspenseDate">
              <Form.Label column sm="4">
                Exfil Suspense Date
              </Form.Label>
              <Col sm="8">
                <Form.Control required placeholder="Enter date" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="overrideDates">
              <Form.Label column sm="4">
                Override Dates
              </Form.Label>
              <Col sm="8">
                <Form.Control required placeholder="Enter date" />
              </Col>
            </Form.Group>

            <Button
              type="save"
              label="Submit"
              onClick={() => addEvent()}
              loading={loading}
            />
          </Form>
        }
      />
    </>
  );
};
