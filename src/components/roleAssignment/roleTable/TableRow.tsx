import { useState } from "react";
import Popup from "../../common/Popup/Popup";
import { userDataType } from "../../../contexts/AuthContext";
import { getRole } from "../../../utils/Helpers";

interface TableRowProps {
  userData: userDataType;
}

const TableRow = ({ userData }: TableRowProps) => {
  const [popupTrigger, setPopupTrigger] = useState(false);

  const togglePopup = (
    e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    setPopupTrigger(!popupTrigger);
  };

  const popupContent = (
    <>
      <li>Admin</li>
      <li>Manager</li>
      <li>Developer</li>
      <li>Submitter</li>
    </>
  );

  return (
    <tr>
      <td data-cell="name">{userData.displayName}</td>
      <td data-cell="email">{userData.email}</td>
      <td data-cell="role" onClick={(e) => togglePopup(e)}>
        <Popup popupTrigger={popupTrigger} popupContent={popupContent}>
          {getRole(userData)}
        </Popup>
      </td>
      <td data-cell="date">{userData.createdAt}</td>
    </tr>
  );
};

export default TableRow;
