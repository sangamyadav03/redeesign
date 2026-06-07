import React from 'react';

const AuthField = ({
  label,
  error,
  children,
}) => (
  <div className="space-y-2">
    <label className="block text-[11px] uppercase tracking-[0.22em] text-white/50">
      {label}
    </label>
    {children}
    {error?.message && (
      <p className="text-xs text-white/70 border-l border-white/30 pl-2">
        {error.message}
      </p>
    )}
  </div>
);

export const authInputClass =
  'auth-input w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none transition-all duration-300 focus:border-white/50 focus:bg-black/60 focus:shadow-[0_0_0_1px_rgba(255,255,255,0.08)]';

export default AuthField;
