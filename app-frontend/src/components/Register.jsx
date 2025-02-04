import { useState } from "react";
import { register } from "../api/api";
import { Link } from "react-router-dom";

const Register = (setIsRegistered) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(username, email, password);
      alert("Registration successful!", response);
      setIsRegistered(true);

    } catch (err) {
      console.log(err);
      if (err.response.status === 403) {
        alert(`Registration failed. ${err.response.data.message}`);
      } else {
        alert("Registration failed. Please check your credentials.", err);
      }
      // console.log(err);
    }
  };

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center h-screen ">
      <h1 className="text-4xl text-gray-100 font-bold mb-8">MISSION FITNESS</h1>
      <div className="bg-gray-900 p-6 rounded-md shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-3 w-full border rounded mb-4"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 w-full border rounded mb-4"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 w-full border rounded mb-4"
          />
          <button
            type="submit"
            className="w-full bg-red-600 text-white text-lg font-semibold p-3 rounded hover:bg-red-700"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-white">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-400 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
