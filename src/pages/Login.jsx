import React, { useState, useEffect } from "react";
import supabase from "../helper/supabaseClient";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);
  useEffect(() => {
    const clearSession = async () => {
      await supabase.auth.signOut();
      setEmail("");
      setPassword("");
    };
    clearSession();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    if (data) {
      navigate("/dashboard");
    }
  };

  return (
    <div>
      <nav className="bg-gray-800 text-white p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            Smart Hyperion
          </Link>
          <div>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </nav>

      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Login
          </h2>
          {message && (
            <span className="block text-red-500 text-center mb-4">
              {message}
            </span>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              required
              autoComplete="new-password"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              required
              autoComplete="new-password"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              Log in
            </button>
          </form>
          <p className="text-center text-gray-600 mt-4">
            Don't have an account?
            <Link to="/register" className="text-blue-500 hover:underline">
              {" "}
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
