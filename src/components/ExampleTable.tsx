import { createOpportunity, times } from "../utils";

const data = times(100, createOpportunity);

const columns = [
  {
    accessorKey: "name",
    header: "Name",
    cell: (row) => row.name,
    size: 150,
  },
  {
    accessorKey: "accountId",
    header: "Account ID",
    cell: (row) => row.accountId,
    size: 150,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: (row) => `${row.amountCurrencyCode} ${row.amount}`,
    size: 150,
  },
  {
    accessorKey: "aRR",
    header: "ARR",
    cell: (row) => row.aRR,
    size: 150,
  },
  {
    accessorKey: "closeDate",
    header: "Close Date",
    cell: (row) => row.closeDate.toLocaleString(),
    size: 150,
  },
];

export const ExampleTable = () => {
  return (
    <table className="border-2 text-left text-sm">
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.accessorKey}
              className="border-l-2 p-2"
              style={{ width: column.size }}
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id} className="border-y-2">
            {columns.map((column) => (
              <td key={column.accessorKey} className="border-l-2 px-2 py-1">
                {column.cell(row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
