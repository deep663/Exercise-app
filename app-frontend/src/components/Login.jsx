import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/api";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { FaChevronLeft } from "react-icons/fa";
import bgImage from "../assets/images/cover.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = useSignIn();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login(email, password);
      signIn({
        auth: { token: response.data.token },
        userState: { id: response.data.id, name: response.data.name },
      });
      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed. Please check your credentials.", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

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
    <div style={{ backgroundImage: `url(${bgImage})` }} className="absolute inset-0 bg-cover bg-center bg-opacity-50 flex flex-col items-center justify-center h-screen ">
      <h1 className="text-5xl text-white font-bold mb-8">MISSION FITNESS</h1>
      <div className="bg-gray-900 p-6 rounded shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
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
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-white">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-orange-400 underline">
            Register here
          </Link>
        </p>
      </div>
      <button
        className="flex items-center gap-2 mt-4 text-white rounded-full py-1 px-3 bg-gray-800 hover:bg-gray-900"
        onClick={() => navigate("/")}
      >
        <FaChevronLeft />
        Back
      </button>
    </div>
  );
};

export default Login;
