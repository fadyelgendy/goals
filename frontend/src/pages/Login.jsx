import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";

function Login() {
  const [fromData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = fromData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  const onSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <>
      <h1 className="text-4xl font-bold flex justify-center align-middle items-center space-x-1">
        <FaSignInAlt />
        <span>Login</span>
      </h1>
      <h1 className="text-lg text-gray-500 mt-2">Log Into Your Account</h1>
      <form className="mt-10" onSubmit={onSubmit}>

        <input type="email" id="email" name="email" value={email} placeholder="Enter Your Email address" className="mb-3 border border-gray-300 h-10 rounded-md w-full block px-1" onChange={onChange} />

        <input type="password" id="password" name="password" value={password} placeholder="Enter Your Password" className="mb-3 border border-gray-300 h-10 rounded-md w-full block px-1" onChange={onChange} />

        <button type="submit" className="block w-full bg-black text-white h-10 text-xl rounded-md">
          Login
        </button>
      </form>
    </>
  )
}

export default Login