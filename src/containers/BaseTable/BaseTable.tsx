import React, { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import { IconAwesome } from "../../components/Icons/IconAwesome";
import "./style.css";

interface BaseTableProps {
  data: object[];
  header: any[];
  updateMyData: (rowIndex: any, rowValue: any) => void;
  skipReset: any;
}

const BaseTable = ({
  data,
  header,
  updateMyData,
  skipReset
}: BaseTableProps) => {
  const columns = useMemo(() => header, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData,
      // We also need to pass this so the page doesn't change
      // when we edit the data.
      autoResetPage: !skipReset,
      autoResetSelectedRows: !skipReset
    },
    useSortBy
  );

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>
                <span {...column.getSortByToggleProps()}>
                  {column.render("Header")}
                  {/* Add a sort direction indicator */}
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <IconAwesome
                        icon="caret-up"
                        style={{ marginLeft: "5px" }}
                      />
                    ) : (
                      <IconAwesome
                        icon="caret-down"
                        style={{ marginLeft: "5px" }}
                      />
                    )
                  ) : (
                    ""
                  )}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export { BaseTable };
