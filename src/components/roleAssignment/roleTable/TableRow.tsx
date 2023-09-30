import { useEffect, useState } from "react";
import Popup from "../../common/Popup/Popup";
import { AuthContextType, userDataType } from "../../../contexts/AuthContext";
import { addNewRole, getRole } from "../../../utils/Helpers";
import useFirestore from "../../../hooks/useFirestore";
import useAuth from "../../../hooks/useAuth";

interface TableRowProps {
  userData: userDataType;
}
interface Updates {
  roles: {
    admin?: boolean;
    manager?: boolean;
    developer?: boolean;
    submitter?: boolean;
  };
}

const TableRow = ({ userData }: TableRowProps) => {
  const [popupTrigger, setPopupTrigger] = useState(false);
  const { updateData, loading } = useFirestore();
  const { currentUser } = useAuth() as AuthContextType;
  const collectionName = "users";
  const docId = userData.uid;

  const onRoleSelect = (role: string) => {
    closePopup({ roles: addNewRole(role, userData) });
  };

  const closePopup = (updates: Updates) => {
    if (!currentUser && !updates.roles) return;
    updateData({ collectionName, updates, docId });
    setPopupTrigger(false);
  };

  const togglePopup = (
    e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    setPopupTrigger(!popupTrigger);
  };

  const listItems = [
    { id: "admin", name: "Admin", color: userData.roles.admin ? "green" : "" },
    {
      id: "manager",
      name: "Manager",
      color: userData.roles.manager ? "green" : "",
    },
    {
      id: "developer",
      name: "Developer",
      color: userData.roles.developer ? "green" : "",
    },
    {
      id: "submitter",
      name: "Submitter",
      color: userData.roles.submitter ? "green" : "",
    },
  ];

  return (
    <tr>
      <td data-cell="name">{userData.displayName}</td>
      <td data-cell="email">{userData.email}</td>
      <td data-cell="role" onClick={(e) => togglePopup(e)}>
        <Popup
          popupTrigger={popupTrigger}
          listItems={listItems}
          onRoleSelect={onRoleSelect}
          loading={loading}
        >
          {getRole(userData)}
        </Popup>
      </td>
      <td data-cell="date">{userData.createdAt}</td>
    </tr>
  );
};

export default TableRow;
