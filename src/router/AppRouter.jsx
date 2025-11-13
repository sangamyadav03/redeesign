// src/router/AppRouter.jsx
import React from "react";
import { Route, Routes } from "react-router";
import AuthLayout from "../layout/AuthLayout";
import HomeLayout from "../layout/HomeLayout";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ProtectedRoute from "../components/ProtectedRoute";
import Axios from "../axios/Axios";
import Beauty from "../fashion/Beauty";
import Mens from "../fashion/Mens";
import Women from "../fashion/Women";
import Kids from "../fashion/Kids";
import FootWear from "../fashion/FootWear";
import StoreLocator from "../pages/StoreLocater";
import GiftCardPage from "../pages/GiftCardPage";
import BuyForm from "../form/BuyForm";

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
          <Route path="" element={<HomePage />}/>
          <Route path="zudio-near-you" element={<StoreLocator />}/>
          <Route path="z-world" element={<Axios />} />
          <Route path="z-stories" element={<AboutPage />} />
          <Route path="gift-card" element={<GiftCardPage />} />
          <Route path="beauty" element={<Beauty />}/>
          <Route path="mens" element={<Mens />}/>
          <Route path="women" element={<Women />}/>
          <Route path="kids" element={<Kids />}/>
          <Route path="footwear" element={<FootWear />}/>
         
              
        </Route>
      </Routes>
      <Routes>
         <Route path="buyform" element={<BuyForm />}/>
      </Routes>
    
    </div>
  );
};

export default AppRouter;
