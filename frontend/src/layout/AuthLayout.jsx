import React, { useState } from "react";
import Register from "../LR/Register";
import Login from "../LR/Login"; 
const AuthLayout = () => {
  const [toggle, setToggle] = useState(true);

  return (
    <div>
      {toggle ? (
        <Register setToggle={setToggle} />
      ) : (
        <Login setToggle={setToggle} />
      )}
    </div>
  );
};

export default AuthLayout;
