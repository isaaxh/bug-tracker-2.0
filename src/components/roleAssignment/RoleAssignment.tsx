import { useEffect, useState } from "react";
import style from "./roleAssignment.module.css";
import useFirestore from "../../hooks/useFirestore";
import {
  readAllDocsPropType,
  readMultipleDocsPropsType,
} from "../../hooks/useFirestore";
import { DocumentData } from "firebase/firestore";
import RoleTable from "./roleTable/RoleTable";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import SelectUser from "./SelectUser";

const RoleAssignment = () => {
  const [selectedUsers, setSelectedUsers] = useState<Array<string>>([]);
  // const [selectedRole, setSelectedRole] = useState<Array<string>>([]);
  const [allUserDocs, setAllUserDocs] = useState<DocumentData>([]);
  const [unAssignedUsers, setUnAssignedUsers] = useState<DocumentData>([]);
  const { width } = useWindowDimensions();

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

  return (
    <div className={style.container}>
      <div className={style["title-container"]}>
        {width > 1200 ? (
          <h1 className={style.title}>Manage User Roles</h1>
        ) : null}
      </div>
      <div className={style["content-container"]}>
        {/* <SelectUser */}
        {/*   unAssignedUsers={unAssignedUsers} */}
        {/*   loading={loading} */}
        {/*   selectedUsers={selectedUsers} */}
        {/* /> */}
        <RoleTable allUserDocs={allUserDocs} loading={loading} />
      </div>
    </div>
  );
};

export default RoleAssignment;
