import { DocumentData } from "firebase/firestore";

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

export const addNewRole = (newRole: string, userData: DocumentData) => {
  const updatedUserRoles = { ...userData.roles };

  if (updatedUserRoles[newRole]) {
    delete updatedUserRoles[newRole];
  } else {
    updatedUserRoles[newRole] = true;
  }
  return updatedUserRoles;
};
