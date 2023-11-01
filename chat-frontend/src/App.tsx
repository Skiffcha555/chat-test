import React from 'react';
import './App.css';
import { AuthProvider } from './components/Auth/AuthProvider';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};
export default App;
