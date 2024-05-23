import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";

function Register() {
  const [fromData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: ''
  });

  const { name, email, password, confirm_password } = fromData;

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
        <FaUser />
        <span>Register</span>
      </h1>
      <h1 className="text-lg text-gray-500 mt-2">Create An Account</h1>
      <form className="mt-10" onSubmit={onSubmit}>
        <input type="text" id="name" name="name" value={name} placeholder="Enter Your Name" className="mb-3 border border-gray-300 h-10 rounded-md w-full block px-1" onChange={onChange} />

        <input type="email" id="email" name="email" value={email} placeholder="Enter Your Email address" className="mb-3 border border-gray-300 h-10 rounded-md w-full block px-1" onChange={onChange} />

        <input type="password" id="password" name="password" value={password} placeholder="Enter Your Password" className="mb-3 border border-gray-300 h-10 rounded-md w-full block px-1" onChange={onChange} />

        <input type="password" id="password" name="password" value={confirm_password} placeholder="Confirm Password" className="mb-3 border border-gray-300 h-10 rounded-md w-full block px-1" onChange={onChange} />

        <button type="submit" className="block w-full bg-black text-white h-10 text-xl rounded-md">
          Submit
        </button>
      </form>
    </>
  )
}

export default Register