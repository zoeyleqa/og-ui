import React, { useRef, useState, useEffect } from "react";
import { Button } from "../../components/Button";
import { Drawer } from "../../components/Drawer";
import { DeleteUserModal } from "./DeleteUserModal";
import { EditUserForm } from "./EditUserForm";
import Offcanvas from "bootstrap/js/dist/offcanvas";

const drawerId = "edit-user";

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

  const userId = parseInt(row.id);

  useEffect(() => {
    if (!offcanvasEl.current) {
      offcanvasEl.current = document.getElementById(
        `offcanvas-${drawerId}-${userId}`
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
        aria-controls={`offcanvas-edit-${userId}`}
      />
      <Drawer
        id={`${drawerId}-${userId}`}
        title="Edit User"
        content={
          <EditUserForm
            id={userId}
            rowId={rowId}
            userData={row}
            editHandler={editHandler}
            updateRow={updateRow}
            toggleDrawer={toggleEditPanel}
          />
        }
      />
      <Button onClick={toggleDeletePanel} type="delete" disabled={disabled} />
      <DeleteUserModal
        id={userId}
        rowId={rowId}
        deleteHandler={deleteHandler}
        deleteRow={deleteRow}
        show={showDeletePanel}
        toggleModal={toggleDeletePanel}
      />
    </>
  );
};
