import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { registerUser } from '../services/authService';
import { useAuth } from '../hooks/useAuth';
import { getApiErrorMessage } from '../utils/getApiErrorMessage';
import AuthPageShell from './AuthPageShell';
import AuthField, { authInputClass } from './AuthField';

const passwordRules = {
  required: 'Password is required',
  minLength: { value: 8, message: 'At least 8 characters' },
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
    message: 'Must include uppercase, lowercase, and a number',
  },
};

const Register = ({ setToggle }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await registerUser(data);
      login({ token: response.token, user: response.user });
      navigate('/home');
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, 'Registration failed.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthPageShell
      title="Join"
      subtitle="Create your account and start exploring"
      footer={
        <div className="text-center text-sm text-white/40">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => setToggle(false)}
            className="auth-link font-medium text-white"
          >
            Sign in
          </button>
        </div>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <AuthField label="Name" error={errors.name}>
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
            className={authInputClass}
            placeholder="Enter your name"
          />
        </AuthField>

        <AuthField label="Email" error={errors.email}>
          <input
            type="text"
            {...register('email', { required: 'Email is required' })}
            className={authInputClass}
            placeholder="Enter your email"
          />
        </AuthField>

        <AuthField label="Password" error={errors.password}>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password', passwordRules)}
              className={`${authInputClass} pr-20`}
              placeholder="Enter your password"
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
          {isSubmitting ? 'Creating...' : 'Create Account'}
        </button>
      </form>
    </AuthPageShell>
  );
};

export default Register;
