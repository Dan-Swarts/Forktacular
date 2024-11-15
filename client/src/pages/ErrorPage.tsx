const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-2xl mt-4 text-gray-700">Oops! This page is toast.</p>
        <p className="mt-2 text-gray-600">Looks like you bit off more than you could chew or used the wrong ingredient.</p>
        <button
          onClick={() => window.history.back()}
          className="mt-6 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
