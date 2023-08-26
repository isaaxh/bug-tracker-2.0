import style from "./roleAssignment.module.css";
import { docType } from "../../hooks/useFirestore";
import { DocumentData } from "firebase/firestore";
import MoonLoader from "react-spinners/MoonLoader";
import { useEffect } from "react";

interface RoleTablePropsTypes {
  allUserDocs: DocumentData;
  loading: boolean;
}

const RoleTable = ({ allUserDocs, loading }: RoleTablePropsTypes) => {
  useEffect(() => {
    allUserDocs && console.log(allUserDocs);
  }, [allUserDocs]);

  const getRole = (roles: string[]) => {
    if (roles.includes("admin")) return "admin";
    if (roles.includes("manager")) return "manager";
    if (roles.includes("developer")) return "developer";

    return "unassigned";
  };

  return (
    <div className={style["table-wrapper"]}>
      {/* <div className='label-container'>
              <h2>Your Personnel</h2>
              <p>All users in your database</p>
            </div> */}

      {loading && loading ? (
        <MoonLoader
          className={style.spinner}
          loading={loading}
          aria-label='Loading Spinner'
          data-testid='loader'
          size={30}
        />
      ) : (
        <table>
          <caption>Your Personnel</caption>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>

          <tbody>
            {allUserDocs.map((user: docType, index: number) => (
              <tr key={index}>
                <td data-cell='name'>{user.displayName}</td>
                <td data-cell='email'>{user.email}</td>
                <td data-cell='role'>{getRole(user.roles)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RoleTable;
