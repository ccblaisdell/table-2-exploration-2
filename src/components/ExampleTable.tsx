import { createSpiffColumnHelper, flexRender, useSpiffTable } from "../table";
import { Opportunity, createOpportunity, times } from "../utils";

const data = times(100, createOpportunity);

const columnHelper = createSpiffColumnHelper<Opportunity>();

const columns = [
  columnHelper.accessor("name", {}),
  columnHelper.accessor("accountId", {}),
  columnHelper.accessor("amount", { align: "right" }),
  columnHelper.accessor("isClosed", { align: "center" }),
  columnHelper.accessor("isWon", { align: "center" }),
  columnHelper.accessor("aRR", { align: "right" }),
];

export const ExampleTable = () => {
  const table = useSpiffTable({
    columns,
    data,
  });

  return (
    <table className="border-2 text-left text-sm">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const spiffHeader = table.prepareHeader(header);

              return (
                <th key={spiffHeader.id} {...table.getHeaderProps(spiffHeader)}>
                  {flexRender(
                    spiffHeader.column.columnDef.header,
                    spiffHeader.getContext()
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
              const spiffCell = table.prepareCell(cell);

              return (
                <td key={spiffCell.id} {...table.getCellProps(spiffCell)}>
                  {flexRender(
                    spiffCell.column.columnDef.cell,
                    spiffCell.getContext()
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
