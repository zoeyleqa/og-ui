import React, { useState, useEffect, useRef } from "react";
import { ActionCell } from "./ActionButtonsCell";
import { AddGroupButton } from "./AddGroupButton";
import { BaseTable } from "../BaseTable";
import { Preloader } from "../../components/Preloader";
import { RestfulProvider } from "restful-react";
import {
  useRouteGroupsGet,
  useRouteGroupsPost,
  useRouteGroupsItemIdDelete
} from "../../action/actions";

const groupTableHeader = [
  {
    Header: "Group",
    accessor: "name"
  },
  {
    Header: "Unit",
    accessor: "unit"
  },
  {
    Header: "Lead 1",
    accessor: "lead_one"
  },
  {
    Header: "Lead 2",
    accessor: "lead_two"
  }
];

const actionButtons = (deleteRow: (rowIndex: number) => void) => ({
  id: "Actions",
  Header: "",
  accessor: "action-buttons",
  disableSortBy: true,
  Cell: ({ row }: { row: any }) => (
    <ActionCell
      rowId={row.id}
      row={row.original}
      deleteHandler={useRouteGroupsItemIdDelete}
      deleteRow={deleteRow}
    />
  ),
  sortable: false
});

const GroupDataTable = () => {
  const { data: groupOriginalData, loading } = useRouteGroupsGet({});

  const [groupData, setGroupData] = useState<any[] | null>(null);
  const [header, setHeader] = useState<any[]>(groupTableHeader);

  useEffect(() => {
    if (!loading) {
      setGroupData(groupOriginalData);
      setHeader(groupTableHeader.concat(actionButtons(deleteGroup)));
    }
  }, [loading]);

  useEffect(() => {
    skipResetRef.current = false;
  }, [groupData]);

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.
  const skipResetRef = useRef(false);

  const deleteGroup = (rowIndex: number) => {
    skipResetRef.current = true;
    setGroupData((old: any[] | null) =>
      !old
        ? old
        : old.filter((_, index) => {
            return index !== rowIndex;
          })
    );
  };

  const addGroup = (row: any) => {
    skipResetRef.current = true;
    setGroupData((old: any[] | null) => (!old ? [row] : [...old, row]));
  };

  return !loading && groupData ? (
    <BaseTable
      id="groupsTable"
      data={groupData}
      header={header}
      updateMyData={() => {}}
      skipReset={skipResetRef}
      toolComponent={
        <AddGroupButton addHandler={useRouteGroupsPost} addRow={addGroup} />
      }
    />
  ) : (
    <Preloader />
  );
};

const GroupTable = ({ baseUrl }: { baseUrl: string }) => {
  return (
    <RestfulProvider base={baseUrl}>
      <GroupDataTable />
    </RestfulProvider>
  );
};

export { GroupTable };
