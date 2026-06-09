import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { loginUser } from '../services/authService';
import { useAuth } from '../hooks/useAuth';
import { getApiErrorMessage } from '../utils/getApiErrorMessage';
import AuthField, { authInputClass } from './AuthField';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await loginUser(data);
      login({ token: response.token, user: response.user });
      navigate('/home');
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, 'Invalid email or password. Please try again.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <AuthField label="Email" error={errors.email}>
        <input
          type="email"
          {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' } })}
          className={authInputClass}
          placeholder="you@example.com"
        />
      </AuthField>

      <AuthField label="Password" error={errors.password}>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            {...register('password', { required: 'Password is required' })}
            className={`${authInputClass} pr-20`}
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </AuthField>

      {errorMessage && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="auth-btn w-full rounded-xl bg-white py-4 text-base font-semibold uppercase tracking-[0.2em] text-black disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
};

export default Login;
