import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className=" bg-cover  bg-[url(https://images.unsplash.com/photo-1557404763-69708cd8b9ce?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] pt-8  h-screen w-full flex justify-between flex-col ">
        <img
        className="w-18 ml-8"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <div className=" bg-white pb-7 py-4 px-4">
          <h2 className=" text-3xl font-bold">Get Started with Ubar</h2>
          <Link to="/login" className=" flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5">Continue</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
