import { RowData } from "@tanstack/react-table";
import "@tanstack/table-core";
import { AlignColumnDefExtensions } from "../features/align";

declare module "@tanstack/table-core" {
  export interface ColumnMeta<TData extends RowData, TValue>
    extends AlignColumnDefExtensions {}
}
