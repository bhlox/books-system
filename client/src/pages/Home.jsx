import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookList from "../components/BookList";
import { useAuthContext } from "../contexts/auth-context";

function Home() {
  const navigate = useNavigate();

  const { isUser } = useAuthContext();

  useEffect(() => {
    if (!isUser) {
      navigate("/login");
    }
  }, [isUser]);

  return (
    <div className="min-h-screen max-w-7xl mx-auto space-y-12 p-4 mt-4">
      <div className="flex justify-center">
        <h2 className="text-4xl font-bold">Available books</h2>
      </div>
      <BookList />
    </div>
  );
}

export default Home;
