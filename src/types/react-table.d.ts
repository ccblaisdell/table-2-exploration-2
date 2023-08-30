import {
  AlignmentCell,
  AlignmentHeader,
  AlignmentColumnDefExtensions,
} from "../features/Alignment";

declare module "@tanstack/table-core" {
  export interface ColumnMeta extends AlignmentColumnDefExtensions {}

  export interface Header extends AlignmentHeader {}

  export interface Cell extends AlignmentCell {}
}
