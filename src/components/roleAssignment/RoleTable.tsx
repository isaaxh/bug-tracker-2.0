import style from "./roleAssignment.module.css";
import { docType } from "../../hooks/useFirestore";
import { DocumentData } from "firebase/firestore";
import MoonLoader from "react-spinners/MoonLoader";

interface RoleTablePropsTypes {
  allUserDocs: DocumentData;
  loading: boolean;
}

const RoleTable = ({ allUserDocs, loading }: RoleTablePropsTypes) => {
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
          <caption>
            Your Personnel
            {/* <p>All users in your database</p> */}
          </caption>
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
                <td data-cell='role'>
                  {user.role.admin
                    ? "admin"
                    : user.role.manager
                    ? "manager"
                    : user.role.developer
                    ? "developer"
                    : "unassigned"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RoleTable;
