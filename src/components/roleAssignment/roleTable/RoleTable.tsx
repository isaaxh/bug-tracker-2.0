import style from "../roleAssignment.module.css";
import { DocumentData } from "firebase/firestore";
import MoonLoader from "react-spinners/MoonLoader";
import { useState } from "react";
import TableHeader from "./TableHeader";
import TableContent from "./TableContent";
import TablePagination from "./TablePagination";
import TableSearchBar from "./TableSearchBar";

interface RoleTablePropsTypes {
  allUserDocs: DocumentData;
  loading: boolean;
}

const RoleTable = ({ allUserDocs, loading }: RoleTablePropsTypes) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = allUserDocs.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(allUserDocs.length / recordsPerPage);
  const [sorting, setSorting] = useState({ column: "name", order: "asc" });
  const columns = ["Name", "Email", "Role", "Date"];

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
            <TableSearchBar />
            <table>
              <TableHeader columns={columns} />
              <TableContent enteries={records} />
            </table>
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              prevPage={prevPage}
              nextPage={nextPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleTable;
