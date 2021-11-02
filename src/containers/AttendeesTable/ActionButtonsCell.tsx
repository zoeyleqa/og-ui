import React, { useState } from "react";
import { Button } from "../../components/Button";
import { Drawer } from "../../components/Drawer";
import { DeleteAttendeeModal } from "./DeleteAttendeeModal";
import { EditAttendeeForm } from "./EditAttendeeForm";

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
  const [showEditPanel, setEditPanel] = useState(false);
  const [showDeletePanel, setDeletePanel] = useState(false);

  const attendeeId = parseInt(row.id);

  const toggleDeletePanel = () => setDeletePanel(!showDeletePanel);
  const toggleEditPanel = () => {
    if (showEditPanel) {
      let closeBtn = document.getElementById(`offcanvas-close-edit-${attendeeId}`);
      if (closeBtn) closeBtn.click();
    }

    setEditPanel(!showEditPanel);
  };

  return (
    <>
      <Button
        onClick={toggleEditPanel}
        type="edit"
        disabled={disabled}
        data-bs-toggle="offcanvas"
        data-bs-target={`#offcanvas-edit-${attendeeId}`}
        aria-controls={`offcanvas-edit-${attendeeId}`}
      />
      <Drawer
        id={attendeeId}
        title="Edit Attendee"
        show={showEditPanel}
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
