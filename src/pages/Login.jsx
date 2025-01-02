import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contextAPI/AuthContext"; // Assuming you have an AuthContext

const Login = () => {
  const { setUsername, username, password, setPassword } = useAuth();
  const { login } = useAuth(); 
  const navigate = useNavigate();
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        login(data.token);
        navigate("/dashboard");
      } else {
        setError("Invalid credentials, please try again.");
      }
    } catch (err) {
      setError("Error logging in. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-200">
      <div className="max-w-md w-full p-6 bg-gray-800 rounded-md shadow-md">
        {/* Logo */}
        <div className="w-full py-2 mb-6 rounded-md flex justify-center box-border px-4">
          <h1 className="text-2xl font-semibold">
            <span className="text-red-500">ECommerse</span>
            <span className="text-white ml-2">Login</span>
          </h1>
        </div>
        {error && (
          <p className="text-red-500 mb-4 text-center">{error}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label
              className="block text-sm font-medium mb-2 text-gray-400"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full bg-gray-700 border border-gray-600 text-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6 relative">
            <label
              className="block text-sm font-medium mb-2 text-gray-400"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full bg-gray-700 border border-gray-600 text-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 font-semibold transition-all duration-200"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
