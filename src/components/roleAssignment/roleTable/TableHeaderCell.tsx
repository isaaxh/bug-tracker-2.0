import { sortingProps, tableColumn } from "../../../hooks/useFirestore";
import { GoChevronDown } from "react-icons/go";
import { GoChevronUp } from "react-icons/go";
import style from "../roleAssignment.module.css";

interface TableHeaderCellProps {
  column: tableColumn;
  sorting: sortingProps;
  sortTable: (newSorting: sortingProps) => void;
}

function TableHeaderCell({ column, sorting, sortTable }: TableHeaderCellProps) {
  const isDescSorting = sorting.column === column && sorting.order === "desc";
  const isAscSorting = sorting.column === column && sorting.order === "asc";
  const futureSortingOrder = isDescSorting ? "asc" : "desc";

  return (
    <th onClick={() => sortTable({ column, order: futureSortingOrder })}>
      <span className={style["table-header-cell"]}>
        {column}
        {isDescSorting && (
          <span>
            <GoChevronUp />
          </span>
        )}
        {isAscSorting && (
          <span>
            <GoChevronDown />
          </span>
        )}
      </span>
    </th>
  );
}
export default TableHeaderCell;
