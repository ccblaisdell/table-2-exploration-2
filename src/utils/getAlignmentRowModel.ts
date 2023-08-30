import {
  Column,
  Row,
  RowData,
  RowModel,
  Table,
  getCoreRowModel,
  memo,
} from "@tanstack/react-table";

const getColumnAlignmentProps = (column: Column<any>) => {
  const align = column.columnDef.meta?.align;

  const className =
    align === "center"
      ? "text-center"
      : align === "right"
      ? "text-right"
      : "text-left";

  return { className };
};

export function getAlignmentRowModel<TData extends RowData>(): (
  table: Table<TData>
) => () => RowModel<TData> {
  return (table) =>
    memo(
      () => [table.getFlatHeaders()],
      (
        headers
      ): {
        rows: Row<TData>[];
        flatRows: Row<TData>[];
        rowsById: Record<string, Row<TData>>;
      } => {
        const rowModel = getCoreRowModel()(table as Table<unknown>)();

        headers.forEach((header) => {
          header.getAlignmentProps = () =>
            getColumnAlignmentProps(header.column);
        });

        rowModel.rows.forEach((row) => {
          row.getAllCells().forEach((cell) => {
            cell.getAlignmentProps = () => getColumnAlignmentProps(cell.column);
          });
        });

        return rowModel as RowModel<TData>;
      },
      {
        key: import.meta.env.DEV && "getRowModel",
        debug: () => table.options.debugAll ?? table.options.debugTable,
      }
    );
}
