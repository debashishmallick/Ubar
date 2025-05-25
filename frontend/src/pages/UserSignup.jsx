import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});
  const submitHandler = (e) => {
    e.preventDefault();

    setUserData({
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
    });
    console.log(userData);

    setPassword("");
    setFirstName("");
    setEmail("");
    setLastName("");
  };

  return (
    <div>
      <div className=" h-screen flex flex-col justify-between p-7">
        <div>
          <img
            className="w-14 mb-3"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt=""
          />
          <form onSubmit={(e) => submitHandler(e)}>
            <h3 className=" text-base font-medium mb-2">What's your name ?</h3>
            <div className=" flex gap-3 mb-5">
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className=" bg-[#eeeeee]  rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm "
                type="text"
                required
                placeholder="First name"
              />
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className=" bg-[#eeeeee]  rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm "
                type="text"
                required
                placeholder="Last name"
              />
            </div>
            <h3 className=" text-base font-medium mb-2">What's your email ?</h3>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm "
              type="email"
              required
              placeholder="Enter you email"
            />
            <h3 className="text-base font-medium mb-2">
              What's your password ?
            </h3>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm "
              type="password"
              required
              placeholder="Enter your password"
            />
            <button className=" bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2  w-full text-lg placeholder:text-base ">
              Login
            </button>
            <p className=" text-center">
              Alerdy have an account ?{" "}
              <Link to="/login" className=" text-blue-600">
                Login here
              </Link>
            </p>
          </form>
        </div>
        <div>
          <p className=" text-[10px] leading-tight">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta,
            suscipit quod itaque corporis nemo maiores tempore sit ea? Fuga
            officia molestiae sapiente, voluptatibus illo asperiores quisquam
            blanditiis perferendis maxime eligendi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
