import React, { useRef, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { Button } from "../../components/Button";
import { Drawer } from "../../components/Drawer";
import Offcanvas from "bootstrap/js/dist/offcanvas";

const formId = "add-exercise-form";
const drawerId = "add-exercise";

interface AddExerciseProps {
  addHandler: any;
  addRow: any;
  groups: Array<any> | null;
}

export const AddExerciseButton = ({
  addHandler,
  addRow,
  groups
}: AddExerciseProps) => {
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
  const addExercise = () => {
    const form = document.getElementById(formId) as HTMLFormElement;

    const name = form.exercisename ? form.exercisename.value : "";
    const description = form.description ? String(form.description.value) : "";
    const background_color = form.backgroundColor
      ? String(form.backgroundColor.value)
      : "";
    const text_color = form.textColor ? String(form.textColor.value) : "";
    const group_id = form.group ? parseInt(form.group.value) : null;
    const args = {
      name,
      description,
      background_color,
      text_color,
      group_id
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
        label="New Exercise"
        aria-controls={`offcanvas-${drawerId}`}
      />
      <Drawer
        id={drawerId}
        title="Add New Exercise"
        content={
          <Form id={formId}>
            <Form.Group as={Row} className="mb-3" controlId="exercisename">
              <Form.Label column sm="2">
                Exercise Name
              </Form.Label>
              <Col sm="10">
                <Form.Control required placeholder="Enter Exercise" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="group">
              <Form.Label column sm="2">
                Group
              </Form.Label>
              <Col sm="10">
                <Form.Control as="select" required>
                  {groups
                    ? groups.map((group: any) => (
                        <option
                          key={`exercise-group-${group.id}`}
                          value={group.id}
                        >
                          {group.name}
                        </option>
                      ))
                    : null}
                </Form.Control>
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
                  style={{ height: "100px" }}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="backgroundColor">
              <Form.Label column sm="2">
                Background Color
              </Form.Label>
              <Col sm="10">
                <Form.Control required placeholder="Enter Color" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="textColor">
              <Form.Label column sm="2">
                Text Color
              </Form.Label>
              <Col sm="10">
                <Form.Control required placeholder="Enter Color" />
              </Col>
            </Form.Group>

            <Row className="button-group-right">
              <Button type="cancel" onClick={toggleAddPanel} />
              <Button
                type="save"
                label="Submit"
                onClick={() => addExercise()}
                loading={loading}
              />
            </Row>
          </Form>
        }
      />
    </>
  );
};
