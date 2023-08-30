import { RowData } from "@tanstack/react-table";
import { SpiffColumn, SpiffTableFeature } from "../types";
import { HTMLAttributes } from "react";

export type AlignmentColumnDef = {
  align?: "left" | "center" | "right";
};

type AlignmentPropGetter = () => HTMLAttributes<HTMLElement>;

export interface AlignmentHeader<TData extends RowData, TValue = any> {
  align?: "left" | "center" | "right";
  column: SpiffColumn<TData, TValue>;
  getHeaderProps: AlignmentPropGetter;
}

const getColumnAlignmentProps = (column: SpiffColumn<any>) => {
  const align = column.columnDef.align;

  const className =
    align === "center"
      ? "text-center"
      : align === "right"
      ? "text-right"
      : "text-left";

  return { className };
};

export const Alignment: SpiffTableFeature = {
  getCellProps: (cell) => {
    const { className } = getColumnAlignmentProps(cell.column);
    return {
      className: ["border-l-2", "px-2", "py-1", className].join(" "),
    };
  },
  getHeaderProps: (header) => {
    const { className } = getColumnAlignmentProps(header.column);
    return {
      className: ["border-l-2", "p-2", className].join(" "),
      style: { width: header.getSize() },
    };
  },
};
