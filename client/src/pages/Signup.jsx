import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(name, email, password);

    const resp = await fetch(`${process.env.REACT_APP_BASE_URL}/api/signup`, {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await resp.json();

    alert("account created");

    console.log(data);

    navigate("/login");
  };

  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  return (
    <section className="min-h-screen max-w-7xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-6">
          <label htmlFor="name">
            name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
          </label>
          <label htmlFor="email">
            email
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </label>
          <label htmlFor="password">
            password
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </label>
        </div>
        <button>submit</button>
      </form>
    </section>
  );
}

export default Signup;
