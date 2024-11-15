import { useNavigate } from 'react-router-dom';

const RecipeSearchPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fef3d0]">
      {/* Navbar */}
      <nav className="bg-[#f5d3a4] shadow-md fixed top-0 left-0 right-0 flex justify-between items-center px-6 py-2 max-w-7xl mx-auto z-10">
  {/* Forktacular button on the left */}
  <button
    onClick={() => navigate('/')}
    className="text-[#a84e24] hover:text-[#b7572e] font-semibold"
  >
    Forktacular
  </button>

  {/* Title centered */}
  <div className="text-2xl font-bold text-[#a84e24] flex-1 text-center">
    Recipe Search
  </div>

  {/* Navigation buttons on the right */}
  <div className="flex space-x-4">
    <button onClick={() => navigate('/recipe-book')} className="text-[#a84e24] hover:text-[#b7572e]">Recipe Book</button>
    <button onClick={() => navigate('/recipe-maker')} className="text-[#a84e24] hover:text-[#b7572e]">Recipe Maker</button>
    <button onClick={() => navigate('/user-info')} className="text-[#a84e24] hover:text-[#b7572e]">Account</button>
  </div>
</nav>

      {/* Main Content */}
      <div className="pt-20 px-4">
        {/* Search Bar and Filter Button */}
        <div className="flex items-center mb-4">
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#ff9e40]"
            placeholder="Search for recipes..."
          />
          <button className="ml-2 bg-[#ff9e40] text-white px-4 py-2 rounded-md hover:bg-[#e7890c] transition-colors">
            Filter
          </button>
        </div>

        {/* Search Results */}
        <div className="h-96 overflow-y-auto bg-white shadow-md rounded p-4">
          <p className="text-gray-500">Search results will appear here...</p>
          {/* You can map search results here later */}
        </div>
      </div>
    </div>
  );
};

export default RecipeSearchPage;