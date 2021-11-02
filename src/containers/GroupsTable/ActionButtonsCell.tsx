import React, { useState } from "react";
import { Button } from "../../components/Button";
import { DeleteGroupModal } from "./DeleteGroupModal";

interface ActionCellProps {
  rowId: string;
  row: any;
  deleteHandler: any;
  deleteRow: any;
  disabled?: false;
}

// Create an editable cell renderer
export const ActionCell = ({
  rowId,
  row,
  deleteHandler,
  deleteRow,
  disabled = false
}: ActionCellProps) => {
  const [showDeletePanel, setDeletePanel] = useState(false);

  const roleId = parseInt(row.id);

  const toggleDeletePanel = () => setDeletePanel(!showDeletePanel);

  return (
    <>
      <Button onClick={toggleDeletePanel} type="delete" disabled={disabled} />
      <DeleteGroupModal
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
