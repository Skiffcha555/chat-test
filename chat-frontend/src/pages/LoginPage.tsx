import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/Auth/AuthProvider';
import LoginComponent from '../components/Auth/LoginComponent';
import { useEffect } from 'react';

const LoginPage = () => {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      handleLogin(localStorage.getItem('token') || '', localStorage.getItem('email') || '')
      navigate('/chat')
    }
  }, [])
  
  return (
    <LoginComponent />
  );
};

export default LoginPage;
