import React, { useState, useEffect, useRef } from "react";
import { ActionCell } from "./ActionButtonsCell";
import { AddAttendeeButton } from "./AddAttendeeButton";
import { BaseTable } from "../BaseTable";
import { Preloader } from "../../components/Preloader";
import { RestfulProvider } from "restful-react";
import {
  useRouteAttendeesGet,
  useRouteAttendeesPost,
  useRouteAttendeesItemIdPut,
  useRouteAttendeesItemIdDelete
} from "../../action/actions";
import { concatData } from "./helpers";

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
    Header: "Middle Name",
    accessor: "middle_name"
  },
  {
    Header: "Nickname",
    accessor: "nick_name"
  },
  {
    Header: "Suffix",
    accessor: "suffix"
  },
  {
    Header: "Gender",
    accessor: "sex"
  },
  {
    Header: "Language",
    accessor: "langs",
    disableSortBy: true,
    Cell: ({ row }: { row: { values: any } }) => {
      return <span>{concatData(row, "langs")}</span>;
    }
  },
  {
    Header: "Language Category",
    accessor: "lang_cats",
    disableSortBy: true,
    Cell: ({ row }: { row: { values: any } }) => {
      return <span>{concatData(row, "lang_cats")}</span>;
    }
  },
  {
    Header: "Role",
    accessor: "roles",
    disableSortBy: true,
    Cell: ({ row }: { row: { values: any } }) => {
      return <span>{concatData(row, "roles")}</span>;
    }
  }
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
      editHandler={useRouteAttendeesItemIdPut}
      updateRow={updateRow}
      deleteHandler={useRouteAttendeesItemIdDelete}
      deleteRow={deleteRow}
    />
  ),
  sortable: false
});

const AttendeesDataTable = () => {
  const { data: attendeeOriginalData, loading } = useRouteAttendeesGet({});

  const [attendeeData, setAttendeeData] = useState<any[] | null>(null);
  const [header, setHeader] = useState<any[]>(attendeeTableHeader);

  useEffect(() => {
    if (!loading) {
      setAttendeeData(attendeeOriginalData);
      setHeader(
        attendeeTableHeader.concat(
          actionButtons(updateAttendee, deleteAttendee)
        )
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
  const updateAttendee = (rowIndex: number, rowValue: any) => {
    // We also turn on the flag to not reset the page
    skipResetRef.current = true;
    setAttendeeData((old: any[] | null) =>
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

  const deleteAttendee = (rowIndex: number) => {
    skipResetRef.current = true;
    setAttendeeData((old: any[] | null) =>
      !old
        ? old
        : old.filter((_, index) => {
            return index !== rowIndex;
          })
    );
  };

  const addAttendee = (row: any) => {
    skipResetRef.current = true;
    setAttendeeData((old: any[] | null) => (!old ? [row] : [...old, row]));
  };

  return !loading && attendeeData ? (
    <BaseTable
      id="attendeesTable"
      data={attendeeData}
      header={header}
      updateMyData={updateAttendee}
      skipReset={skipResetRef}
      toolComponent={
        <AddAttendeeButton
          addHandler={useRouteAttendeesPost}
          addRow={addAttendee}
        />
      }
    />
  ) : (
    <Preloader />
  );
};

const AttendeesTable = ({ baseUrl }: { baseUrl: string }) => {
  return (
    <RestfulProvider base={baseUrl}>
      <AttendeesDataTable />
    </RestfulProvider>
  );
};

export { AttendeesTable };
