import style from "./roleAssignment.module.css";
import { DocumentData } from "firebase/firestore";
import MoonLoader from "react-spinners/MoonLoader";
import { useCallback, useEffect, useState } from "react";
import { userDataType } from "../../contexts/AuthContext";

interface RoleTablePropsTypes {
  allUserDocs: DocumentData;
  loading: boolean;
}

interface SortDataProps {
  tableData: userDataType[];
  sortKey: SortKeysType;
  reverse: SortOrderType;
}

type SortKeysType = "name" | "email" | "role" | "date";
type SortOrderType = "asc" | "desc";

function sortData({ tableData, sortKey, reverse }: SortDataProps) {}

const RoleTable = ({ allUserDocs, loading }: RoleTablePropsTypes) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = allUserDocs.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(allUserDocs.length / recordsPerPage);
  const [sortKeys, setSortKeys] = useState<SortKeysType>("name");
  const [sortOrder, setOrder] = useState<SortOrderType>("asc");

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

  /* const sortedData = useCallback( */
  /*   () => */
  /*     sortData({ tableData: data, sortKeys, reverse: sortOrder === "desc" }), */
  /*   [data, sortKeys, sortOrder], */
  /* ); */

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
          <div>
            <div className={style["table-header"]}>
              <h2>All Users</h2>
              <div className={style["search-container"]}>
                <input placeholder="Search users" />
                <button type="button">Search</button>
              </div>
            </div>
            <table>
              {/* <caption>Users</caption> */}
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {records.map((userData: userDataType, index: number) => (
                  <tr key={index}>
                    <td data-cell="name">{userData.displayName}</td>
                    <td data-cell="email">{userData.email}</td>
                    <td data-cell="role">{getRole(userData)}</td>
                    <td data-cell="date">{userData.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <nav className={style["pagination-wrapper"]}>
          <div className={style["page-numbers"]}>
            {currentPage} of {totalPages} {totalPages > 1 ? "pages" : "page"}.
          </div>
          <ul className={style["table-pagination"]}>
            <li className={style["page-item"]}>
              <a href="#" className={style["page-link"]} onClick={prevPage}>
                prev
              </a>
            </li>
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
