import { useContext } from 'react';
import AuthContext  from '../context/AuthContext';
import LogoutButton from '../components/LogoutButton';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Welcome to Your Private Gallery</h1>
      <p className="mb-4">You are successfully logged in!</p>
      <LogoutButton />
    </div>
  );
};

export default Home;