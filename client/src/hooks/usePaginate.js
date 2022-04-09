import { useState } from "react";

const usePaginate = (items, pagesize) => {
  const [itemsPerPage, setItemsPerPage] = useState(pagesize);

  //   const itemsPerPage = 12;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const displayedItems = [...Array(totalPages)].map((item, i) => {
    const start = i * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  });
  // console.log(displayedItems);
  return { displayedItems, totalPages };
};

export default usePaginate;
