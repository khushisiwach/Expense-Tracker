import React, { useContext, useState } from "react";
import Authlayout from "../../components/layouts/Authlayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail ,validatePassword } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";
import Cookies from "js-cookie";


const LoadingSpinner = () => (
  <svg
    className="animate-spin h-5 w-5 mr-3 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    let newErrors = {};
    const emailError = validateEmail(email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(password);
    if (passwordError) newErrors.password = passwordError;

    setError(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      setIsLoading(true);

      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { user } = response.data.data;
      const token = Cookies.get("token");

      updateUser(user);

      if (token) {
        localStorage.setItem("token", token);
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError({ api: err.response.data.message });
      } else {
        setError({ api: "Something went wrong please try again" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Authlayout>
      <div className="w-full max-w-lg p-10 space-y-4 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl shadow-purple-300/60 transform transition-all duration-500 animate-slide-in-up">
        <h3 className="text-3xl font-extrabold text-center text-gray-800 animate-slide-in-up mt-2">
          Welcome Back
        </h3>
        <p className="text-sm text-slate-700 text-center mt-3 ">
          Please enter your details to login
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <Input
            id="email"
            value={email}
            onChange={({ target }) => {
              const value = target.value;
              setEmail(value);
              setError((prev) => ({
                ...prev,
                email: validateEmail(value),
              }));
            }}
            label="Email Address"
            placeholder="you@example.com"
            type="text"
            error={error.email}
          />

          {/* Password */}
          <Input
            id="password"
            value={password}
            onChange={({ target }) => {
              const value = target.value;
              setPassword(value);
              setError((prev) => ({
                ...prev,
                password: validatePassword(value),
              }));
            }}
            label="Password"
            placeholder="Min 6 Characters"
            type="password"
            error={error.password}
          />

          {/* API Error */}
          {error.api && (
            <p className="text-red-500 text-sm mt-2">{error.api}</p>
          )}

          {/* Button */}
          <div className="animate-slide-in-up">
            <button 
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-3 px-4 rounded-lg shadow-lg text-lg font-medium text-white transition duration-300 transform
                ${
                  isLoading
                    ? "bg-purple-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-500 to-violet-400 hover:from-purple-600 hover:to-violet-500 hover:scale-105 active:scale-95"
                }`}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner />
                  <span className="ml-2">Logging in...</span>
                </>
              ) : (
                <span>LOGIN</span>
              )}
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 animate-slide-in-up mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-purple-600 hover:text-purple-400"
            >
              Signup
            </Link>
          </p>
        </form>
      </div>
    </Authlayout>
  );
};

export default Login;
