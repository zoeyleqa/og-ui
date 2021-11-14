import React, { useRef, useState, useEffect } from "react";
import { Button } from "../../components/Button";
import { Drawer } from "../../components/Drawer";
import { DeleteAttendeeModal } from "./DeleteAttendeeModal";
import { EditAttendeeForm } from "./EditAttendeeForm";
import Offcanvas from "bootstrap/js/dist/offcanvas";

const drawerId = "edit-attendee";

interface ActionCellProps {
  rowId: string;
  row: any;
  editHandler: any;
  updateRow: any;
  deleteHandler: any;
  deleteRow: any;
  disabled?: false;
}

// Create an editable cell renderer
export const ActionCell = ({
  rowId,
  row,
  editHandler,
  updateRow,
  deleteHandler,
  deleteRow,
  disabled = false
}: ActionCellProps) => {
  const [showDeletePanel, setDeletePanel] = useState(false);
  const offcanvasEl = useRef<HTMLElement | null>(null);
  const drawerObj = useRef<Offcanvas | null>(null);

  const attendeeId = parseInt(row.id);

  useEffect(() => {
    if (!offcanvasEl.current) {
      offcanvasEl.current = document.getElementById(
        `offcanvas-${drawerId}-${attendeeId}`
      );

      if (offcanvasEl.current && !drawerObj.current) {
        drawerObj.current = new Offcanvas(offcanvasEl.current);
      }
    }
  }, []);

  const toggleDeletePanel = () => setDeletePanel(!showDeletePanel);
  const toggleEditPanel = () => {
    if (drawerObj.current) {
      drawerObj.current.toggle();
    }
  };

  return (
    <>
      <Button
        onClick={toggleEditPanel}
        type="edit"
        disabled={disabled}
        aria-controls={`offcanvas-edit-${attendeeId}`}
      />
      <Drawer
        id={`${drawerId}-${attendeeId}`}
        title="Edit Attendee"
        content={
          <EditAttendeeForm
            id={attendeeId}
            rowId={rowId}
            attendeeData={row}
            editHandler={editHandler}
            updateRow={updateRow}
            toggleDrawer={toggleEditPanel}
          />
        }
      />
      <Button onClick={toggleDeletePanel} type="delete" disabled={disabled} />
      <DeleteAttendeeModal
        id={attendeeId}
        rowId={rowId}
        deleteHandler={deleteHandler}
        deleteRow={deleteRow}
        show={showDeletePanel}
        toggleModal={toggleDeletePanel}
      />
    </>
  );
};
