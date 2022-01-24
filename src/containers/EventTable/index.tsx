import React, { useState, useEffect, useRef } from "react";
import { ActionCell } from "./ActionButtonsCell";
import { AddEventButton } from "./AddEventButton";
import { BaseTable } from "../BaseTable";
import { Preloader } from "../../components/Preloader";
import { RestfulProvider } from "restful-react";
import {
  useRouteEventsGet,
  useRouteEventsPost,
  useRouteEventsItemIdDelete
} from "../../action/actions";

const eventTableHeader = [
  {
    Header: "Exercise",
    accessor: "event_exercise.name"
  },
  {
    Header: "Event",
    accessor: "name"
  },
  {
    Header: "Open Date",
    accessor: "open_at"
  },
  {
    Header: "Infil Suspense Date",
    accessor: "infil_suspend_at"
  },
  {
    Header: "Final Suspense Date",
    accessor: "final_suspend_at"
  },
  {
    Header: "PO Suspense Date",
    accessor: "po_suspend_at"
  },
  {
    Header: "Start Date",
    accessor: "start"
  },
  {
    Header: "End Date",
    accessor: "end"
  },
  {
    Header: "Exfil Suspense Date",
    accessor: "exfil_suspend_at"
  },
  {
    Header: "Override Dates",
    accessor: "allow_override_dates"
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
      deleteHandler={useRouteEventsItemIdDelete}
      deleteRow={deleteRow}
    />
  ),
  sortable: false
});

const EventDataTable = () => {
  const { data: eventOriginalData, loading } = useRouteEventsGet({});

  const [eventData, setEventData] = useState<any[] | null>(null);
  const [header, setHeader] = useState<any[]>(eventTableHeader);

  useEffect(() => {
    if (!loading) {
      setEventData(eventOriginalData);
      setHeader(eventTableHeader.concat(actionButtons(deleteEvent)));
    }
  }, [loading]);

  useEffect(() => {
    skipResetRef.current = false;
  }, [eventData]);

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.
  const skipResetRef = useRef(false);

  const deleteEvent = (rowIndex: number) => {
    skipResetRef.current = true;
    setEventData((old: any[] | null) =>
      !old
        ? old
        : old.filter((_, index) => {
            return index !== rowIndex;
          })
    );
  };

  const addEvent = (row: any) => {
    skipResetRef.current = true;
    setEventData((old: any[] | null) => (!old ? [row] : [...old, row]));
  };

  return !loading && eventData ? (
    <BaseTable
      id="eventsTable"
      data={eventData}
      header={header}
      updateMyData={() => {}}
      skipReset={skipResetRef}
      toolComponent={
        <AddEventButton addHandler={useRouteEventsPost} addRow={addEvent} />
      }
    />
  ) : (
    <Preloader />
  );
};

const EventTable = ({ baseUrl }: { baseUrl: string }) => {
  return (
    <RestfulProvider base={baseUrl}>
      <EventDataTable />
    </RestfulProvider>
  );
};

export { EventTable };
