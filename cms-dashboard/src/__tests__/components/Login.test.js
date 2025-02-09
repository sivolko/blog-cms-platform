import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Login from '../../components/auth/Login';
import { signInWithEmailAndPassword } from 'firebase/auth';

jest.mock('firebase/auth');

describe('Login Component', () => {
  it('renders login form', () => {
    const { getByPlaceholderText, getByText } = render(<Login />);
    
    expect(getByPlaceholderText('Email address')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
    expect(getByText('Sign in')).toBeInTheDocument();
  });

  it('handles successful login', async () => {
    signInWithEmailAndPassword.mockResolvedValueOnce();
    
    const { getByPlaceholderText, getByText } = render(<Login />);
    
    fireEvent.change(getByPlaceholderText('Email address'), {
      target: { value: 'test@example.com' }
    });
    
    fireEvent.change(getByPlaceholderText('Password'), {
      target: { value: 'password123' }
    });
    
    fireEvent.click(getByText('Sign in'));
    
    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'test@example.com',
        'password123'
      );
    });
  });
});