import {
  AccessorFn,
  Cell,
  Column,
  ColumnDef,
  DeepKeys,
  DeepValue,
  Header,
  Row,
  RowData,
  Table,
  TableOptions,
} from "@tanstack/react-table";
import { AlignmentColumnDef, AlignmentHeader } from "./features/Alignment";
import { HTMLAttributes } from "react";

export interface SpiffTableOptions<TData extends RowData>
  extends TableOptions<TData> {}

export interface SpiffTableHelpers<TData extends RowData> {
  getCellProps: (
    cell: SpiffCell<TData, unknown>
  ) => HTMLAttributes<HTMLElement>;
  getHeaderProps: (
    header: SpiffHeader<TData, unknown>
  ) => HTMLAttributes<HTMLElement>;
  prepareCell: (cell: Cell<TData, unknown>) => SpiffCell<TData, unknown>;
  prepareHeader: (
    header: Header<TData, unknown>
  ) => SpiffHeader<TData, unknown>;
  prepareRow: (row: Row<TData>) => SpiffRow<TData>;
}

export interface SpiffTable<TData extends RowData>
  extends Table<TData>,
    SpiffTableHelpers<TData> {}

export type SpiffColumnDef<TData extends RowData, TValue = any> = ColumnDef<
  TData,
  TValue
> &
  AlignmentColumnDef;

export interface SpiffColumn<TData extends RowData, TValue = any>
  extends Column<TData, TValue> {
  columnDef: SpiffColumnDef<TData, TValue>;
}

type PropGetter = <T>(...args: T[]) => HTMLAttributes<HTMLElement>;

export interface SpiffHeader<TData extends RowData, TValue = any>
  extends Omit<Header<TData, TValue>, "column">,
    AlignmentHeader<TData, TValue> {
  getProps: PropGetter;
}

export interface SpiffRow<TData extends RowData> extends Row<TData> {}

export interface SpiffCell<TData extends RowData, TValue = any>
  extends Cell<TData, TValue> {
  getProps: PropGetter;
}

export type SpiffColumnHelper<TData extends RowData> = {
  accessor: <
    TAccessor extends AccessorFn<TData> | DeepKeys<TData>,
    TValue extends TAccessor extends AccessorFn<TData, infer TReturn>
      ? TReturn
      : TAccessor extends DeepKeys<TData>
      ? DeepValue<TData, TAccessor>
      : never
  >(
    accessor: TAccessor,
    column: Partial<SpiffColumnDef<TData, TValue>>
  ) => SpiffColumnDef<TData, TValue>;
  // display: (column: SpiffColumnDef<TData>) => SpiffColumnDef<TData, unknown>;
  // group: (column: SpiffColumnDef<TData>) => SpiffColumnDef<TData, unknown>;
};

export interface SpiffTableFeature<TData extends RowData = {}>
  extends Partial<SpiffTableHelpers<TData>> {}
