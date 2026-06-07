import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { loginUser } from '../services/authService';
import { useAuth } from '../hooks/useAuth';
import { getApiErrorMessage } from '../utils/getApiErrorMessage';
import AuthPageShell from './AuthPageShell';
import AuthField, { authInputClass } from './AuthField';

const Login = ({ setToggle }) => {
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
    <AuthPageShell
      title="Sign In"
      subtitle="Enter your credentials to continue"
      footer={
        <div className="text-center text-sm text-white/40">
          Don&apos;t have an account?{' '}
          <button
            type="button"
            onClick={() => setToggle(true)}
            className="auth-link font-medium text-white"
          >
            Create one
          </button>
        </div>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <AuthField label="Email" error={errors.email}>
          <input
            type="text"
            {...register('email', { required: 'Email is required' })}
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
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-[0.18em] text-white/40 hover:text-white transition-colors"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </AuthField>

        {errorMessage && (
          <div className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white/80">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="auth-btn w-full rounded-xl bg-white py-3.5 text-sm font-semibold uppercase tracking-[0.25em] text-black disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </AuthPageShell>
  );
};

export default Login;
