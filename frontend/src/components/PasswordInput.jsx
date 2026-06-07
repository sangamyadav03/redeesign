import React, { useState } from 'react';

const PasswordInput = ({ register, name, placeholder, error, rules }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <div className="relative">
        <input
          type={visible ? 'text' : 'password'}
          {...register(name, rules)}
          className="input-field pr-12"
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/50 hover:text-white uppercase tracking-wider"
        >
          {visible ? 'Hide' : 'Show'}
        </button>
      </div>
      {error && <p className="text-red-400 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default PasswordInput;
