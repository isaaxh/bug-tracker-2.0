import { SortingProps } from "./RoleTable";
import style from "../roleAssignment.module.css";

interface TableHeaderCellProps {
  column: string;
  sorting: SortingProps;
  sortTable: (newSorting: SortingProps) => void;
}

function TableHeaderCell({ column, sorting, sortTable }: TableHeaderCellProps) {
  const isDescSorting = sorting.column === column && sorting.order === "desc";
  const isAscSorting = sorting.column === column && sorting.order === "asc";
  const futureSortingOrder = isDescSorting ? "asc" : "desc";

  return (
    <th
      key={column}
      className={style["table-header-cell"]}
      onClick={() => sortTable({ column, order: futureSortingOrder })}
    >
      {column}
      {isDescSorting && <span>▼</span>}
      {isAscSorting && <span>▲</span>}
    </th>
  );
}
export default TableHeaderCell;
