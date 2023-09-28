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
  switch (newRole) {
    case "admin":
      return {
        ...userData,
        roles: { ...userData.roles, admin: true },
      };
    case "manager":
      return {
        ...userData,
        roles: { manager: true },
      };
    case "developer":
      return { ...userData, roles: { developer: true } };
    default:
      return { ...userData, roles: { submitter: true } };
  }
};
