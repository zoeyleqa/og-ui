import React, { useState, useEffect, useRef } from "react";
import { ActionCell } from "./ActionButtonsCell";
import { AddSiteButton } from "./AddSiteButton";
import { BaseTable } from "../BaseTable";
import { Preloader } from "../../components/Preloader";
import { RestfulProvider } from "restful-react";
import {
  useRouteSitesGet,
  useRouteSitesPost,
  useRouteSitesItemIdDelete
} from "../../action/actions";

const siteTableHeader = [
  {
    Header: "Site",
    accessor: "name"
  },
  {
    Header: "Description",
    accessor: "description"
  },
  {
    Header: "Country",
    accessor: "country"
  },
  {
    Header: "City",
    accessor: "city"
  },
  {
    Header: "State",
    accessor: "state"
  },
  {
    Header: "Latitude Degree",
    accessor: "latitude"
  },
  {
    Header: "Latitude Minute",
    accessor: "latitude_min"
  },
  {
    Header: "Latitude Second",
    accessor: "latitude_sec"
  },
  {
    Header: "Longitude",
    accessor: "longitude"
  },
  {
    Header: "Longitude Minute",
    accessor: "longitude_min"
  },
  {
    Header: "Longitude Second",
    accessor: "longitude_sec"
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
      deleteHandler={useRouteSitesItemIdDelete}
      deleteRow={deleteRow}
    />
  ),
  sortable: false
});

const SitesDataTable = () => {
  const { data: siteOriginalData, loading } = useRouteSitesGet({});

  const [siteData, setSiteData] = useState<any[] | null>(null);
  const [header, setHeader] = useState<any[]>(siteTableHeader);

  useEffect(() => {
    if (!loading) {
      setSiteData(siteOriginalData);
      setHeader(siteTableHeader.concat(actionButtons(deleteSite)));
    }
  }, [loading]);

  useEffect(() => {
    skipResetRef.current = false;
  }, [siteData]);

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.
  const skipResetRef = useRef(false);

  const deleteSite = (rowIndex: number) => {
    skipResetRef.current = true;
    setSiteData((old: any[] | null) =>
      !old
        ? old
        : old.filter((_, index) => {
            return index !== rowIndex;
          })
    );
  };

  const addSite = (row: any) => {
    skipResetRef.current = true;
    setSiteData((old: any[] | null) => (!old ? [row] : [...old, row]));
  };

  return !loading && siteData ? (
    <BaseTable
      id="sitesTable"
      data={siteData}
      header={header}
      updateMyData={() => {}}
      skipReset={skipResetRef}
      toolComponent={
        <AddSiteButton addHandler={useRouteSitesPost} addRow={addSite} />
      }
    />
  ) : (
    <Preloader />
  );
};

const SitesTable = ({ baseUrl }: { baseUrl: string }) => {
  return (
    <RestfulProvider base={baseUrl}>
      <SitesDataTable />
    </RestfulProvider>
  );
};

export { SitesTable };
