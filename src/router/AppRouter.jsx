import React from "react";
import { Route, Routes } from "react-router";
import AuthLayout from "../layout/AuthLayout";
import HomeLayout from "../layout/HomeLayout";
import ProtectedRoute from "../components/ProtectedRoute";

import BuyForm from "../form/BuyForm";
import Home from "../pages/Home";
import Product from "../pages/Products";
import Users from "../pages/Users";

const AppRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AuthLayout />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomeLayout />
            </ProtectedRoute>
          }
        >
         <Route path="" element={<Home />}/>
         <Route path="/home/products" element={<Product />}/>
         <Route path="/home/users" element={<Users />}/>
         
              
        </Route>
      </Routes>
      <Routes>
         <Route path="buyform" element={<BuyForm />}/>
      </Routes>
    
    </div>
  );
};

export default AppRouter;
