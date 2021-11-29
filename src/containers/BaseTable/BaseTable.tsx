import React, { ReactComponentElement, useMemo } from "react";
import {
  useGlobalFilter,
  useTable,
  useSortBy,
  useGroupBy,
  useExpanded
} from "react-table";
import { Row, Col } from "react-bootstrap";
import { TableFilter } from "../../components/TableFilter/TableFilter";
import { IconAwesome } from "../../components/Icons/IconAwesome";
import "./style.css";

interface BaseTableProps {
  id: string;
  data: object[];
  header: any[];
  updateMyData: (rowIndex: any, rowValue: any) => void;
  skipReset: any;
  toolComponent: ReactComponentElement<any>;
}

const BaseTable = ({
  id,
  data,
  header,
  updateMyData,
  skipReset,
  toolComponent
}: BaseTableProps) => {
  const columns = useMemo(() => header, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { groupBy, expanded },
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
    useGlobalFilter,
    useGroupBy,
    useSortBy,
    useExpanded
  );

  return (
    <>
      <Row className="mb-3">
        <Col xs={6}>
          <TableFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </Col>
        <Col xs={6} className="content-float-right">
          {toolComponent}
        </Col>
      </Row>
      <table {...getTableProps()} id={id} className="base-table">
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
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export { BaseTable };
