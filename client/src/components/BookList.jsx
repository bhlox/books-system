import React, { useEffect, useRef, useState } from "react";
import usePaginate from "../hooks/usePaginate";
import Book from "./Book";
import Pagination from "./Pagination";

function BookList() {
  const [bookData, setBookData] = useState([]);
  const [didDelete, setDidDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const initialRef = useRef();

  const { totalPages, displayedItems } = usePaginate(bookData, 2);

  useEffect(() => {
    const fetchBooks = async () => {
      const resp = await fetch(`${process.env.REACT_APP_BASE_URL}/api/books`);
      const data = await resp.json();
      console.log(data);

      setBookData(data);
    };

    if (!initialRef.current) {
      fetchBooks();
      initialRef.current = true;
    }

    if (didDelete) {
      fetchBooks();
      setDidDelete(false);
    }
  }, [didDelete]);

  return (
    <div className="flex flex-wrap">
      {displayedItems[currentPage - 1]?.map((item) => (
        <Book key={item._id} {...item} setDidDelete={setDidDelete} />
      ))}
      <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default BookList;
