import { ModalDialog } from "../../components/ModalDialog";

export const DeleteRoleModal = ({
  id,
  rowId,
  deleteHandler,
  deleteRow,
  show,
  toggleModal
}) => {
  const { mutate: del, loading } = deleteHandler({ item_id: id });

  return (
    <ModalDialog
      title="Delete Role"
      show={show}
      toggleShow={toggleModal}
      ctaTitle="Remove"
      ctaBtnType="delete"
      loading={loading}
      action={() =>
        del()
          .then(() => {
            deleteRow(rowId);
            toggleModal();
          })
          .catch((e: any) => {
            console.error(e);
            toggleModal();
          })
      }
      content={<p>Are you sure you want to remove this role?</p>}
    />
  );
};
