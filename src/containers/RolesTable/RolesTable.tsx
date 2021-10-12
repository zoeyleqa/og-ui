import React, { useState, useEffect, useRef } from "react";
import { ActionCell } from "./ActionButtonsCell";
import { BaseTable } from "../BaseTable";
import { RestfulProvider } from "restful-react";
import {
  useRouteRolesGet,
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

const actionButtons = (updateRow: (rowIndex: any, rowValue: any) => void) => ({
  id: "Actions",
  Header: "Actions",
  accessor: "action-buttons",
  Cell: ({ row }: { row: any }) => (
    <ActionCell
      rowId={row.id}
      row={row.original}
      editHandler={useRouteRolesItemIdPut}
      updateRow={updateRow}
      deleteHandler={useRouteRolesItemIdDelete}
    />
  ),
  sortable: false
});

const RolesDataTable = () => {
  const { data: roleOriginalData, loading } = useRouteRolesGet({});

  const [roleData, setRoleData] = useState<any[] | null>(null);

  useEffect(() => {
    if (!loading) setRoleData(roleOriginalData);
  }, [loading]);

  useEffect(() => {
    skipResetRef.current = false;
  }, [roleData]);

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.
  const skipResetRef = useRef(false);

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex and new value to update the original data
  const updateData = (rowIndex: any, rowValue: any) => {
    // We also turn on the flag to not reset the page
    skipResetRef.current = true;
    setRoleData((old: any[] | null) =>
      !old
        ? old
        : old.map((row, index) => {
            if (index === parseInt(rowIndex)) {
              console.log("index " + index);
              console.log("rowid " + rowIndex);
              return {
                ...rowValue
              };
            }
            return row;
          })
    );
  };

  if (!loading && roleData) {
    roleTableHeader.push(actionButtons(updateData));

    return (
      <BaseTable
        data={roleData}
        header={roleTableHeader}
        updateMyData={updateData}
        skipReset={skipResetRef}
      />
    );
  }

  return <h1>Loading...</h1>;
};

const RolesTable = ({ baseUrl }: { baseUrl: string }) => {
  return (
    <RestfulProvider base={baseUrl}>
      <RolesDataTable />
    </RestfulProvider>
  );
};

export { RolesTable };
