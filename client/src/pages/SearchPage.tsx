import  from 'react';

const RecipeSearchPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md fixed top-0 w-full flex justify-between items-center px-4 py-2">
        <div className="text-xl font-bold text-center flex-1">Recipe Search</div>
        <div className="flex space-x-4">
          <button className="text-gray-700 hover:text-gray-900">Recipe Book</button>
          <button className="text-gray-700 hover:text-gray-900">Recipe Maker</button>
          <button className="text-gray-700 hover:text-gray-900">Account</button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 px-4">
        {/* Search Bar and Filter Button */}
        <div className="flex items-center mb-4">
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Search for recipes..."
          />
          <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Filter
          </button>
        </div>

        {/* TODO add the result field */}
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
