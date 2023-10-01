import { userDataType } from "../../../contexts/AuthContext";
import TableRow from "./TableRow";

interface TableContentProps {
  entries: userDataType[];
  triggerFetch: () => void;
}

const TableContent = ({ entries, triggerFetch }: TableContentProps) => {
  return (
    <tbody>
      {entries &&
        entries.map((userData: userDataType, index: number) => (
          <TableRow
            key={index}
            userData={userData}
            triggerFetch={triggerFetch}
          />
        ))}
    </tbody>
  );
};

export default TableContent;
