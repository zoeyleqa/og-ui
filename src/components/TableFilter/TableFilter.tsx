import React from "react";
import { useAsyncDebounce } from "react-table";
import "./style.css";

interface FilterProps {
  preGlobalFilteredRows: Object[];
  globalFilter: any;
  setGlobalFilter: (value: any) => void;
}

export const TableFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter
}: FilterProps) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <>
      <span className="text-label">Search:</span>{" "}
      <input
        className="blank-line"
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`in ${count} records...`}
      />
    </>
  );
};
