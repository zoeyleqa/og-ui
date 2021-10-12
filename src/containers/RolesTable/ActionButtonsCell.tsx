import React, { useState } from "react";
import { Button } from "../../components/Button";
import { ModalDialog } from "../../components/ModalDialog";
import { Drawer } from "../../components/Drawer";
import { EditRoleForm } from "./EditRoleForm";

interface ActionCellProps {
  rowId: string | number;
  row: any;
  editHandler: any;
  updateRow: any;
  deleteHandler: any;
  disabled?: false;
}

// Create an editable cell renderer
export const ActionCell = ({
  rowId,
  row,
  editHandler,
  updateRow,
  deleteHandler,
  disabled = false
}: ActionCellProps) => {
  const [showEditPanel, setEditPanel] = useState(false);
  const [showDeletePanel, setDeletePanel] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  const roleId = parseInt(row.id);

  const toggleLoading = () => setModalLoading(!modalLoading);
  const toggleDeletePanel = () => setDeletePanel(!showDeletePanel);
  const toggleEditPanel = () => {
    if (showEditPanel) {
      let closeBtn = document.getElementById(`offcanvas-close-${roleId}`);
      if (closeBtn) closeBtn.click();
    }

    setEditPanel(!showEditPanel);
  };

  const onDeleteRole = () => {
    toggleLoading();

    deleteHandler(roleId)
      .then(() => toggleLoading())
      .catch(() => toggleLoading());
  };

  return (
    <div style={{ textAlign: "left" }}>
      <Button
        onClick={toggleEditPanel}
        type="edit"
        disabled={disabled}
        data-bs-toggle="offcanvas"
        data-bs-target={`#offcanvas-${roleId}`}
        aria-controls={`offcanvas-${roleId}`}
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
      <ModalDialog
        title="Delete Role"
        show={showDeletePanel}
        toggleShow={toggleDeletePanel}
        ctaTitle="Remove"
        ctaBtnType="delete"
        action={() => onDeleteRole()}
        content={<p>Are you sure you want to remove this role?</p>}
      />
    </div>
  );
};
