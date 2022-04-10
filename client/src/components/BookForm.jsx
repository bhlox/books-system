import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

function BookForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const [loading, setLoading] = useState(false);

  const { register } = useForm();

  const navigate = useNavigate();

  const { bookId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

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
      setLoading(false);
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
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

      setLoading(false);

      alert("edited a book");
      navigate(`/book/${bookId}`);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
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
    <div className="bg-gray-200 dark:bg-slate-600 rounded p-6 w-full max-w-xl shadow-xl">
      <form onSubmit={!bookId ? handleSubmit : handleSubmitEdit}>
        <div className="flex flex-col space-y-6">
          <div className="form-control">
            <label className="input-label" htmlFor="title">
              Title
            </label>
            <input
              className="input-style"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              minLength={2}
              required
            />
          </div>

          <div className="form-control">
            <label className="input-label" htmlFor="author">
              Author{" "}
            </label>
            <input
              className="input-style"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              type="text"
              minLength={3}
              required
            />
          </div>

          <div className="form-control">
            <label className="input-label" htmlFor="price">
              Price
            </label>
            <input
              className="input-style"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              required
            />
          </div>

          <div className="form-control">
            <label className="input-label" htmlFor="stock">
              Stock
            </label>
            <input
              className="input-style"
              id="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              type="number"
            />
          </div>

          {loading && (
            <div className="font-bold text-3xl flex justify-center">
              <p>Sending data...</p>
            </div>
          )}
          {!loading && <button className="form-button">submit</button>}
        </div>
      </form>
    </div>
  );
}

export default BookForm;
