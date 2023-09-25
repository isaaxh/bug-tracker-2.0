interface TableHeaderCellProps {
  column: string;
}

function TableHeaderCell({ column }: TableHeaderCellProps) {
  /* const isDescSorting = sorting.column === column && sorting.order === "desc"; */
  /* const isAscSorting = sorting.column === column && sorting.order === "asc"; */
  /* const futureSortingOrder = isDescSorting ? "asc" : "desc"; */

  return (
    <th key={column} className="table-header-cell">
      {column}
      {/* {isDescSorting && <span>▼</span>} */}
      {/* {isAscSorting && <span>▲</span>} */}
    </th>
  );
}
export default TableHeaderCell;
