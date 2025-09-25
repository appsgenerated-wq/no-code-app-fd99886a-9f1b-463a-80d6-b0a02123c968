import React from 'react';

const LandingPage = ({ onLogin, isLoading }) => {
  return (
    <div className="min-h-screen bg-yellow-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center bg-white p-10 rounded-xl shadow-lg">
        <h1 className="text-5xl md:text-6xl font-extrabold text-red-600 mb-4">
          HotdogHub
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Discover, rate, and share the world's best hotdogs.
        </p>
        <div className="space-y-4 sm:space-y-0 sm:space-x-4">
          <button 
            onClick={() => onLogin('user@example.com', 'password')}
            disabled={isLoading}
            className="w-full sm:w-auto bg-yellow-500 text-white font-bold px-8 py-3 rounded-lg hover:bg-yellow-600 transition-colors duration-300 disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
          >
            {isLoading ? 'Logging in...' : 'Try Demo User'}
          </button>
          <a 
            href="/admin" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full sm:w-auto bg-gray-700 text-white font-bold px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-300"
          >
            Admin Panel
          </a>
        </div>
        <p className="text-sm text-gray-500 mt-6">Demo credentials: user@example.com / password</p>
      </div>
    </div>
  );
};

export default LandingPage;
