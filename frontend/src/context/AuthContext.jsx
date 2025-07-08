import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`${API_URL}/api/auth/check`, { withCredentials: true });
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);

  const login = async (password) => {
    try {
      await axios.post(
        `${API_URL}/api/auth/login`,
        { password },
        { withCredentials: true }
      );
      setIsAuthenticated(true);
      navigate('/');
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = async () => {
    await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true });
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
