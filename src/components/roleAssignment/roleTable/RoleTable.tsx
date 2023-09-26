import style from "../roleAssignment.module.css";
import { DocumentData } from "firebase/firestore";
import MoonLoader from "react-spinners/MoonLoader";
import { useEffect, useState } from "react";
import TableHeader from "./TableHeader";
import TableSearchBar from "./TableSearchBar";
import TableContent from "./TableContent";
import TablePagination from "./TablePagination";
import useFirestore, {
  readAllDocsPropType,
  sortingProps,
} from "../../../hooks/useFirestore";

const RoleTable = () => {
  // user documents
  const [allEnteries, setAllEnteries] = useState<DocumentData>([]);
  const { readAllDocs, readMultipleDocs, loading } = useFirestore();

  // table pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = allEnteries.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(allEnteries.length / recordsPerPage);
  const columns = ["displayName", "email", "role", "createdAt"];

  //table sorting
  const [sorting, setSorting] = useState<sortingProps>({
    column: "displayName",
    order: "asc",
  });
  const sortTable = (newSorting: sortingProps) => {
    setSorting(newSorting);
  };

  // table search
  const [searchValue, setSearchValue] = useState("");
  const searchTable = (newSearchValue: string) => {
    setSearchValue(newSearchValue);
  };

  useEffect(() => {
    const allDocsQuery: readAllDocsPropType = {
      collectionName: "users",
      sorting: sorting,
    };

    const fetchAllData = async () => {
      const allUserDocs = await readAllDocs(allDocsQuery);
      setAllEnteries(allUserDocs);
    };

    fetchAllData();
  }, [sorting]);

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
          <>
            <TableSearchBar />
            <table>
              <TableHeader
                columns={columns}
                sorting={sorting}
                sortTable={sortTable}
              />
              <TableContent enteries={records} />
            </table>
          </>
        )}
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      </div>
    </div>
  );
};

export default RoleTable;
