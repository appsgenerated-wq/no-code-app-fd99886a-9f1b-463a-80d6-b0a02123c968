import React, { useEffect, useState } from 'react';

const DashboardPage = ({ user, hotdogs, onLogout, onLoadHotdogs, onCreateHotdog, isLoading }) => {
  const [newHotdog, setNewHotdog] = useState({ name: '', description: '', rating: 3 });
  const [photoFile, setPhotoFile] = useState(null);

  useEffect(() => {
    onLoadHotdogs();
  }, []);

  const handleCreateHotdog = async (e) => {
    e.preventDefault();
    if (!newHotdog.name || !photoFile) {
      alert('Please provide a name and a photo for the hotdog.');
      return;
    }
    const hotdogData = { ...newHotdog, photo: photoFile };
    await onCreateHotdog(hotdogData);
    setNewHotdog({ name: '', description: '', rating: 3 });
    setPhotoFile(null);
    e.target.reset(); // Reset form fields
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-red-600">HotdogHub</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, {user.name}!</span>
            <button 
              onClick={onLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Submit a Hotdog</h2>
          <form onSubmit={handleCreateHotdog} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Hotdog Name</label>
              <input
                id="name"
                type="text"
                placeholder="e.g., Chicago Style Classic"
                value={newHotdog.name}
                onChange={(e) => setNewHotdog({...newHotdog, name: e.target.value})}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="description"
                placeholder="What makes it so special?"
                value={newHotdog.description}
                onChange={(e) => setNewHotdog({...newHotdog, description: e.target.value})}
                rows="3"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
             <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating: {newHotdog.rating} / 5</label>
              <input
                id="rating"
                type="range"
                min="1"
                max="5"
                step="1"
                value={newHotdog.rating}
                onChange={(e) => setNewHotdog({...newHotdog, rating: parseInt(e.target.value)})}
                className="mt-1 block w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-500"
              />
            </div>
             <div>
              <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Photo</label>
              <input
                id="photo"
                type="file"
                accept="image/*"
                onChange={(e) => setPhotoFile(e.target.files[0])}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                required
              />
            </div>
            <button type="submit" className="w-full bg-yellow-500 text-white font-bold py-2 px-4 rounded-md hover:bg-yellow-600 transition-colors disabled:bg-gray-400">
              Submit Hotdog
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Latest Submissions</h2>
          {isLoading && hotdogs.length === 0 ? (
            <p className="text-gray-500">Loading hotdogs...</p>
          ) : hotdogs.length === 0 ? (
            <p className="text-gray-500">No hotdogs submitted yet. Be the first!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotdogs.map(hotdog => (
                <div key={hotdog.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <img src={hotdog.photo.thumbnail} alt={hotdog.name} className="w-full h-56 object-cover" />
                  <div className="p-4">
                    <h3 className="font-bold text-xl text-gray-900">{hotdog.name}</h3>
                    <div className="flex items-center my-2">
                        {[...Array(5)].map((_, i) => (
                           <svg key={i} className={`w-5 h-5 ${i < hotdog.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                           </svg>
                        ))}
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{hotdog.description}</p>
                    <p className="text-xs text-gray-500">Submitted by: {hotdog.creator?.name || 'Unknown'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
