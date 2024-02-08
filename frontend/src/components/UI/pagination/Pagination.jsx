import React from "react";
import { getPagesArray } from "../../../utils/pages";
import classes from "./Pagination.module.css";

// totalPages - полное количество страниц
// page - страница, для которой надо получить массив данных
// changePage - функция смены страницы
function Pagination({ totalPages, page, changePage }) {
  let pagesArray = getPagesArray(totalPages);

  return (
    <div className={`${classes.page__wrapper}`}>
      {pagesArray.map((p) => (
        <span
          onClick={() => {
            changePage(p);
            //changePage(p, false);
          }}
          key={p}
          className={
            page === p
              ? `${classes.page} ${classes.page__current}`
              : `${classes.page}`
          }
        >
          {p}
        </span>
      ))}
    </div>
  );
}

export default Pagination;
