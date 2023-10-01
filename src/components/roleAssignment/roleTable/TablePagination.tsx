import style from "../roleAssignment.module.css";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  prevPage: () => void;
  nextPage: () => void;
}

const TablePagination = ({
  currentPage,
  totalPages,
  prevPage,
  nextPage,
}: TablePaginationProps) => {
  return (
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
  );
};

export default TablePagination;
