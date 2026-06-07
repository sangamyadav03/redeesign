import React from 'react';

const AuthPageShell = ({ title, subtitle, children, footer }) => (
  <div className="auth-page min-h-screen relative flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
    <div className="auth-grid pointer-events-none absolute inset-0" />
    <div className="auth-glow auth-glow-top pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full" />
    <div className="auth-glow auth-glow-bottom pointer-events-none absolute -bottom-40 -right-20 w-[360px] h-[360px] rounded-full" />

    <div className="relative z-10 w-full max-w-[420px] flex flex-col items-center">
      <div className="mb-10 text-center">
        <p className="text-[11px] uppercase tracking-[0.55em] text-white/40 mb-3">Welcome to</p>
        <h1 className="text-5xl md:text-6xl font-semibold tracking-[0.35em] text-white uppercase">
          Zudio
        </h1>
        <div className="mx-auto mt-5 h-px w-16 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      </div>

      <div className="auth-card w-full rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 md:p-10 shadow-[0_0_80px_rgba(255,255,255,0.04)]">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-medium tracking-[0.2em] uppercase text-white">{title}</h2>
          {subtitle && (
            <p className="mt-2 text-sm text-white/45 tracking-wide">{subtitle}</p>
          )}
        </div>

        {children}
      </div>

      {footer && <div className="relative z-10 mt-8">{footer}</div>}
    </div>
  </div>
);

export default AuthPageShell;
