import React, { useRef, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { Button } from "../../components/Button";
import { Drawer } from "../../components/Drawer";
import Offcanvas from "bootstrap/js/dist/offcanvas";

const formId = "add-language-form";
const drawerId = "add-language";

interface AddLanguageProps {
  addHandler: any;
  addRow: any;
}

export const AddLanguageButton = ({ addHandler, addRow }: AddLanguageProps) => {
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
  const addLanguage = () => {
    const form = document.getElementById(formId) as HTMLFormElement;

    const name = form.languagename ? form.languagename.value : "";
    const comment = form.comment ? String(form.comment.value) : "";
    const args = { name, comment };

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
        label="New Language"
        aria-controls={`offcanvas-${drawerId}`}
      />
      <Drawer
        id={drawerId}
        title="Add New Language"
        content={
          <Form id={formId}>
            <Form.Group as={Row} className="mb-3" controlId="languagename">
              <Form.Label column sm="2">
                Language Name
              </Form.Label>
              <Col sm="10">
                <Form.Control required placeholder="Enter Language" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="comment">
              <Form.Label column sm="2">
                Comment
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  required
                  as="textarea"
                  placeholder="Add comment here"
                  style={{ height: "100px" }}
                />
              </Col>
            </Form.Group>

            <Button
              type="save"
              label="Submit"
              onClick={() => addLanguage()}
              loading={loading}
            />
          </Form>
        }
      />
    </>
  );
};
