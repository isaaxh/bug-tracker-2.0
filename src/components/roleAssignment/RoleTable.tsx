import style from "./roleAssignment.module.css";
import { DocumentData } from "firebase/firestore";
import MoonLoader from "react-spinners/MoonLoader";
import { useEffect } from "react";
import { userDataType } from "../../contexts/AuthContext";

interface RoleTablePropsTypes {
  allUserDocs: DocumentData;
  loading: boolean;
}

const RoleTable = ({ allUserDocs, loading }: RoleTablePropsTypes) => {
  useEffect(() => {
    allUserDocs && console.log(allUserDocs);
  }, [allUserDocs]);

  const getRole = (userData: DocumentData) => {
    if (userData.roles.admin) {
      return "admin";
    } else if (userData.roles.manager) {
      return "manager";
    } else if (userData.roles.developer) {
      return "developer";
    } else {
        return 'unassigned';
    }
  }


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
            {allUserDocs.map((userData: userDataType, index: number) => (
              <tr key={index}>
                <td data-cell='name'>{userData.displayName}</td>
                <td data-cell='email'>{userData.email}</td>
                <td data-cell='role'>{getRole(userData)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RoleTable;
