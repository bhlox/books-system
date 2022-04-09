import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../contexts/auth-context";

function Details() {
  const { bookId } = useParams();

  const { isUser } = useAuthContext();

  const [bookData, setBookData] = useState({});
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/add-book/${bookData._id}`);
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
    <section className="mx-auto max-w-7xl min-h-screen">
      <div>
        <h2 className="text-4xl font-bold">{bookData.title}</h2>
        <h2>{bookData.author}</h2>
      </div>
      <button onClick={handleEdit}>edit listing</button>
    </section>
  );
}

export default Details;
