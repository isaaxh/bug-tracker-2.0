import React from "react";
import { userDataType } from "../../../contexts/AuthContext";
import { getRole } from "../../../utils/Helpers";

interface TableContentProps {
  enteries: userDataType[];
}

const TableContent = ({ enteries }: TableContentProps) => {
  return (
    <tbody>
      {enteries.map((userData: userDataType, index: number) => (
        <tr key={index}>
          <td data-cell="name">{userData.displayName}</td>
          <td data-cell="email">{userData.email}</td>
          <td data-cell="role">{getRole(userData)}</td>
          <td data-cell="date">{userData.createdAt}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableContent;
