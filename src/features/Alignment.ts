import { HTMLAttributes } from "react";

export interface AlignmentColumnDefExtensions {
  align?: "left" | "center" | "right";
}

export interface AlignmentCell {
  getAlignmentProps?: () => HTMLAttributes<HTMLElement>;
}

export interface AlignmentHeader {
  getAlignmentProps?: () => HTMLAttributes<HTMLElement>;
}
