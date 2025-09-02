import React, { useContext, useState } from "react";
import Authlayout, {
  PersonCircleIcon,
  UploadIcon,
} from "../../components/layouts/Authlayout";
import Input from "../../components/Inputs/Input";
import {
  validateEmail,
  validateFullName,
  validatePassword,
} from "../../utils/helper";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance"; // ✅ make sure this is correct
import { API_PATHS } from "../../utils/apiPaths"; // ✅ your API endpoints

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

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    let newErrors = {};

    // ✅ Validation
    const fullNameError = validateFullName(fullName);
    if (fullNameError) newErrors.fullName = fullNameError;

    const emailError = validateEmail(email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(password);
    if (passwordError) newErrors.password = passwordError;

    setError(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      setIsLoading(true);

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl: profilePic || null,
      });

      // yaha response me user aayega but use karna zaroori nahi
      const { user } = response.data.data;
      console.log(user);

      // ✅ direct login page pe redirect
      navigate("/login");
    } catch (err) {
      if (err.response?.data?.message) {
        setError({ api: err.response.data.message });
      } else {
        setError({ api: "Something went wrong, please try again" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Authlayout>
      <div className="w-full max-w-lg p-10 space-y-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl shadow-purple-300/60 transform transition-all duration-500 animate-slide-in-up">
        <h3 className="text-3xl font-extrabold text-center text-gray-800 animate-slide-in-up">
          Create Account
        </h3>

        <form onSubmit={handleSignup} className="space-y-6">
          {/* Profile Upload Section */}
          <div
            className="flex justify-center mb-6 animate-slide-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="relative w-30 h-30 rounded-full overflow-hidden border-4 border-purple-300 group transition-all duration-300 hover:border-purple-400 ">
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                onChange={(e) => setProfilePic(e.target.files?.[0] || null)}
              />
              {profilePic ? (
                <img
                  src={
                    typeof profilePic === "string"
                      ? profilePic
                      : URL.createObjectURL(profilePic)
                  }
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <PersonCircleIcon />
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <UploadIcon />
              </div>
            </div>
          </div>

          {/* Input Fields */}
          <div className="space-y-6">
            {/* Full Name */}
            {/* Full Name */}
            <div>
              <label
                htmlFor="full-name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="full-name"
                value={fullName}
                onChange={(e) => {
                  const value = e.target.value;
                  setFullName(value);
                  setError((prev) => ({
                    ...prev,
                    fullName: validateFullName(value),
                  }));
                }}
                className="mt-1 block w-full rounded-lg border border-purple-200 shadow-inner p-3 outline-none"
                placeholder="Your Full Name"
              />
              {error.fullName && (
                <p className="text-red-500 text-sm mt-2">{error.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => {
                  const value = e.target.value;
                  setEmail(value);
                  setError((prev) => ({
                    ...prev,
                    email: validateEmail(value),
                  }));
                }}
                className="mt-1 block w-full rounded-lg border border-purple-200 shadow-inner p-3 outline-none"
                placeholder="you@example.com"
              />
              {error.email && (
                <p className="text-red-500 text-sm mt-2">{error.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Input
                value={password}
                onChange={({ target }) => {
                  const value = target.value;
                  setPassword(value);
                  setError((prev) => ({
                    ...prev,
                    password: validatePassword(value),
                  }));
                }}
                placeholder="Min 8 Characters"
                type="password"
              />
              {error.password && (
                <p className="text-red-500 text-sm mt-2">{error.password}</p>
              )}
            </div>

            {/* API Error */}
            {error.api && (
              <p className="text-red-500 text-sm mt-2">{error.api}</p>
            )}

            {/* Submit */}
            <div>
              <button
                onClick={handleSignup}
                type="submit"
                className={`w-full flex justify-center py-3 px-4 rounded-lg shadow-lg text-lg font-medium text-white transition duration-300 transform 
    ${
      isLoading
        ? "bg-purple-300 cursor-not-allowed"
        : "bg-gradient-to-r from-purple-500 to-violet-400 hover:from-purple-600 hover:to-violet-500 hover:scale-105 active:scale-95"
    }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner />
                    <span className="ml-2">Signing up...</span>
                  </>
                ) : (
                  <span>Sign Up</span>
                )}
              </button>
            </div>
          </div>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-purple-600 hover:text-purple-400"
            >
              Log In
            </a>
          </p>
        </form>
      </div>
    </Authlayout>
  );
};

export default Signup;
