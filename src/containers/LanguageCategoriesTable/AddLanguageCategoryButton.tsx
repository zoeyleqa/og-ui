import React, { useRef, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { Button } from "../../components/Button";
import { Drawer } from "../../components/Drawer";
import Offcanvas from "bootstrap/js/dist/offcanvas";

const formId = "add-languageCategory-form";
const drawerId = "add-langcat";

interface AddLanguageCategoryProps {
  addHandler: any;
  addRow: any;
}

export const AddLanguageCategoryButton = ({
  addHandler,
  addRow
}: AddLanguageCategoryProps) => {
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
  const addLanguageCategory = () => {
    const form = document.getElementById(formId) as HTMLFormElement;

    const name = form.langCategoriesName ? form.langCategoriesName.value : "";
    const description = form.description ? String(form.description.value) : "";
    const args = { name, description };

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
        label="New Category"
        aria-controls={`offcanvas-${drawerId}`}
      />
      <Drawer
        id={drawerId}
        title="Add New Category"
        content={
          <Form id={formId}>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="langCategoriesName"
            >
              <Form.Label column sm="2">
                Category Name
              </Form.Label>
              <Col sm="10">
                <Form.Control required placeholder="Enter Language Category" />
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

            <Button
              type="save"
              label="Submit"
              onClick={() => addLanguageCategory()}
              loading={loading}
            />
          </Form>
        }
      />
    </>
  );
};
