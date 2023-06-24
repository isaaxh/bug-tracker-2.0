import { useEffect, useState } from "react";
import style from "./roleAssignment.module.css";
import useFirestore from "../../hooks/useFirestore";
import { readAllDocsPropType, docType } from "../../hooks/useFirestore";
import { DocumentData } from "firebase/firestore";

const roles = ["admin", "manager", "developer"];

const RoleAssignment = () => {
  const [selectedUsers, setSelectedUsers] = useState({});
  const [allUserDocs, setAllUserDocs] = useState<DocumentData>([]);

  const { readAllDocs } = useFirestore();

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValues = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    // console.log(selectedValues);
  };

  useEffect(() => {
    const requestedData: readAllDocsPropType = {
      collectionName: "users",
    };
    const fetchAllData = async () => {
      const allUserDocs = await readAllDocs(requestedData);
      setAllUserDocs(allUserDocs);
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    // console.log(allUserDocs);
  }, [allUserDocs]);

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className={style.container}>
      <div className={style["title-container"]}>
        <h1 className={style.title}>Manage User Roles</h1>
      </div>
      <div className={style["content-container"]}>
        <div className={style["input-container"]}>
          <form action='#' className={style.form}>
            <div className={style["select-user-container"]}>
              <label className={style["user-list-label"]} htmlFor='user-list'>
                Select 1 or more users
              </label>
              <select
                className={style["user-list"]}
                name='user-list'
                id='user-list'
                multiple
                size={3}
                required
                autoFocus
                onChange={handleSelectChange}
              >
                {allUserDocs.map((user: docType, index: number) => (
                  // {console.log(typeof user)}

                  <option
                    className={style["select-items"]}
                    key={index}
                    value={user.displayName}
                  >
                    {user.displayName}
                  </option>
                ))}
              </select>
            </div>
            <hr className={style["hr"]} />
            <div className={style["select-role-container"]}>
              <label className={style["user-list-label"]} htmlFor='role-list'>
                Select the Role to assign
              </label>
              <select
                className={style["role-list"]}
                name='role-list'
                id='role-list'
                required
                autoFocus
                // onChange={handleSelectChange}
              >
                <option disabled value=''>
                  --Choose one please--
                </option>
                {roles.map((role, index) => (
                  <option
                    className={style["select-items"]}
                    key={index}
                    value={role}
                  >
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <button className={style["btn-submit"]}>Submit</button>
          </form>
        </div>
        <div className={style["output-container"]}>
          <div className={style["table-wrapper"]}>
            {/* <div className='label-container'>
              <h2>Your Personnel</h2>
              <p>All users in your database</p>
            </div> */}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleAssignment;
