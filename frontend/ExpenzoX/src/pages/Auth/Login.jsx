import React, { useState, useContext } from 'react'
import AuthLayout from "../../components/layouts/AuthLayout"
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import { UserContext } from '../../context/UserContext';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();

  //Handle Login Form Submit
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.")
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");

    //Login API Call
    try{
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;
      console.log(response.data)
      if(token) {
        localStorage.setItem("token", token);
        updateUser(response.data?.user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  }
  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Welcome Back</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-[5px] mb-6">
          Please enter your details to log in
        </p>
        <form onSubmit={handleLogin}>          
         <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="sree@example.com"
            type="text"
            labelClassName="text-white"
            className="dark:bg-gray-700 dark:text-white border-none focus:ring-0 focus:border-none"
          />
          <Input            
          value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Characters" 
            type="password"
            labelClassName="text-white"
            className=" dark:bg-gray-700 dark:text-white border-none focus:ring-0 focus:border-none"
          />

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button type="submit" className='btn-primary'>
            LOGIN
          </button>
          <p className='text-sm text-gray-700 dark:text-gray-300'>
            Don't have an account?{" "}
            <Link className="font-normal text-primary hover:text-primary-dark underline" to="/signup">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login

