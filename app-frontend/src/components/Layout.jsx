import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Exercise Tracker</h1>
          <nav>
            <Link to="/" className="px-4 py-2 hover:bg-blue-700 rounded">
              Dashboard
            </Link>
            <Link to="/tasks" className="px-4 py-2 hover:bg-blue-700 rounded">
              Daily Tasks
            </Link>
          </nav>
        </div>
      </header>
      <main className="container mx-auto py-8">{children}</main>
    </div>
  );
};

Layout.propTypes = {
    children: propTypes.any
}

export default Layout;
