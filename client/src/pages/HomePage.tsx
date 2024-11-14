import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md fixed top-0 w-full flex justify-between items-center px-4 py-2">
        <div className="text-xl font-bold text-center flex-1">Home</div>
        <div className="flex">
          <button className="text-gray-700 hover:text-gray-900">Account</button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/SearchPage')}
            className="bg-blue-500 text-white p-6 rounded shadow hover:bg-blue-600"
          >
            Go to Search Page
          </button>
          <button
            onClick={() => navigate('/RecipeBook')}
            className="bg-green-500 text-white p-6 rounded shadow hover:bg-green-600"
          >
            Go to Recipe Book
          </button>
          <button
            onClick={() => navigate('/RecipeMaker')}
            className="bg-purple-500 text-white p-6 rounded shadow hover:bg-purple-600"
          >
            Go to Recipe Maker
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
