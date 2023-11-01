import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import ChatPage from '../pages/ChatPage';
import { useAuth } from '../components/Auth/AuthProvider';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

const AppRoutes = () => {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/chat" element={<PrivateRoute />}>
          <Route path="" element={<ChatPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/chat" />} />
      </Routes>
    </Router>
  );
};

const PrivateRoute = () => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default AppRoutes;
