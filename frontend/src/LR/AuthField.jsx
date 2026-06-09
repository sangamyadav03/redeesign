import React from 'react';

const AuthField = ({
  label,
  error,
  children,
}) => (
  <div className="space-y-3">
    <label className="block text-xs uppercase tracking-[0.2em] text-white/50">
      {label}
    </label>
    {children}
    {error?.message && (
      <p className="text-sm text-red-400 border-l border-red-400/30 pl-2">
        {error.message}
      </p>
    )}
  </div>
);

export const authInputClass =
  'auth-input w-full rounded-xl border border-white/15 bg-black/40 px-5 py-4 text-base text-white placeholder:text-white/30 outline-none transition-all duration-300 focus:border-white/50 focus:bg-black/60 focus:shadow-[0_0_0_1px_rgba(255,255,255,0.08)]';

export default AuthField;
