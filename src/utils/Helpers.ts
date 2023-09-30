import { DocumentData } from "firebase/firestore";
import { userDataType } from "../contexts/AuthContext";

export const formatDate = (date: Date) => {
  return date
    .toLocaleDateString("en-us", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    })
    .toString();
};

export const getRole = (userData: DocumentData) => {
  if (userData.roles.admin) {
    return "admin";
  } else if (userData.roles.manager) {
    return "manager";
  } else if (userData.roles.developer) {
    return "developer";
  } else {
    return "submitter";
  }
};

export const addNewRole = (
  newRole: string,
  userData: DocumentData,
): userDataType => {
  const updatedUserData = { ...userData };

  if (updatedUserData.roles[newRole]) {
    delete updatedUserData.roles[newRole];
  } else {
    updatedUserData.roles[newRole] = true;
  }
  return updatedUserData as userDataType;
};
