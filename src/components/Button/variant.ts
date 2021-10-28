type btnOpt = {
  label: string;
  variant: string;
  awesomeIcon: string;
  loadingText: string;
};

type variant = {
  [key: string]: btnOpt;
};

var obj: variant = {
  add: {
    label: "Add",
    variant: "outline-green",
    awesomeIcon: "plus",
    loadingText: "Adding..."
  },
  delete: {
    label: "Delete",
    variant: "outline-danger",
    awesomeIcon: "trash",
    loadingText: "Deleting..."
  },
  save: {
    label: "Save Changes",
    variant: "success",
    awesomeIcon: "",
    loadingText: "Saving..."
  },
  edit: {
    label: "Edit",
    variant: "outline-neutral",
    awesomeIcon: "pencil-alt",
    loadingText: "Editing..."
  },
  cancel: {
    label: "Cancel",
    variant: "secondary",
    awesomeIcon: "",
    loadingText: ""
  },
  loader: {
    label: "",
    variant: "info",
    awesomeIcon: "",
    loadingText: "Loading..."
  }
};

export default obj;
