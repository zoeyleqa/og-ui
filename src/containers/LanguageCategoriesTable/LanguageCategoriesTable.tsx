import React, { useState, useEffect, useRef } from "react";
import { ActionCell } from "./ActionButtonsCell";
import { AddLanguageCategoryButton } from "./AddLanguageCategoryButton";
import { BaseTable } from "../BaseTable";
import { Preloader } from "../../components/Preloader";
import { RestfulProvider } from "restful-react";
import {
  useRouteLanguagecategoriesGet,
  useRouteLanguagecategoriesPost,
  useRouteLanguagecategoriesItemIdDelete
} from "../../action/actions";
import "./style.css";

const languageCategoryTableHeader = [
  {
    Header: "Category",
    accessor: "name"
  },
  {
    Header: "Description",
    accessor: "description"
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
      deleteHandler={useRouteLanguagecategoriesItemIdDelete}
      deleteRow={deleteRow}
    />
  ),
  sortable: false
});

const LanguageCategoriesDataTable = () => {
  const {
    data: languageCategoryOriginalData,
    loading
  } = useRouteLanguagecategoriesGet({});

  const [languageCategoryData, setLanguageCategoryData] = useState<
    any[] | null
  >(null);
  const [header, setHeader] = useState<any[]>(languageCategoryTableHeader);

  useEffect(() => {
    if (!loading) {
      setLanguageCategoryData(languageCategoryOriginalData);
      setHeader(
        languageCategoryTableHeader.concat(
          actionButtons(deleteLanguageCategory)
        )
      );
    }
  }, [loading]);

  useEffect(() => {
    skipResetRef.current = false;
  }, [languageCategoryData]);

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.
  const skipResetRef = useRef(false);

  const deleteLanguageCategory = (rowIndex: number) => {
    skipResetRef.current = true;
    setLanguageCategoryData((old: any[] | null) =>
      !old
        ? old
        : old.filter((_, index) => {
            return index !== rowIndex;
          })
    );
  };

  const addLanguageCategory = (row: any) => {
    skipResetRef.current = true;
    setLanguageCategoryData((old: any[] | null) =>
      !old ? [row] : [...old, row]
    );
  };

  return !loading && languageCategoryData ? (
    <BaseTable
      id="languageCategoriesTable"
      data={languageCategoryData}
      header={header}
      updateMyData={() => {}}
      skipReset={skipResetRef}
      toolComponent={
        <AddLanguageCategoryButton
          addHandler={useRouteLanguagecategoriesPost}
          addRow={addLanguageCategory}
        />
      }
    />
  ) : (
    <Preloader />
  );
};

const LanguageCategoriesTable = ({ baseUrl }: { baseUrl: string }) => {
  return (
    <RestfulProvider base={baseUrl}>
      <LanguageCategoriesDataTable />
    </RestfulProvider>
  );
};

export { LanguageCategoriesTable };
