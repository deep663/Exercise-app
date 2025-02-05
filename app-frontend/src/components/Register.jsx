import { useState } from "react";
import { register } from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import bgImage from "../assets/images/cover.jpg";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await register(username, email, password);
      alert("Registration successful!", response);
      navigate("/login");

    } catch (err) {
      console.log(err);
      if (err.response.status === 403) {
        alert(`Registration failed. ${err.response.data.message}`);
      } else {
        alert("Registration failed. Please check your credentials.", err);
      }
      // console.log(err);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-red-700 animate-bounce"></div>
          <div className="w-4 h-4 rounded-full bg-red-700 animate-bounce [animation-delay:-.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-red-700 animate-bounce [animation-delay:-.5s]"></div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundImage: `url(${bgImage})`}} className="absolute inset-0 bg-cover bg-center bg-opacity-50 flex flex-col items-center justify-center h-screen ">
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
      <button className="flex items-center gap-2 mt-4 text-white rounded-full py-1 px-3 bg-gray-800 hover:bg-gray-900" onClick={() => navigate("/")}><FaChevronLeft/>Back</button>
    </div>
  );
};

export default Register;
