import style from "./roleAssignment.module.css";
import { DocumentData } from "firebase/firestore";
import MoonLoader from "react-spinners/MoonLoader";
import { useEffect, useState } from "react";
import { userDataType } from "../../contexts/AuthContext";

interface RoleTablePropsTypes {
  allUserDocs: DocumentData;
  loading: boolean;
}

const RoleTable = ({ allUserDocs, loading }: RoleTablePropsTypes) => {
  const [currentPage, setCurrentPage] = useState(1);
  /* const [records, setRecords] = useState(); */
  const recordsPerPage = 4;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = allUserDocs.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(allUserDocs.length / recordsPerPage);
  const pageNumbers = [...Array(totalPages).keys()].slice(1);

  useEffect(() => {
    allUserDocs && console.log(allUserDocs);
  }, [allUserDocs]);

  useEffect(() => {}, [records]);

  const getRole = (userData: DocumentData) => {
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

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const changeCurrentPage = (newCurrentPage: number) => {
    setCurrentPage(newCurrentPage);
  };

  return (
    <div className={style["output-container"]}>
      <div className={style["table-wrapper"]}>
        {loading && loading ? (
          <MoonLoader
            className={style.spinner}
            loading={loading}
            aria-label="Loading Spinner"
            data-testid="loader"
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
                <th>Date Added</th>
              </tr>
            </thead>

            <tbody>
              {records.map((userData: userDataType, index: number) => (
                <tr key={index}>
                  <td data-cell="name">{userData.displayName}</td>
                  <td data-cell="email">{userData.email}</td>
                  <td data-cell="role">{getRole(userData)}</td>
                  <td data-cell="date-added">{userData.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <nav>
          <ul className={style["table-pagination"]}>
            <li className={style["page-item"]}>
              <a href="#" className={style["page-link"]} onClick={prevPage}>
                prev
              </a>
            </li>
            {pageNumbers.map((number, index) => (
              <li key={index}>
                <a
                  href="#"
                  className={`${style["page-link"]} ${
                    currentPage === number ? style.active : ""
                  }`}
                  onClick={() => changeCurrentPage(number)}
                >
                  {number}
                </a>
              </li>
            ))}
            <li className={style["page-item"]}>
              <a href="#" className={style["page-link"]} onClick={nextPage}>
                next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default RoleTable;
