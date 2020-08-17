import React, { useRef, useEffect, useState, useMemo } from "react";
import { orderBy } from "lodash";
import ResizeObserver from "resize-observer-polyfill";
import {
  TableStyled,
  TableHeaderStyled,
  TableRowStyled,
  TableCellStyled,
  TableBodyStyled,
  TableWrapper,
} from "./components";

type Column<RowData> = {
  name: string;
  field: keyof RowData;
  width: number | string;
};

type TableProps<RowData extends object> = {
  columns: Column<RowData>[];
  data: RowData[];
};

const checkScroll = (scrollWidth: number, clientWidth: number) => {
  return scrollWidth > clientWidth;
};

function Table<RowData extends object>({ columns, data }: TableProps<RowData>) {
  const tableRef = useRef<HTMLDivElement | null>(null);

  const [isScrolled, setScroll] = useState<boolean>(false);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [sortFieldName, setSortFieldName] = useState<string>(
    columns[0].field as string
  );

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries: any) => {
      const tableWrapper = entries[0].target;
      setScroll(
        checkScroll(tableWrapper.scrollWidth, tableWrapper.clientWidth)
      );
    });

    if (tableRef.current) {
      setScroll(
        checkScroll(tableRef.current.scrollWidth, tableRef.current.clientWidth)
      );
      resizeObserver.observe(tableRef.current);
    }
  }, []);

  const sorted = useMemo(() => {
    return orderBy(data, sortFieldName, order);
  }, [data, sortFieldName, order]);

  const handleClickOrder = (field: string) => {
    setOrder(field === sortFieldName && order === "asc" ? "desc" : "asc");
    setSortFieldName(field);
  };

  return (
    <TableWrapper ref={tableRef}>
      <TableStyled>
        <TableHeaderStyled>
          <TableRowStyled>
            {columns.map((column, index) => (
              <TableCellStyled
                key={index}
                width={column.width}
                isFixed={index === columns.length - 1 && isScrolled}
                isOrder={column.field === sortFieldName && order}
                onClick={() => handleClickOrder(column.field as string)}
              >
                {column.name}
              </TableCellStyled>
            ))}
          </TableRowStyled>
        </TableHeaderStyled>
        <TableBodyStyled typeName="tbody" duration={550} easing="ease-out">
          {sorted.map((row: RowData) => {
            return (
              <TableRowStyled key={JSON.stringify(row)}>
                {columns.map((column, columnIndex) => (
                  <TableCellStyled
                    key={`${row[column.field]}_${columnIndex}`}
                    width={column.width}
                    isFixed={columnIndex === columns.length - 1 && isScrolled}
                  >
                    {row[column.field]}
                  </TableCellStyled>
                ))}
              </TableRowStyled>
            );
          })}
        </TableBodyStyled>
      </TableStyled>
    </TableWrapper>
  );
}

export default Table;
