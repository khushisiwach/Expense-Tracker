import React, { useContext, useState } from 'react';
import Authlayout from '../../components/layouts/Authlayout';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';

const Login = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState(null);

   const {updateUser} = useContext(UserContext);
   
   const navigate = useNavigate();
   const handleLogin = async (e) => {
      e.preventDefault();

      if (!validateEmail(email)) {
         setError("Please enter a valid email");
         return;
      }
      if (!password) {
         setError("Please enter a correct password");
         return;
      }
      setError("");

   try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password
      });
  
       const {token , user} = response.data;
       updateUser(user);
       if(token){
      localStorage.setItem("token", token);
       navigate("/dashboard");
    }
    } catch (error) {
      if(error.response && error.response.data.message){
      setError(error.response.data.message);
      }
      else{
         setError("Something went wrong please try again");
      }
   
    }

   }
   return (
      <Authlayout>
         <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
            <h1 className='font-semibold text-xl text-black'>Welcome Back</h1>
            <p className='text-sm text-slate-700 mt-[5px] mb-6'>Please enter your details to login</p>

            <form onSubmit={handleLogin}>
               <Input
                  value={email}
                  onChange={({ target }) => setEmail(target.value)}
                  label="Email Address"
                  placeholder="@khushiexam.com"
                  type="text"
               />

               <Input
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                  label="Password"
                  placeholder="Min 8 Characters"
                  type="password"
               />

               {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

               <button type='submit' className='btn-primary'>
                  LOGIN
               </button>

               <p className='text-[14px] text-slate-800 mt-3'>
                  Don't have an account?{" "}
                  <Link className='font-medium text-blue-900 underline' to="/signup">
                     Signup
                  </Link>
               </p>
            </form>
         </div>
      </Authlayout>
   );
};

export default Login;
