import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function BookForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const navigate = useNavigate();

  const { bookId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await fetch(`${process.env.REACT_APP_BASE_URL}/api/books`, {
        method: "POST",
        body: JSON.stringify({
          title,
          author,
          price,
          stock,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await resp.json();

      console.log(data);

      alert("added a book");
      navigate(`/book/${data.create._id}`);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    const resp = await fetch(`${process.env.REACT_APP_BASE_URL}/api/books`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        author,
        price,
        stock,
        bookId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await resp.json();

    console.log(data);

    alert("edited a book");
    navigate(`/book/${bookId}`);
  };

  useEffect(() => {
    const fetchBook = async () => {
      const resp = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/books/${bookId}`
      );

      const data = await resp.json();

      // console.log(data.data);
      setTitle(data.data.title);
      setAuthor(data.data.author);
      setPrice(data.data.price);
      setStock(data.data.stock);
    };

    if (bookId) {
      fetchBook();
    }
  }, [bookId]);

  return (
    <div>
      <form onSubmit={!bookId ? handleSubmit : handleSubmitEdit}>
        <div className="flex flex-col space-y-6">
          <label htmlFor="name">
            title
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
            />
          </label>
          <label htmlFor="email">
            author
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              type="string"
            />
          </label>
          <label htmlFor="password">
            price
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
            />
          </label>
          <label htmlFor="password">
            stock
            <input
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              type="number"
            />
          </label>
        </div>
        <button>submit</button>
      </form>
    </div>
  );
}

export default BookForm;
