import React, { useState } from "react";
import { Button } from "../../components/Button";
import { Drawer } from "../../components/Drawer";
import { DeleteRoleModal } from "./DeleteRoleModal";
import { EditRoleForm } from "./EditRoleForm";

interface ActionCellProps {
  rowId: string | number;
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

  const roleId = parseInt(row.id);

  const toggleDeletePanel = () => setDeletePanel(!showDeletePanel);
  const toggleEditPanel = () => {
    if (showEditPanel) {
      let closeBtn = document.getElementById(`offcanvas-close-edit-${roleId}`);
      if (closeBtn) closeBtn.click();
    }

    setEditPanel(!showEditPanel);
  };

  return (
    <div style={{ textAlign: "left" }}>
      <Button
        onClick={toggleEditPanel}
        type="edit"
        disabled={disabled}
        data-bs-toggle="offcanvas"
        data-bs-target={`#offcanvas-edit-${roleId}`}
        aria-controls={`offcanvas-edit-${roleId}`}
      />
      <Drawer
        id={roleId}
        title="Edit Role"
        show={showEditPanel}
        content={
          <EditRoleForm
            id={roleId}
            rowId={rowId}
            roleData={row}
            editHandler={editHandler}
            updateRow={updateRow}
            toggleDrawer={toggleEditPanel}
          />
        }
      />
      <Button onClick={toggleDeletePanel} type="delete" disabled={disabled} />
      <DeleteRoleModal
        id={roleId}
        rowId={rowId}
        deleteHandler={deleteHandler}
        deleteRow={deleteRow}
        show={showDeletePanel}
        toggleModal={toggleDeletePanel}
      />
    </div>
  );
};
