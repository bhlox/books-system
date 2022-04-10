import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { BiDetail } from "react-icons/bi";
import DeleteModal from "./DeleteModal";

function Book({ title, author, price, stock, _id, setDidDelete }) {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

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
    <>
      <div className="w-full sm:w-1/2 md:w-1/3 px-4 ">
        <div className="hover:outline p-4 space-y-4 bg-gray-200 dark:bg-slate-600 shadow-lg  flex flex-col justify-between">
          {/* TITLE AND AUTHOR */}
          <div>
            <Link
              to={`/book/${_id}`}
              className="text-4xl font-bold hover:underline"
            >
              {title.length > 30 ? title.substring(0, 30) + "..." : title}
            </Link>
            <h2 className="text-xl font-light"> {author}</h2>
          </div>

          {/* BUTTONS */}
          <div className="flex space-x-6 border-t-2 border-black dark:border-gray-100 pt-2">
            <Link className="home-book-icons" to={`/book/${_id}`}>
              details <BiDetail />
            </Link>
            <button className="home-book-icons" onClick={handleEdit}>
              edit <FaEdit />
            </button>
            <button
              className="home-book-icons"
              onClick={() => setShowModal(true)}
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <DeleteModal
          title={title}
          handleDelete={handleDelete}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
}

export default Book;
