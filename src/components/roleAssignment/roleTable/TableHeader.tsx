import TableHeaderCell from "./TableHeaderCell";

interface TableHeaderProps {
  columns: string[];
}
const TableHeader = ({ columns }: TableHeaderProps) => {
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <TableHeaderCell key={column} column={column} />
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
