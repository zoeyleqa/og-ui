import React, { useState } from "react";
import { Button } from "../../components/Button";
import { Drawer } from "../../components/Drawer";
import { DeleteRoleModal } from "./DeleteRoleModal";
import { EditRoleForm } from "./EditRoleForm";

const drawerId = "edit-role";

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

  const roleId = parseInt(row.id);

  const toggleDeletePanel = () => setDeletePanel(!showDeletePanel);
  // const toggleEditPanel = () => {
  //   if (showEditPanel) {
  //     let closeBtn = document.getElementById(`offcanvas-close-${drawerId}-${roleId}`);
  //     if (closeBtn) closeBtn.click();
  //   }

  //   setEditPanel(!showEditPanel);
  // };

  return (
    <>
      <Button
        onClick={()=> {}}
        type="edit"
        disabled={disabled}
        data-bs-toggle="offcanvas"
        data-bs-target={`#offcanvas-${drawerId}-${roleId}`}
        aria-controls={`offcanvvas-${drawerId}-${roleId}`}
      />
      <Drawer
        id={`${drawerId}-${roleId}`}
        title="Edit Role"
        show={showEditPanel}
        content={
          <EditRoleForm
            id={roleId}
            rowId={rowId}
            roleData={row}
            editHandler={editHandler}
            updateRow={updateRow}
            toggleDrawer={()=>{}}
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
    </>
  );
};
