import React, { useEffect, useState } from "react";
import { BiChevronLeftCircle, BiChevronRightCircle } from "react-icons/bi";

function Pagination({ totalPages, setCurrentPage, currentPage }) {
  const [pages, setPages] = useState([totalPages]);

  // console.log(totalPages);
  const [currentPageRef, setCurrentPageRef] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    setCurrentPage(currentPageRef);
    setCurrentPageRef("");
  };

  useEffect(() => {
    setPages([...Array(totalPages).keys()]);
  }, [totalPages]);

  useEffect(() => {
    setCurrentPageRef(currentPage);
  }, [currentPage]);

  return (
    <>
      <div className="flex justify-center">
        <div className="space-x-4 flex items-center">
          {currentPage > 1 && (
            <span
              className="text-3xl cursor-pointer dark:hover:text-gray-400 hover:text-gray-500"
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              <BiChevronLeftCircle />
            </span>
          )}

          <form className="space-x-2" onSubmit={handleSubmit}>
            <input
              className=" w-10 px-2"
              type="number"
              onChange={(e) => setCurrentPageRef(e.target.value)}
              value={currentPageRef}
              placeholder={currentPage}
              max={totalPages}
            />
            <span className="text-xl">/{totalPages}</span>
          </form>

          {+currentPage !== totalPages && (
            <span
              className="text-3xl cursor-pointer dark:hover:text-gray-400 hover:text-gray-500"
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              <BiChevronRightCircle />
            </span>
          )}
        </div>
      </div>
    </>
  );
}

export default Pagination;
