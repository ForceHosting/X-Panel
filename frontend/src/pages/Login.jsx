import {siteName } from '../config';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from 'utils/APIRoutes';

function Login() {
  useEffect(()=>{
    document.title = siteName+ " - Login"
})

const navigate = useNavigate();
const [values, setValues] = useState({ email: "", password: "" });
const toastOptions = {
  position: "bottom-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};
useEffect(() => {
  if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
    navigate("/");
  }
}, [navigate]);

const handleChange = (event) => {
  setValues({ ...values, [event.target.name]: event.target.value });
};

const validateForm = () => {
  const { email, password } = values;
  if (email === "") {
    toast.error("Email and Password is required.", toastOptions);
    return false;
  } else if (password === "") {
    toast.error("Email and Password is required.", toastOptions);
    return false;
  }
  return true;
};

const handleSubmit = async (event) => {
  const { email, password } = values;
  event.preventDefault();

  if (validateForm()) {
    
    const { data } = await axios.post(loginRoute, {
      email,
      password,
    });
    if (data.status === false) {
      toast.error(data.msg, toastOptions);
    }
    if (data.status === true) {
      console.log(data)
      localStorage.setItem(
        process.env.REACT_APP_LOCALHOST_KEY,
        JSON.stringify(data.userData)
      );

      navigate("/");
    }
  }
};

  return (
    <>
    <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div class="p-6 bg-white border-b border-white">
              <div class="max-w-md w-full space-y-8">
                <div>
                  <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Login to {siteName}
                  </h2>
                </div>
                <div>
                <form action="" onSubmit={(event) => handleSubmit(event)}>
  <div class="mb-6">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your email</label>
    <input type="email" name="email" onChange={(e) => handleChange(e)} id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="contact@example.com" required/>
  </div>
  <div class="mb-6">
    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your password</label>
    <input type="password" name="password" onChange={(e) => handleChange(e)} id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
  </div>
  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>
<p className="my-2 text-center text-xs font-semibold text-gray-900">Don't have an account? Register <a className='text-blue-500' href="/register">here!</a></p>
                  <p class="my-2 text-center text-xs font-extrabold text-gray-900">
                    By logging in you agree with our {""}
                    <a href="/legal/tos" class="text-blue-500">
                      Terms Of Service {""}
                    </a>
                    and {""}
                    <a href="/legal/privacy" class="text-blue-500">
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ToastContainer/>
    </>
  );
}

export default Login;
