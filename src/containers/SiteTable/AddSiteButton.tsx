import React, { useRef, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { Button } from "../../components/Button";
import { Drawer } from "../../components/Drawer";
import Offcanvas from "bootstrap/js/dist/offcanvas";

const formId = "add-site-form";
const drawerId = "add-site";

interface AddSiteProps {
  addHandler: any;
  addRow: any;
}

export const AddSiteButton = ({ addHandler, addRow }: AddSiteProps) => {
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
  const addSite = () => {
    const form = document.getElementById(formId) as HTMLFormElement;

    const name = form.sitename ? form.sitename.value : "";
    const description = form.description ? String(form.description.value) : "";
    const country = form.country ? String(form.country.value) : "";
    const city = form.city ? String(form.city.value) : "";
    const state = form.state ? String(form.state.value) : "";
    const latDeg = !form.latDeg
      ? null
      : isNaN(Number(form.latDeg.value))
      ? 0
      : Number(form.latDeg.value);
    const latMin = !form.latMin
      ? null
      : isNaN(Number(form.latMin.value))
      ? 0
      : Number(form.latMin.value);
    const latSec = !form.latSec
      ? null
      : isNaN(Number(form.latSec.value))
      ? 0
      : Number(form.latSec.value);
    const longDeg = !form.longDeg
      ? null
      : isNaN(Number(form.longDeg.value))
      ? 0
      : Number(form.latSec.value);
    const longMin = !form.longMin
      ? null
      : isNaN(Number(form.longMin.value))
      ? 0
      : Number(form.latSec.value);
    const longSec = !form.longSec
      ? null
      : isNaN(Number(form.longSec.value))
      ? 0
      : Number(form.latSec.value);

    const args = {
      name,
      description,
      country,
      city,
      state,
      latDeg,
      latMin,
      latSec,
      longDeg,
      longMin,
      longSec
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
        label="New Site"
        aria-controls={`offcanvas-${drawerId}`}
      />
      <Drawer
        id={drawerId}
        title="Add New Site"
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

            <Form.Group as={Row} className="mb-3" controlId="country">
              <Form.Label column sm="2">
                Country
              </Form.Label>
              <Col sm="10">
                <Form.Control required />
              </Col>
            </Form.Group>

            <Row className="mb-3">
              <Col sm="9">
                <Form.Group as={Row} controlId="city">
                  <Form.Label column sm="2">
                    City
                  </Form.Label>
                  <Col>
                    <Form.Control required />
                  </Col>
                </Form.Group>
              </Col>
              <Col sm="3">
                <Form.Group as={Row} controlId="state">
                  <Form.Label column sm="2">
                    State
                  </Form.Label>
                  <Col>
                    <Form.Control required />
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="latDeg">
                <Form.Label>Latitude Degree</Form.Label>
                <Form.Control />
              </Form.Group>

              <Form.Group as={Col} controlId="latMin">
                <Form.Label>Latitude Minute</Form.Label>
                <Form.Control />
              </Form.Group>

              <Form.Group as={Col} controlId="latSec">
                <Form.Label>Latitude Second</Form.Label>
                <Form.Control />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="longDeg">
                <Form.Label>Longitude Degree</Form.Label>
                <Form.Control required />
              </Form.Group>

              <Form.Group as={Col} controlId="longMin">
                <Form.Label>Longitude Minute</Form.Label>
                <Form.Control />
              </Form.Group>

              <Form.Group as={Col} controlId="longSec">
                <Form.Label>Longitude Second</Form.Label>
                <Form.Control />
              </Form.Group>
            </Row>

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
