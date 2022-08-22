import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";
import {siteName } from 'config';

export default function Register() {

    useEffect(()=>{
        document.title = siteName+ " - Register"
    })

  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { email } = values;
    if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, username, password } = values;
    if(localStorage.getItem(process.env.REACT_APP_BANNED_KEY)){
      toast.error("Sorry, it seems you've been banned.", toastOptions);
    }else{
    if (handleValidation()) {
      
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.userData)
        );
        navigate("/");
      }
    }
  }
  };

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-white">
              <div className="max-w-md w-full space-y-8">
                <div>
                  <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Register for {siteName}
                  </h2>
                </div>
                <div>
                <form action="" onSubmit={(event) => handleSubmit(event)}>
                <div className="mb-6">
    <label for="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your Username</label>
    <input type="username" name="username" onChange={(e) => handleChange(e)} id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="contact@example.com" required/>
  </div>
  <div className="mb-6">
    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your email</label>
    <input type="email" name="email" onChange={(e) => handleChange(e)} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="contact@example.com" required/>
  </div>
  <div className="mb-6">
    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your password</label>
    <input type="password" name="password" onChange={(e) => handleChange(e)} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
  </div>
  <div className="flex items-start mb-6">
  </div>
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>
                  <p className="my-2 text-center text-xs font-extrabold text-gray-900">
                    By logging in you agree with our {""}
                    <a href="DADDY" className="text-blue-500">
                      Terms Of Service {""}
                    </a>
                    and {""}
                    <a href="DADDY" className="text-blue-500">
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
      <ToastContainer />
    </>
  );
}