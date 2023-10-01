import TableHeaderCell from "./TableHeaderCell";
import { sortingProps } from "../../../hooks/useFirestore";

interface TableHeaderProps {
  columns: string[];
  sorting: sortingProps;
  sortTable: (newSorting: sortingProps) => void;
}
const TableHeader = ({ columns, sorting, sortTable }: TableHeaderProps) => {
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <TableHeaderCell
            key={column}
            column={column}
            sorting={sorting}
            sortTable={sortTable}
          />
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
