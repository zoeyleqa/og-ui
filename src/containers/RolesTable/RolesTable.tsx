import React, { useState, useEffect, useRef } from "react";
import { ActionCell } from "./ActionButtonsCell";
import { AddRoleButton } from "./AddRoleButton";
import { BaseTable } from "../BaseTable";
import { Preloader } from "../../components/Preloader";
import { Row, Col } from "react-bootstrap";
import { TableFilter } from "../../components/TableFilter/TableFilter";
import { RestfulProvider } from "restful-react";
import {
  useRouteRolesGet,
  useRouteRolesPost,
  useRouteRolesItemIdPut,
  useRouteRolesItemIdDelete
} from "../../action/actions";
import "./style.css";

export const roleTableHeader = [
  {
    Header: "Role",
    accessor: "name"
  },
  {
    Header: "Description",
    accessor: "description"
  },
  {
    Header: "Pay",
    accessor: "pay"
  }
];

const actionButtons = (
  updateRow: (rowIndex: number, rowValue: any) => void,
  deleteRow: (rowIndex: number) => void
) => ({
  id: "Actions",
  Header: "Actions",
  accessor: "action-buttons",
  disableSortBy: true,
  Cell: ({ row }: { row: any }) => (
    <ActionCell
      rowId={row.id}
      row={row.original}
      editHandler={useRouteRolesItemIdPut}
      updateRow={updateRow}
      deleteHandler={useRouteRolesItemIdDelete}
      deleteRow={deleteRow}
    />
  ),
  sortable: false
});

const RolesDataTable = () => {
  const { data: roleOriginalData, loading } = useRouteRolesGet({});

  const [roleData, setRoleData] = useState<any[] | null>(null);

  useEffect(() => {
    if (!loading) {
      setRoleData(roleOriginalData);
      roleTableHeader.push(actionButtons(updateRole, deleteRole));
    }
  }, [loading]);

  useEffect(() => {
    skipResetRef.current = false;
  }, [roleData]);

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.
  const skipResetRef = useRef(false);

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex and new value to update the original data
  const updateRole = (rowIndex: number, rowValue: any) => {
    // We also turn on the flag to not reset the page
    skipResetRef.current = true;
    setRoleData((old: any[] | null) =>
      !old
        ? old
        : old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...rowValue
              };
            }
            return row;
          })
    );
  };

  const deleteRole = (rowIndex: number) => {
    skipResetRef.current = true;
    setRoleData((old: any[] | null) =>
      !old
        ? old
        : old.filter((_, index) => {
            return index !== rowIndex;
          })
    );
  };

  const addRole = (row: any) => {
    skipResetRef.current = true;
    setRoleData((old: any[] | null) => (!old ? [row] : [...old, row]));
  };

  return !loading && roleData ? (
    <BaseTable
      data={roleData}
      header={roleTableHeader}
      updateMyData={updateRole}
      skipReset={skipResetRef}
      toolComponent={<AddRoleButton addHandler={useRouteRolesPost} addRow={addRole} />}
    />
  ) : (
    <Preloader />
  );
};

const RolesTable = ({ baseUrl }: { baseUrl: string }) => {
  return (
    <RestfulProvider base={baseUrl}>
      <RolesDataTable />
    </RestfulProvider>
  );
};

export { RolesTable };
