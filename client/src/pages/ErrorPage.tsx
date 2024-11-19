const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-[#fef3d0]">
      {/* Navbar */}
      <nav className="bg-[#f5d3a4] shadow-md fixed top-0 w-full flex justify-between items-center px-4 py-2">
        <div className="text-2xl font-bold text-[#a84e24] flex-1 text-center">Error</div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 px-4 text-center">
        <h1 className="text-6xl font-bold text-[#e75456]">404</h1>
        <p className="text-2xl mt-4 text-[#a84e24]">Oops! This page is toast.</p>
        <p className="mt-2 text-[#a84e24]">Looks like you bit off more than you could chew or used the wrong ingredient.</p>
        <button
          onClick={() => window.history.back()}
          className="mt-6 px-4 py-2 bg-[#ff9e40] text-white rounded-lg shadow hover:bg-[#e7890c]"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;