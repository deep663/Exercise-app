
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

function Header() {
    const isAuthenticated = useIsAuthenticated();
    const signOut = useSignOut();
    const navigate = useNavigate();

  return (
    <header className="bg-gray-800 text-white shadow-md fixed w-full top-0 left-0 z-10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl md:text-3xl font-bold text-red-600 hover:text-red-700">
          Mission Fitness
        </Link>

        {/* Navigation Links */}
        {isAuthenticated && (<nav className="space-x-6 hidden md:flex">
          <Link to="/" className="hover:text-gray-400">Home</Link>
          <Link to="/dashboard" className="hover:text-gray-400">Dashboard</Link>
          <Link to="/tasks" className="hover:text-gray-400">Daily Tasks</Link>
        </nav>)}

        {/* Call to Action Button */}
        {isAuthenticated ? (
            <button onClick={() => {signOut(); navigate("/"); }} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md  md:font-semibold flex items-center gap-2">
                Log out
                <FaSignOutAlt className='hidden md:flex'/>
            </button>
        ) : (<Link
          to="/login"
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-semibold"
        >
          Sign In
        </Link>)}
      </div>
    </header>
  );
}

export default Header;
