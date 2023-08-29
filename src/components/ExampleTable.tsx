import { Opportunity, createOpportunity, times } from "../utils";
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
  columnHelper.accessor("amount", {}),
  columnHelper.accessor("aRR", {}),
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
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="border-l-2 p-2"
                style={{ width: header.getSize() }}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="border-y-2">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="border-l-2 px-2 py-1">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
