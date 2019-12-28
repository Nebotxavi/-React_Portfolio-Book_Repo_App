import React from "react";

const Pagination = ({ pageSize, currentPage, setCurrentPage, itemsAmount }) => {
  const pagesAmount = Math.ceil(itemsAmount / pageSize);
  if (pagesAmount === 1) return null;
  let pages = [];
  for (let page = 1; page <= pagesAmount; page++) {
    pages.push(page);
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination clickable">
        {pages.map(page => {
          const style = page === currentPage ? "page-item active" : "page-item";
          return (
            <li className={style} key={page}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
