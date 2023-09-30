import style from "../roleAssignment.module.css";
import { DocumentData } from "firebase/firestore";
import MoonLoader from "react-spinners/MoonLoader";
import { useEffect, useState } from "react";
import TableHeader from "./TableHeader";
import TableSearchBar from "./TableSearchBar";
import TableContent from "./TableContent";
import TablePagination from "./TablePagination";
import useFirestore, {
  filterProps,
  readAllDocsPropType,
  sortingProps,
  tableColumn,
} from "../../../hooks/useFirestore";

const RoleTable = () => {
  // user documents
  const [allEnteries, setAllEnteries] = useState<DocumentData>([]);
  const { readAllDocs } = useFirestore();
  const [fetch, setFetch] = useState(false);
  const loading = false;

  // table pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = allEnteries.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(allEnteries.length / recordsPerPage);

  //table sorting
  const columns: string[] = ["displayName", "email", "roles", "createdAt"];
  const [sorting, setSorting] = useState<sortingProps>({
    column: "displayName",
    order: "asc",
  });
  const sortTable = (newSorting: sortingProps) => {
    setSorting(newSorting);
  };

  // table search
  const [filter, setFilter] = useState<filterProps>({
    column: "displayName",
    value: "",
  });
  const searchTable = (newSearchValue: string) => {
    setFilter({ ...filter, value: newSearchValue });
  };

  // fetching data on trigger
  const triggerFetch = () => {
    setFetch((fetch) => !fetch);
  };

  useEffect(() => {
    const allDocsQuery: readAllDocsPropType = {
      collectionName: "users",
      sorting: sorting,
      filter: filter,
    };

    const fetchAllData = async () => {
      const allUserDocs = await readAllDocs(allDocsQuery);
      setAllEnteries(allUserDocs);
    };

    fetchAllData();
  }, [sorting, filter, fetch]);

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
        <TableSearchBar searchTable={searchTable} />
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
            <TableHeader
              columns={columns}
              sorting={sorting}
              sortTable={sortTable}
            />
            <TableContent entries={records} triggerFetch={triggerFetch} />
          </table>
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
