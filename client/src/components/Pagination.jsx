import React, { useEffect, useState } from "react";

function Pagination({ totalPages, setCurrentPage }) {
  const [pages, setPages] = useState([totalPages]);

  // console.log(pages);

  useEffect(() => {
    setPages([...Array(totalPages).keys()]);
  }, [totalPages]);

  return (
    <div className="space-x-4">
      {pages.map((number) => (
        <span
          className="text-3xl"
          onClick={() => setCurrentPage(number + 1)}
          key={Math.random() * 353}
        >
          {number + 1}
        </span>
      ))}
    </div>
  );
}

export default Pagination;
