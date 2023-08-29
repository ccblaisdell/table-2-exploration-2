import { Cell, Header, RowData } from "@tanstack/react-table";

export interface AlignColumnDefExtensions {
  align?: "left" | "center" | "right";
}

const getCellAlignClassName = (align: AlignColumnDefExtensions["align"]) => {
  switch (align) {
    case "left":
      return "text-left";
    case "center":
      return "text-center";
    case "right":
      return "text-right";
    default:
      return "";
  }
};

export const getCellAlignProps = <TData extends RowData, TValue>({
  column,
}: Cell<TData, TValue> | Header<TData, TValue>) => {
  if (!column.columnDef.meta?.align) return {};

  return {
    className: getCellAlignClassName(column.columnDef.meta.align),
  };
};
