import React, { useState, useEffect, useRef } from "react";
import { ActionCell } from "./ActionButtonsCell";
import { AddUserButton } from "./AddUserButton";
import { BaseTable } from "../BaseTable";
import { Preloader } from "../../components/Preloader";
import { RestfulProvider } from "restful-react";
import {
  useGetAllUsersGet,
  useCreateUsersPost,
  useRouteUsersItemIdPut,
  useRouteUsersItemIdDelete
} from "../../action/actions";
import { concatData } from "./helpers";
import { IconAwesome } from "../../components/Icons/IconAwesome";

const attendeeTableHeader = [
  {
    Header: "First Name",
    accessor: "first_name"
  },
  {
    Header: "Last Name",
    accessor: "last_name"
  },
  {
    Header: "Username",
    accessor: "username"
  },
  {
    Header: "Email",
    accessor: "email"
  },
  {
    Header: "Admin",
    accessor: "admin",
    Cell: ({ row }: { row: { values: any } }) => {
      return (
        <span className="user-admin-icon">
          {row.values.admin ? <IconAwesome icon="check" /> : null}
        </span>
      );
    }
  },
  {
    Header: "Exercise Access",
    accessor: "user_exercises",
    disableSortBy: true,
    Cell: ({ row }: { row: { values: any } }) => {
      return <span>{concatData(row, "user_exercises")}</span>;
    }
  }
  // {
  //   Header: "Language Category",
  //   accessor: "lang_cats",
  //   disableSortBy: true,
  //   Cell: ({ row }: { row: { values: any } }) => {
  //     return <span>{concatData(row, "lang_cats")}</span>;
  //   }
  // }
];

const actionButtons = (
  updateRow: (rowIndex: number, rowValue: any) => void,
  deleteRow: (rowIndex: number) => void
) => ({
  id: "Actions",
  Header: "",
  accessor: "action-buttons",
  disableSortBy: true,
  Cell: ({ row }: { row: any }) => (
    <ActionCell
      rowId={row.id}
      row={row.original}
      editHandler={useRouteUsersItemIdPut}
      updateRow={updateRow}
      deleteHandler={useRouteUsersItemIdDelete}
      deleteRow={deleteRow}
    />
  ),
  sortable: false
});

const UserDataTable = () => {
  const { data: attendeeOriginalData, loading } = useGetAllUsersGet({});

  const [attendeeData, setUserData] = useState<any[] | null>(null);
  const [header, setHeader] = useState<any[]>(attendeeTableHeader);

  useEffect(() => {
    if (!loading) {
      setUserData(attendeeOriginalData);
      setHeader(
        attendeeTableHeader.concat(actionButtons(updateUser, deleteUser))
      );
    }
  }, [loading]);

  useEffect(() => {
    skipResetRef.current = false;
  }, [attendeeData]);

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.
  const skipResetRef = useRef(false);

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex and new value to update the original data
  const updateUser = (rowIndex: number, rowValue: any) => {
    // We also turn on the flag to not reset the page
    skipResetRef.current = true;
    setUserData((old: any[] | null) =>
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

  const deleteUser = (rowIndex: number) => {
    skipResetRef.current = true;
    setUserData((old: any[] | null) =>
      !old
        ? old
        : old.filter((_, index) => {
            return index !== rowIndex;
          })
    );
  };

  const addUser = (row: any) => {
    skipResetRef.current = true;
    setUserData((old: any[] | null) => (!old ? [row] : [...old, row]));
  };

  return !loading && attendeeData ? (
    <BaseTable
      id="attendeesTable"
      data={attendeeData}
      header={header}
      updateMyData={updateUser}
      skipReset={skipResetRef}
      toolComponent={
        <AddUserButton addHandler={useCreateUsersPost} addRow={addUser} />
      }
    />
  ) : (
    <Preloader />
  );
};

const UserTable = ({ baseUrl }: { baseUrl: string }) => {
  return (
    <RestfulProvider base={baseUrl}>
      <UserDataTable />
    </RestfulProvider>
  );
};

export { UserTable };
