import { useEffect, useState } from "react";
import style from "./roleAssignment.module.css";
import useFirestore from "../../hooks/useFirestore";
import {
  readAllDocsPropType,
  readMultipleDocsPropsType,
  docType,
} from "../../hooks/useFirestore";
import { DocumentData } from "firebase/firestore";
import MoonLoader from "react-spinners/MoonLoader";
import RoleTable from "./RoleTable";

const roles = ["admin", "manager", "developer"];

const RoleAssignment = () => {
  const [selectedUsers, setSelectedUsers] = useState<Array<string>>([]);
  // const [selectedRole, setSelectedRole] = useState<Array<string>>([]);
  const [allUserDocs, setAllUserDocs] = useState<DocumentData>([]);
  const [unAssignedUsers, setUnAssignedUsers] = useState<DocumentData>([]);

  const { readAllDocs, readMultipleDocs, error, loading } = useFirestore();

  useEffect(() => {
    const allDocsQuery: readAllDocsPropType = {
      collectionName: "users",
    };

    const multipleDocsQuery: readMultipleDocsPropsType = {
      collectionName: "users",
      queryObject: {
        field: "roleAssigned",
        operator: "==",
        value: false,
      },
    };

    const fetchAllData = async () => {
      const allUserDocs = await readAllDocs(allDocsQuery);
      setAllUserDocs(allUserDocs);

      const unAssignedUsers = await readMultipleDocs(multipleDocsQuery);
      setUnAssignedUsers(unAssignedUsers);
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    console.log(selectedUsers);
  }, [selectedUsers]);

  const handleUsersSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValues = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    console.log(selectedValues);

    // console.log(selectedValues);
    setSelectedUsers(selectedValues);
  };

  const handleRoleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValues = e.target.options;
    // Array.from(  e.target.selectedOptions,(option) => option.value);

    console.log(e.target);

    // setSelectedRole(selectedValues);
  };

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
          <form action='#' onSubmit={handleSubmitForm} className={style.form}>
            <div className={style["select-user-container"]}>
              <label className={style["user-list-label"]} htmlFor='user-list'>
                Select 1 or more unassigned users
              </label>
              {loading && loading ? (
                <MoonLoader
                  className={style.spinner}
                  loading={loading}
                  aria-label='Loading Spinner'
                  data-testid='loader'
                  size={20}
                />
              ) : (
                <select
                  className={style["user-list"]}
                  name='user-list'
                  id='user-list'
                  multiple
                  size={3}
                  required
                  autoFocus
                  onChange={handleUsersSelectChange}
                >
                  {unAssignedUsers.map((user: docType, index: number) => (
                    <option
                      className={style["select-items"]}
                      key={index}
                      value={user.displayName}
                    >
                      {user.displayName}
                    </option>
                  ))}
                </select>
              )}
              <div>CTRL + Select multiple users</div>
            </div>
            <hr className={style.hr} />
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
                onChange={handleRoleSelectChange}
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
          <RoleTable allUserDocs={allUserDocs} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default RoleAssignment;
