import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { loginUser } from '../services/authService';
import { useAuth } from '../hooks/useAuth';
import { getApiErrorMessage } from '../utils/getApiErrorMessage';
import PasswordInput from '../components/PasswordInput';

const LoginPage = ({ onSwitchToRegister }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setErrorMessage('');
    try {
      const response = await loginUser(data);
      login({ token: response.token, user: response.user });
      navigate('/home');
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, 'Invalid email or password.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-card p-8 md:p-10 rounded-2xl w-full max-w-md shadow-2xl">
      <h2 className="text-3xl font-semibold text-center text-white mb-2">Welcome Back</h2>
      <p className="text-center text-white/50 text-sm mb-8">Sign in to continue shopping</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm text-white/70 mb-1.5">Email</label>
          <input
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
            })}
            className="input-field"
            placeholder="you@example.com"
          />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm text-white/70 mb-1.5">Password</label>
          <PasswordInput
            register={register}
            name="password"
            placeholder="Enter your password"
            error={errors.password}
            rules={{ required: 'Password is required' }}
          />
        </div>

        {errorMessage && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {errorMessage}
          </div>
        )}

        <button type="submit" disabled={isSubmitting} className="btn-primary">
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <p className="text-center text-white/50 mt-6 text-sm">
        Don&apos;t have an account?{' '}
        <button type="button" onClick={onSwitchToRegister} className="text-white hover:underline font-medium">
          Create account
        </button>
      </p>
    </div>
  );
};

export default LoginPage;
