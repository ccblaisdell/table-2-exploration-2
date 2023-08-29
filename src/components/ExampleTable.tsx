import { getCellAlignProps } from "../features/align";
import { Opportunity, createOpportunity, mergeProps, times } from "../utils";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const data = times(100, createOpportunity);

const columnHelper = createColumnHelper<Opportunity>();

const columns = [
  columnHelper.accessor("name", {}),
  columnHelper.accessor("accountId", {}),
  columnHelper.accessor("amount", {
    meta: { align: "right" },
  }),
  columnHelper.accessor("aRR", {
    meta: { align: "right" },
  }),
  columnHelper.accessor("isClosed", {
    meta: { align: "center" },
  }),
  columnHelper.accessor("isWon", {
    meta: { align: "center" },
  }),
];

export const ExampleTable = () => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="border-2 text-left text-sm">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const props = mergeProps(
                {
                  className: "border-l-2 p-2",
                  style: { width: header.getSize() },
                },
                getCellAlignProps(header)
              );
              return (
                <th key={header.id} {...props}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="border-y-2">
            {row.getVisibleCells().map((cell) => {
              const props = mergeProps(
                {
                  key: cell.id,
                  className: "border-l-2 px-2 py-1",
                },
                getCellAlignProps(cell)
              );
              return (
                <td key={cell.id} {...props}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
