// ✅ AuthLayout.jsx
import React, { useState } from "react";
import Register from "../LR/Register";
import Login from "../LR/Login"; // ✅ FIX: Added missing import for Login
const AuthLayout = () => {
  const [toggle, setToggle] = useState(true);

  return (
    <div>
      {/* ✅ FIX: Made logic more clear (if toggle is true -> show Register, else Login) */}
      {toggle ? (
        <Register setToggle={setToggle} />
      ) : (
        <Login setToggle={setToggle} />
      )}
    </div>
  );
};

export default AuthLayout;
