import {
  RowData,
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  Table,
} from "@tanstack/react-table";
import { Alignment } from "../features/Alignment";
import {
  SpiffColumnHelper,
  SpiffTableOptions,
  SpiffTable,
  SpiffTableFeature,
  SpiffTableHelpers,
} from "../types";

export const createSpiffColumnHelper = <
  TData extends RowData
>(): SpiffColumnHelper<TData> => {
  return createColumnHelper<TData>() as SpiffColumnHelper<TData>;
};

export const useSpiffTable = <TData extends RowData>(
  options: Omit<SpiffTableOptions<TData>, "getCoreRowModel">
) => {
  const table = useReactTable({
    ...options,
    getCoreRowModel: getCoreRowModel(),
  });

  return addSpiffTableFeatures(table);
};

const addSpiffTableFeatures = <TData extends RowData>(
  table: Table<TData>
): SpiffTable<TData> => {
  // Alignment is a default feature, so don't need to check an `enabled` option
  const features = [Alignment];

  return {
    ...table,
    getCellProps: (cell) => reduceFeature("getCellProps", features, cell),
    getHeaderProps: (header) =>
      reduceFeature("getHeaderProps", features, header),
    prepareCell: (cell) => reduceFeature("prepareCell", features, cell),
    prepareHeader: (header) => reduceFeature("prepareHeader", features, header),
    prepareRow: (row) => reduceFeature("prepareRow", features, row),
  };
};

const reduceFeature = (
  hook: keyof SpiffTableHelpers<any>,
  features: SpiffTableFeature[],
  item: any
) => {
  return features.reduce((item, feature) => {
    return feature[hook]?.(item) ?? item;
  }, item);
};
