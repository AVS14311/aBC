import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useContext } from 'react';
import AuthContext, { AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Birthday from './pages/Birthday';
import Anniversary from './pages/Anniversary';
import Couple from './pages/Couple';
import Vishal from './pages/Vishal';
import Shivani from './pages/Shivani';
import Login from './pages/Login';
import Home from './pages/Home';
import LogoutButton from './components/LogoutButton';

function AppContent() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-blue-50">
      {isAuthenticated && <Navbar />}
      {isAuthenticated && (
        <div className="absolute top-4 right-4">
          <LogoutButton />
        </div>
      )}
      
      <AnimatePresence mode='wait'>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          
          <Route path="/birthday" element={
            <ProtectedRoute>
              <Birthday />
            </ProtectedRoute>
          } />
          
          <Route path="/anniversary" element={
            <ProtectedRoute>
              <Anniversary />
            </ProtectedRoute>
          } />
          
          <Route path="/couple" element={
            <ProtectedRoute>
              <Couple />
            </ProtectedRoute>
          } />
          
          <Route path="/vishal" element={
            <ProtectedRoute>
              <Vishal />
            </ProtectedRoute>
          } />
          
          <Route path="/shivani" element={
            <ProtectedRoute>
              <Shivani />
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}