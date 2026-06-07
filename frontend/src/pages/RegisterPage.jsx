import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { registerUser } from '../services/authService';
import { useAuth } from '../hooks/useAuth';
import { getApiErrorMessage } from '../utils/getApiErrorMessage';
import PasswordInput from '../components/PasswordInput';

const passwordRules = {
  required: 'Password is required',
  minLength: { value: 8, message: 'At least 8 characters' },
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
    message: 'Must include uppercase, lowercase, and a number',
  },
};

const RegisterPage = ({ onSwitchToLogin }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
    <div className="glass-card p-8 md:p-10 rounded-2xl w-full max-w-md shadow-2xl">
      <h2 className="text-3xl font-semibold text-center text-white mb-2">Create Account</h2>
      <p className="text-center text-white/50 text-sm mb-8">Join Zudio for premium fashion</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm text-white/70 mb-1.5">Full Name</label>
          <input
            type="text"
            {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'At least 2 characters' } })}
            className="input-field"
            placeholder="Your name"
          />
          {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
        </div>

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
            placeholder="Create a strong password"
            error={errors.password}
            rules={passwordRules}
          />
        </div>

        {errorMessage && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {errorMessage}
          </div>
        )}

        <button type="submit" disabled={isSubmitting} className="btn-primary">
          {isSubmitting ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      <p className="text-center text-white/50 mt-6 text-sm">
        Already have an account?{' '}
        <button type="button" onClick={onSwitchToLogin} className="text-white hover:underline font-medium">
          Sign in
        </button>
      </p>
    </div>
  );
};

export default RegisterPage;
