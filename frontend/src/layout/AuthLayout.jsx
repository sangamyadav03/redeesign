import React from "react";
import Register from "../LR/Register";
import Login from "../LR/Login";

const AuthLayout = () => {
  const [isRegistering, setIsRegistering] = React.useState(true);
  const toggleAuth = (value) => setIsRegistering(value);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      <div className="auth-grid pointer-events-none absolute inset-0" />
      <div className="auth-glow auth-glow-top pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full" />
      <div className="auth-glow auth-glow-bottom pointer-events-none absolute -bottom-40 -right-20 w-[360px] h-[360px] rounded-full" />

      <div className="relative z-10 w-full max-w-[480px] flex flex-col items-center">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-white/50 mb-3">Welcome to</p>
          <h1 className="text-6xl md:text-7xl font-semibold tracking-[0.25em] text-white uppercase">
            Zudio
          </h1>
          <div className="mx-auto mt-5 h-px w-20 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        </div>

        <div className="auth-card w-full rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-10 md:p-12 shadow-[0_0_80px_rgba(255,255,255,0.04)]">
          <AuthToggle isRegistering={isRegistering} onToggle={toggleAuth} />
          
          {isRegistering ? <Register /> : <Login />}
        </div>

        <Footer isRegistering={isRegistering} onToggle={toggleAuth} />
      </div>
    </div>
  );
};

const AuthToggle = ({ isRegistering, onToggle }) => (
  <div className="flex justify-center mb-8 bg-white/5 rounded-full p-1.5">
    <button
      type="button"
      onClick={() => onToggle(true)}
      className={`flex-1 py-2.5 rounded-full text-sm font-semibold uppercase tracking-wider transition-all ${
        isRegistering ? 'bg-white text-black' : 'text-white/50 hover:text-white'
      }`}
    >
      Register
    </button>
    <button
      type="button"
      onClick={() => onToggle(false)}
      className={`flex-1 py-2.5 rounded-full text-sm font-semibold uppercase tracking-wider transition-all ${
        !isRegistering ? 'bg-white text-black' : 'text-white/50 hover:text-white'
      }`}
    >
      Login
    </button>
  </div>
);

const Footer = ({ isRegistering, onToggle }) => (
  <div className="text-center mt-8 text-base text-white/50">
    {isRegistering ? (
      <>
        Already have an account?{' '}
        <button
          type="button"
          onClick={() => onToggle(false)}
          className="text-white hover:underline font-medium"
        >
          Sign in
        </button>
      </>
    ) : (
      <>
        Don&apos;t have an account?{' '}
        <button
          type="button"
          onClick={() => onToggle(true)}
          className="text-white hover:underline font-medium"
        >
          Create one
        </button>
      </>
    )}
  </div>
);

export default AuthLayout;
