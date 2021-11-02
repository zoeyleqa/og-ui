import React, { useState, useEffect, useRef } from "react";
import { ActionCell } from "./ActionButtonsCell";
import { AddExerciseButton } from "./AddExerciseButton";
import { BaseTable } from "../BaseTable";
import { Preloader } from "../../components/Preloader";
import { RestfulProvider } from "restful-react";
import {
  useRouteExercisesGet,
  useRouteExercisesPost,
  useRouteExercisesItemIdDelete
} from "../../action/actions";

const exerciseTableHeader = [
  {
    Header: "Group",
    accessor: "group.name"
  },
  {
    Header: "Exercise",
    accessor: "name"
  },
  {
    Header: "Description",
    accessor: "description"
  },
  {
    Header: "Background Color",
    accessor: "background_color"
  },
  {
    Header: "Text Color",
    accessor: "text_color"
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
      deleteHandler={useRouteExercisesItemIdDelete}
      deleteRow={deleteRow}
    />
  ),
  sortable: false
});

const ExercisesDataTable = () => {
  const { data: exerciseOriginalData, loading } = useRouteExercisesGet({});

  const [exerciseData, setExerciseData] = useState<any[] | null>(null);
  const [header, setHeader] = useState<any[]>(exerciseTableHeader);

  useEffect(() => {
    if (!loading) {
      setExerciseData(exerciseOriginalData);
      setHeader(exerciseTableHeader.concat(actionButtons(deleteExercise)));
    }
  }, [loading]);

  useEffect(() => {
    skipResetRef.current = false;
  }, [exerciseData]);

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.
  const skipResetRef = useRef(false);

  const deleteExercise = (rowIndex: number) => {
    skipResetRef.current = true;
    setExerciseData((old: any[] | null) =>
      !old
        ? old
        : old.filter((_, index) => {
            return index !== rowIndex;
          })
    );
  };

  const addExercise = (row: any) => {
    skipResetRef.current = true;
    setExerciseData((old: any[] | null) => (!old ? [row] : [...old, row]));
  };

  return !loading && exerciseData ? (
    <BaseTable
      id="exercisesTable"
      data={exerciseData}
      header={header}
      updateMyData={() => {}}
      skipReset={skipResetRef}
      toolComponent={
        <AddExerciseButton addHandler={useRouteExercisesPost} addRow={addExercise} />
      }
    />
  ) : (
    <Preloader />
  );
};

const ExercisesTable = ({ baseUrl }: { baseUrl: string }) => {
  return (
    <RestfulProvider base={baseUrl}>
      <ExercisesDataTable />
    </RestfulProvider>
  );
};

export { ExercisesTable };
