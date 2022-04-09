import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Book({ title, author, price, stock, _id, setDidDelete }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/add-book/${_id}`);
  };

  const handleDelete = async () => {
    const resp = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/books/${_id}`,
      {
        method: "DELETE",
      }
    );

    const data = await resp.json();

    console.log(data);
    setDidDelete(true);
  };

  return (
    <div className="space-y-4 w-1/3">
      <div>
        <h2 className="text-4xl font-bold">Title: {title}</h2>
        <h2 className="text-2xl font-medium">Author: {author}</h2>
        <h3 className="text-2xl font-medium">Price: ${price}</h3>
        <h3 className="text-2xl font-medium">Stock: {stock}</h3>
      </div>
      <div className="flex space-x-4">
        <Link to={`/book/${_id}`}>view more</Link>
        <button onClick={handleEdit}>edit listing</button>
        <button onClick={handleDelete}>delete listing</button>
      </div>
    </div>
  );
}

export default Book;
