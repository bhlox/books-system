import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../contexts/auth-context";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import DeleteModal from "../components/DeleteModal";

const randomLength = [20, 25, 30, 40];

function Details() {
  const { bookId } = useParams();

  const { isUser } = useAuthContext();

  const [bookData, setBookData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/add-book/${bookData._id}`);
  };

  const handleDelete = async () => {
    const resp = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/books/${bookData._id}`,
      {
        method: "DELETE",
      }
    );

    const data = await resp.json();

    console.log(data);
    alert("book successfully deleted");
    navigate("/");
    // setDidDelete(true);
  };

  useEffect(() => {
    if (!isUser) {
      navigate("/login");
    }
  }, [isUser]);

  useEffect(() => {
    const fetchBook = async () => {
      const resp = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/books/${bookId}`
      );

      const data = await resp.json();

      // console.log(data.data);

      setBookData(data.data);
    };

    fetchBook();
  }, [bookId]);

  return (
    <>
      <section className="mx-auto max-w-7xl min-h-screen p-4 mt-12 flex justify-center items-start">
        <div className="bg-gray-300 dark:bg-slate-600 rounded max-w-sm p-6 space-y-4 shadow-2xl">
          <div className="space-y-1">
            <h2 className="text-4xl font-bold">{bookData.title}</h2>
            <h2 className="font-semibold">
              Author: <span className="font-normal"> {bookData.author}</span>
            </h2>
          </div>
          <div>
            <h2 className="font-semibold">Summary</h2>
            <p className="">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel et
              alias iure voluptate. Sit dolore, incidunt nostrum sed ab maiores
              repudiandae non ullam debitis iure!
            </p>
          </div>
          <div>
            <p className="flex gap-x-2 font-semibold">
              Price :{" "}
              <span className="font-normal">
                {" "}
                {bookData.price ? "$" + bookData.price : "Free"}
              </span>
            </p>
            <p className="flex gap-x-2 font-semibold">
              Stock:
              <span className="font-normal">
                {bookData.stock ? bookData.stock : "No stocks available"}
              </span>
            </p>
          </div>
          <div className="flex gap-x-4">
            <button className="detail-book-icons" onClick={handleEdit}>
              edit <FaEdit />
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="detail-book-icons"
            >
              delete <FaTrashAlt />
            </button>
          </div>
        </div>
      </section>
      {showModal && (
        <DeleteModal
          handleDelete={handleDelete}
          setShowModal={setShowModal}
          title={bookData.title}
        />
      )}
    </>
  );
}

export default Details;
