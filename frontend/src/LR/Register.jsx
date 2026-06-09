import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { registerUser } from '../services/authService';
import { useAuth } from '../hooks/useAuth';
import { getApiErrorMessage } from '../utils/getApiErrorMessage';
import AuthField, { authInputClass } from './AuthField';

const passwordRules = {
  required: 'Password is required',
  minLength: { value: 8, message: 'At least 8 characters' },
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
    message: 'Must include uppercase, lowercase, and a number',
  },
};

const Register = () => {
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <AuthField label="Name" error={errors.name}>
        <input
          type="text"
          {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'At least 2 characters' } })}
          className={authInputClass}
          placeholder="Enter your name"
        />
      </AuthField>

      <AuthField label="Email" error={errors.email}>
        <input
          type="email"
          {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' } })}
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
        {isSubmitting ? 'Creating...' : 'Create Account'}
      </button>
    </form>
  );
};

export default Register;
