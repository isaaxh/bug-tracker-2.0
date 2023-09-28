import { useEffect, useState } from "react";
import Popup from "../../common/Popup/Popup";
import { userDataType } from "../../../contexts/AuthContext";
import { addNewRole, getRole } from "../../../utils/Helpers";

interface TableRowProps {
  userData: userDataType;
}

const TableRow = ({ userData }: TableRowProps) => {
  const [popupTrigger, setPopupTrigger] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  const onRoleSelect = (role: string) => {
    setSelectedRole(role);
    /* console.log(addNewRole(role, userData)); */
  };

  useEffect(() => {
    console.log(userData.roles);
  }, [userData, selectedRole]);

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
        >
          {getRole(userData)}
        </Popup>
      </td>
      <td data-cell="date">{userData.createdAt}</td>
    </tr>
  );
};

export default TableRow;
