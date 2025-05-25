import React, { useState } from "react";
import { Link } from "react-router-dom";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captainData, setCaptainData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();

    setCaptainData({
      email: email,
      password: password,
    });

    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <div className=" h-screen flex flex-col justify-between p-7">
        <div>
          <img
            className="w-14 mb-3"
            src="https://cdn1.iconfinder.com/data/icons/transportation-85/65/uber-512.png"
            alt=""
          />
          <form onSubmit={(e) => submitHandler(e)}>
            <h3 className=" text-lg font-medium mb-2">What's our captain's email ?</h3>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base "
              type="email"
              required
              placeholder="Enter you email"
            />
            <h3 className="text-lg font-medium mb-2">What's our captain's password ?</h3>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base "
              type="password"
              required
              placeholder="Enter your password"
            />
            <button className=" bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2  w-full text-lg placeholder:text-base ">
              Login
            </button>
            <p className=" text-center">
              Join a fleet ?{" "}
              <Link to="/captain-signup" className=" text-blue-600">
                Register as Captain
              </Link>
            </p>
          </form>
        </div>
        <div>
          <Link
            to="/login"
            className=" bg-[#503529] flex items-center justify-center text-white font-semibold mb-2 rounded px-4 py-2  w-full text-lg placeholder:text-base "
          >
            Sign in as User
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CaptainLogin;
