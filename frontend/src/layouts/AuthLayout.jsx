import React, { useState } from 'react';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

const AuthLayout = () => {
  const [isRegister, setIsRegister] = useState(true);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.08)_0%,_transparent_60%)]" />
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-white/5 rounded-full blur-3xl" />

      <h1 className="relative text-5xl md:text-6xl font-bold tracking-[0.3em] text-white mb-10 uppercase">
        Zudio
      </h1>

      <div className="relative w-full flex justify-center">
        {isRegister ? (
          <RegisterPage onSwitchToLogin={() => setIsRegister(false)} />
        ) : (
          <LoginPage onSwitchToRegister={() => setIsRegister(true)} />
        )}
      </div>
    </div>
  );
};

export default AuthLayout;
