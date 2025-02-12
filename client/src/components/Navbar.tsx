import { Link } from 'react-router-dom'; 

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      {/* Title with link */}
      <Link to="/" className="text-white text-2xl font-bold hover:text-gray-300">
        Forktacular
      </Link>

      {/* Account Icon */}
      <div className="text-white text-xl hover:text-gray-300 cursor-pointer">
        <i className="fas fa-user"></i> 
      </div>
    </nav>
  );
};

export default Navbar;