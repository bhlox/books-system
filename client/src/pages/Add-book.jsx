import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookForm from "../components/BookForm";
import { useAuthContext } from "../contexts/auth-context";

function AddBook() {
  const navigate = useNavigate();

  const { isUser } = useAuthContext();

  useEffect(() => {
    if (!isUser) {
      navigate("/login");
    }
  }, [isUser]);

  return (
    <section className="min-h-screen max-w-7xl mx-auto">
      <BookForm />
    </section>
  );
}

export default AddBook;
