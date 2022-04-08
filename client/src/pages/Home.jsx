import React, { useEffect } from "react";
import jwt_decode from "jwt-decode";

function Home() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log(token);
      const user = jwt_decode(token);

      console.log(user);
    }
  }, []);

  return <div className="min-h-screen max-w-7xl mx-auto">Home</div>;
}

export default Home;
