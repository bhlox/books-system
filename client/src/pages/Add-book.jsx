import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookForm from "../components/BookForm";
import { useAuthContext } from "../contexts/auth-context";

function AddBook() {
  const navigate = useNavigate();

  const { isUser } = useAuthContext();

  const { bookId } = useParams();

  useEffect(() => {
    if (!isUser) {
      navigate("/login");
    }
  }, [isUser]);

  return (
    <section className="mx-auto max-w-7xl min-h-[90vh] p-4 mt-12 space-y-6 flex flex-col items-center">
      <h2 className="text-4xl font-bold">
        {bookId ? "Edit current book" : "Add a book"}
      </h2>
      <BookForm />
    </section>
  );
}

export default AddBook;
