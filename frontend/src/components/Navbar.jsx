import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Navbar() {
  const { logout } = useContext(AuthContext);
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo / Title */}
        <Link to="/" className="text-2xl font-bold hover:text-blue-200 transition">
          Vishal & Shivani 💑
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link 
            to="/anniversary" 
            className="hover:text-blue-200 transition font-medium"
          >
            Anniversary
          </Link>
          <Link 
            to="/birthday" 
            className="hover:text-blue-200 transition font-medium"
          >
            Birthday
          </Link>
          <Link 
            to="/couple" 
            className="hover:text-blue-200 transition font-medium"
          >
            Couple
          </Link>
          <Link 
            to="/vishal" 
            className="hover:text-blue-200 transition font-medium"
          >
            Vishal
          </Link>
          <Link 
            to="/shivani" 
            className="hover:text-blue-200 transition font-medium"
          >
            Shivani
          </Link>
          <button
            onClick={logout}
            className="ml-6 px-4 py-2 bg-white text-blue-600 rounded font-semibold hover:bg-blue-100 transition"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}