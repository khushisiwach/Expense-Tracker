import React, { useContext, useState } from "react";
import Authlayout from "../../components/layouts/Authlayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { UserContext } from "../../context/UserContext";
import uploadImage from "../../utils/uploadImage";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";

const Signup = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!fullName) {
      setError("Enter your full name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Enter valid email");
      return;
    }
    if (!password) {
      setError("Enter valid password");
      return;
    }
    setError("");

    try {
      let profileImageUrl = "";
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "https://example.com/pic.jpg";
      }
      console.log(profileImageUrl);
      console.log(fullName);
      console.log(email);
      console.log(password);
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName : fullName,
        email : email,
        password : password,
        profileImageUrl : profileImageUrl,
      });

      console.log(response.data);
      const { token, user } = response.data;
      updateUser(user);
      if (token) {
        localStorage.setItem("token", token);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong please try again");
      }
    }
  };

  return (
    <Authlayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h1 className="font-semibold text-xl text-black">Create an Account</h1>
        <p className="text-sm text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignup}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="Jenny"
              type="text"
            />
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="@khushiexam.com"
              type="text"
            />
            <div className="col-span-2">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Min 8 Characters"
                type="password"
              />
            </div>

            {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
          >
            Sign Up
          </button>
        </form>
      </div>
    </Authlayout>
  );
};

export default Signup;
