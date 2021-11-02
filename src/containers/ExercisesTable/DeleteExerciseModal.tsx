import React from "react";
import { ModalDialog } from "../../components/ModalDialog";

interface DeleteModalProps {
  id: string | number;
  rowId: string;
  deleteHandler: any;
  deleteRow: any;
  show: boolean;
  toggleModal: () => void;
}

export const DeleteExerciseModal = ({
  id,
  rowId,
  deleteHandler,
  deleteRow,
  show,
  toggleModal
}: DeleteModalProps) => {
  const { mutate: del, loading } = deleteHandler();

  return (
    <ModalDialog
      title="Delete Exercise"
      show={show}
      toggleShow={toggleModal}
      ctaTitle="Remove"
      ctaBtnType="delete"
      ctaBtnLoading={loading}
      action={() =>
        del(id)
          .then(() => {
            debugger;
            deleteRow(parseInt(rowId));
            toggleModal();
          })
          .catch((e: any) => {
            console.error(e);
            toggleModal();
          })
      }
      content={<p>Are you sure you want to remove this exercise?</p>}
    />
  );
};
