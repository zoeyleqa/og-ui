import React, { useState, useRef, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { Button } from "../../components/Button";
import { Drawer } from "../../components/Drawer";
import Offcanvas from "bootstrap/js/dist/offcanvas";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const formId = "add-event-form";
const drawerId = "add-event";

interface AddEventProps {
  addHandler: any;
  addRow: any;
}

export const AddEventButton = ({ addHandler, addRow }: AddEventProps) => {
  const { mutate: add, loading } = addHandler({});

  const [openDate, setOpenDate] = useState<Date | null>(new Date());
  const [infilDate, setInfilDate] = useState<Date | null>(new Date());
  const [poDate, setPoDate] = useState<Date | null>(new Date());
  const [finalDate, setFinalDate] = useState<Date | null>(new Date());
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [exfilDate, setExfilDate] = useState<Date | null>(new Date());

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
    const overrideDates = form.overrideDates ? form.overrideDates : false;

    const args = {
      name,
      openDate,
      infilDate,
      poDate,
      finalDate,
      startDate,
      endDate,
      exfilDate,
      overrideDates
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

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                Open Date
              </Form.Label>
              <Col sm="8">
                <DatePicker
                  selected={openDate}
                  onChange={(date: Date | null) => setOpenDate(date)}
                  className="form-control"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="infilSuspenseDate">
              <Form.Label column sm="4">
                Infil Suspense Date
              </Form.Label>
              <Col sm="8">
                <DatePicker
                  selected={infilDate}
                  onChange={(date: Date | null) => setInfilDate(date)}
                  className="form-control"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                PO Suspense Date
              </Form.Label>
              <Col sm="8">
                <DatePicker
                  selected={poDate}
                  onChange={(date: Date | null) => setPoDate(date)}
                  className="form-control"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                Final Suspense Date
              </Form.Label>
              <Col sm="8">
                <DatePicker
                  selected={finalDate}
                  onChange={(date: Date | null) => setFinalDate(date)}
                  className="form-control"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                Start Date
              </Form.Label>
              <Col sm="8">
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date | null) => setStartDate(date)}
                  className="form-control"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                End Date
              </Form.Label>
              <Col sm="8">
                <DatePicker
                  selected={endDate}
                  onChange={(date: Date | null) => setEndDate(date)}
                  className="form-control"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="exfilSuspenseDate">
              <Form.Label column sm="4">
                Exfil Suspense Date
              </Form.Label>
              <Col sm="8">
                <DatePicker
                  selected={exfilDate}
                  onChange={(date: Date | null) => setExfilDate(date)}
                  className="form-control"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="overrideDates">
              <Col sm="8">
                <Form.Check 
                  type="checkbox"
                  label="Override Dates"
                />
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
