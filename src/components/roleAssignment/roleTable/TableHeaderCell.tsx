import { sortingProps, tableColumn } from "../../../hooks/useFirestore";

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
      {column}
      {isDescSorting && <span>▼</span>}
      {isAscSorting && <span>▲</span>}
    </th>
  );
}
export default TableHeaderCell;
