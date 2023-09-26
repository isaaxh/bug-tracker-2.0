import TableHeaderCell from "./TableHeaderCell";
import { SortingProps } from "./RoleTable.tsx";

interface TableHeaderProps {
  columns: string[];
  sorting: SortingProps;
  sortTable: (newSorting: SortingProps) => void;
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
