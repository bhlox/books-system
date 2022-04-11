import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function BookForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const [titleError, setTitleError] = useState("");
  const [authorError, setAuthorError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [stockError, setStockError] = useState("");

  const priceInputRef = useRef();
  const stockInputRef = useRef();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { bookId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (title.length < 3) {
      setTitleError("Minimum of 3 characters");
    } else setTitleError("");
    if (!stockInputRef.current.value) {
      setStockError("Pls enter stocks");
    } else setStockError("");

    if (author.length < 3) {
      setAuthorError("Minimum of 3 characters");
    } else setAuthorError("");
    if (!priceInputRef.current.value) {
      setPriceError("Pls enter a price value");
    } else setPriceError("");

    if (
      title.length < 3 ||
      !stockInputRef.current.value ||
      author.length < 3 ||
      !priceInputRef.current.value
    ) {
      setLoading(false);
      return;
    }

    try {
      if (!bookId) {
        const resp = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/books`,
          {
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
          }
        );

        const data = await resp.json();

        // console.log(data);

        // alert("added a book");
        navigate(`/book/${data.create._id}`);
        setLoading(false);
        return;
      } else {
        const resp = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/books`,
          {
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
          }
        );

        const data = await resp.json();

        // console.log(data);

        setLoading(false);

        // alert("edited a book");
        navigate(`/book/${bookId}`);
        return;
      }
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
      <form onSubmit={handleSubmit}>
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
            />
            {titleError && (
              <p className="text-2xl font-medium text-red-400">{titleError}</p>
            )}
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
            />
            {authorError && (
              <p className="text-2xl font-medium text-red-400">{authorError}</p>
            )}
          </div>

          <div className="form-control">
            <label className="input-label" htmlFor="price">
              Price
            </label>
            <input
              className="input-style"
              ref={priceInputRef}
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
            />
            {priceError && (
              <p className="text-2xl font-medium text-red-400">{priceError}</p>
            )}
          </div>

          <div className="form-control">
            <label className="input-label" htmlFor="stock">
              Stock
            </label>
            <input
              ref={stockInputRef}
              className="input-style"
              id="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              type="number"
            />
            {stockError && (
              <p className="text-2xl font-medium text-red-400">{stockError}</p>
            )}
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
