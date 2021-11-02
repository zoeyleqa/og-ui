import React, { useState, useEffect, useRef } from "react";
import { ActionCell } from "./ActionButtonsCell";
import { AddLanguageButton } from "./AddLanguageButton";
import { BaseTable } from "../BaseTable";
import { Preloader } from "../../components/Preloader";
import { RestfulProvider } from "restful-react";
import {
  useRouteLanguagesGet,
  useRouteLanguagesPost,
  useRouteLanguagesItemIdDelete
} from "../../action/actions";
import "./style.css";

const languageTableHeader = [
  {
    Header: "Language",
    accessor: "name"
  },
  {
    Header: "Comment",
    accessor: "comment"
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
      deleteHandler={useRouteLanguagesItemIdDelete}
      deleteRow={deleteRow}
    />
  ),
  sortable: false
});

const LanguagesDataTable = () => {
  const { data: languageOriginalData, loading } = useRouteLanguagesGet({});

  const [languageData, setLanguageData] = useState<any[] | null>(null);
  const [header, setHeader] = useState<any[]>(languageTableHeader);

  useEffect(() => {
    if (!loading) {
      setLanguageData(languageOriginalData);
      setHeader(languageTableHeader.concat(actionButtons(deleteLanguage)));
    }
  }, [loading]);

  useEffect(() => {
    skipResetRef.current = false;
  }, [languageData]);

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.
  const skipResetRef = useRef(false);

  const deleteLanguage = (rowIndex: number) => {
    skipResetRef.current = true;
    setLanguageData((old: any[] | null) =>
      !old
        ? old
        : old.filter((_, index) => {
            return index !== rowIndex;
          })
    );
  };

  const addLanguage = (row: any) => {
    skipResetRef.current = true;
    setLanguageData((old: any[] | null) => (!old ? [row] : [...old, row]));
  };

  return !loading && languageData ? (
    <BaseTable
      id="languagesTable"
      data={languageData}
      header={header}
      updateMyData={() => {}}
      skipReset={skipResetRef}
      toolComponent={
        <AddLanguageButton
          addHandler={useRouteLanguagesPost}
          addRow={addLanguage}
        />
      }
    />
  ) : (
    <Preloader />
  );
};

const LanguagesTable = ({ baseUrl }: { baseUrl: string }) => {
  return (
    <RestfulProvider base={baseUrl}>
      <LanguagesDataTable />
    </RestfulProvider>
  );
};

export { LanguagesTable };
