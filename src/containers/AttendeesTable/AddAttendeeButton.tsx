import React, { useRef, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { Button } from "../../components/Button";
import { Drawer } from "../../components/Drawer";
import Offcanvas from "bootstrap/js/dist/offcanvas";

const formId = "add-attendee-form";
const drawerId = "add-attendee";

interface AddAttendeeProps {
  addHandler: any;
  addRow: any;
}

export const AddAttendeeButton = ({ addHandler, addRow }: AddAttendeeProps) => {
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
  const addAttendee = () => {
    const form = document.getElementById(formId) as HTMLFormElement;

    const first_name = form.firstName ? form.firstName.value : "";
    const middle_name = form.middleName ? form.middleName.value : "";
    const last_name = form.lastName ? form.lastName.value : "";
    const nick_name = form.preferredName ? form.preferredName.value : "";
    const suffix = form.suffix ? form.suffix.value : "";
    const sex = form.gender ? form.gender.value : "";
    const email = form.email ? form.email.value : "";
    const street = form.address ? form.address.value : "";
    const city = form.city ? form.city.value : "";
    const state = form.state ? form.state.value : "";
    const country_code = form.country ? form.country.value : "";
    const is_us_citizen = form.usCitizen ? form.usCitizen.value : "";
    const args = {
      first_name,
      middle_name,
      last_name,
      nick_name,
      suffix,
      sex,
      email,
      street,
      city,
      state,
      country_code,
      is_us_citizen
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
        label="New Attendee"
        aria-controls={`offcanvas-${drawerId}`}
      />
      <Drawer
        id={drawerId}
        title="Add New Attendee"
        content={
          <Form id={formId}>
            <Form.Group as={Row} className="mb-3" controlId="firstName">
              <Form.Label column sm="2">
                First Name
              </Form.Label>
              <Col sm="10">
                <Form.Control required placeholder="Enter name" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="middleName">
              <Form.Label column sm="2">
                Middle Name
              </Form.Label>
              <Col sm="10">
                <Form.Control required placeholder="Enter name" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="lastName">
              <Form.Label column sm="2">
                Last Name
              </Form.Label>
              <Col sm="10">
                <Form.Control required placeholder="Enter name" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="suffix">
              <Form.Label column sm="2">
                Suffix
              </Form.Label>
              <Col sm="10">
                <Form.Control />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="preferredName">
              <Form.Label column sm="2">
                Preferred Name
              </Form.Label>
              <Col sm="10">
                <Form.Control required placeholder="Enter nick name" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="gender">
              <Form.Label column sm="2">
                Gender
              </Form.Label>
              <Col sm="10">
                <Form.Control />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="email">
              <Form.Label column sm="2">
                Email
              </Form.Label>
              <Col sm="10">
                <Form.Control required />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="address">
              <Form.Label column sm="2">
                Address
              </Form.Label>
              <Col sm="10">
                <Form.Control required />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="city">
              <Form.Label column sm="2">
                City
              </Form.Label>
              <Col sm="10">
                <Form.Control required placeholder="Enter city" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="state">
              <Form.Label column sm="2">
                State
              </Form.Label>
              <Col sm="10">
                <Form.Control required />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="country">
              <Form.Label column sm="2">
                Country
              </Form.Label>
              <Col sm="10">
                <Form.Control required />
              </Col>
            </Form.Group>

            <Form.Group className="mb-3" controlId="status">
              <Form.Label column sm="2">
                Status
              </Form.Label>
              <Col sm="10">
                <Form.Control as="select" required>
                  <option key={`attendee-status-active`} value="active">
                    Active
                  </option>
                  <option key={`attendee-status-inactive`} value="Inactive">
                    Inactive
                  </option>
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="usCitizen">
              <Col sm="8">
                <Form.Check type="checkbox" label="Is US citizen" />
              </Col>
            </Form.Group>

            <Button
              type="save"
              label="Submit"
              onClick={() => addAttendee()}
              loading={loading}
            />
          </Form>
        }
      />
    </>
  );
};
