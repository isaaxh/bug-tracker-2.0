import { userDataType } from "../../../contexts/AuthContext";
import TableRow from "./TableRow";

interface TableContentProps {
  entries: userDataType[];
}

const TableContent = ({ entries }: TableContentProps) => {
  return (
    <tbody>
      {entries &&
        entries.map((userData: userDataType, index: number) => (
          <TableRow key={index} userData={userData} />
        ))}
    </tbody>
  );
};

export default TableContent;
