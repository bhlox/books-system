import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/auth-context";
import { HiEye, HiEyeOff } from "react-icons/hi";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { isUser, setIsUser } = useAuthContext();

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

    if (data.status === "error") {
      alert("invalid user credentials");
      return;
    }

    if (data.user) {
      localStorage.setItem("token", data.user);
      setIsUser(true);
      alert("login successful");
      navigate("/");
    }
  };

  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  return (
    <section className="mx-auto max-w-7xl min-h-[90vh] p-4 mt-12 space-y-6 flex flex-col items-center">
      <h2 className="text-4xl font-bold">Login</h2>

      <form
        className="bg-gray-200 dark:bg-slate-600 rounded p-6 w-full max-w-xl shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col space-y-6">
          <div className="form-control">
            <label className="input-label" htmlFor="email">
              email{" "}
            </label>
            <input
              className="input-style"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
          </div>

          <div className="form-control relative">
            <label className="input-label" htmlFor="password">
              password{" "}
            </label>
            <input
              className="input-style"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 bottom-2 text-3xl outline-none text-black"
            >
              {showPassword ? <HiEyeOff /> : <HiEye />}
            </button>
          </div>
          <button className="form-button">submit</button>
        </div>
      </form>
    </section>
  );
}

export default Login;
