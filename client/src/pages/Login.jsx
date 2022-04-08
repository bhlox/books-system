import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resp = await fetch(`${process.env.REACT_APP_BASE_URL}/api/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await resp.json();

    console.log(data);

    if (data.user) {
      localStorage.setItem("token", data.user);
      alert("login successful");
      navigate("/");
    }
  };

  return (
    <section className="min-h-screen max-w-7xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-6">
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

export default Login;
