import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/api";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useSignIn from "react-auth-kit/hooks/useSignIn";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = useSignIn();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  const handleSubmit = async (e) => {
    e.preventDefault();

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
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center h-screen ">
      <h1 className="text-4xl text-gray-100 font-bold mb-8">MISSION FITNESS</h1>
      <div className="bg-gray-900 p-6 rounded shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>
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
    </div>
  );
};

export default Login;
