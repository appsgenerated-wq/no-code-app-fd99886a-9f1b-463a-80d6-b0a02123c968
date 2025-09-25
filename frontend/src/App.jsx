import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import config from './constants';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import './index.css';
import { testBackendConnection, createManifestWithLogging } from './services/apiService.js';

function App() {
  const [user, setUser] = useState(null);
  const [backendConnected, setBackendConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('Testing...');
  const [hotdogs, setHotdogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const manifest = new Manifest({ appId: config.APP_ID });

  useEffect(() => {
    const checkUserSession = async () => {
      setIsLoading(true);
      try {
        const currentUser = await manifest.from('User').me();
        setUser(currentUser);
      } catch (err) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkUserSession();
  }, [])

  useEffect(() => {
    // Enhanced backend connection test with detailed logging
    const testConnection = async () => {
      console.log('🚀 [APP] Starting enhanced backend connection test...');
      console.log('🔍 [APP] Backend URL:', 'https://no-code-app-fd99886a-9f1b-463a-80d6-b0a02123c968.vercel.app');
      console.log('🔍 [APP] App ID:', 'fd99886a-9f1b-463a-80d6-b0a02123c968');
      
      setConnectionStatus('Testing connection...');
      
      const result = await testBackendConnection(3);
      setBackendConnected(result.success);
      
      if (result.success) {
        console.log('✅ [APP] Backend connection successful - proceeding with app initialization');
        setConnectionStatus('Connected');
        
        // Test Manifest SDK connection
        console.log('🔍 [APP] Testing Manifest SDK connection...');
        try {
          const manifest = createManifestWithLogging('fd99886a-9f1b-463a-80d6-b0a02123c968');
          console.log('✅ [APP] Manifest SDK initialized successfully');
        } catch (error) {
          console.error('❌ [APP] Manifest SDK initialization failed:', error);
          setConnectionStatus('SDK Error');
        }
      } else {
        console.error('❌ [APP] Backend connection failed - app may not work properly');
        console.error('❌ [APP] Connection error:', result.error);
        setConnectionStatus('Connection Failed');
      }
    };
    
    testConnection();
  }, []);;

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      await manifest.login('User', email, password);
      const currentUser = await manifest.from('User').me();
      setUser(currentUser);
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await manifest.logout();
    setUser(null);
    setHotdogs([]);
  };

  const loadHotdogs = async () => {
    setIsLoading(true);
    try {
      const response = await manifest.from('Hotdog').find({
        include: ['creator'],
        sort: { createdAt: 'desc' },
      });
      setHotdogs(response.data);
    } catch (err) {
      setError('Failed to load hotdogs.');
      console.error('Load hotdogs error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const createHotdog = async (hotdogData) => {
    try {
      const newHotdog = await manifest.from('Hotdog').create(hotdogData, { 
        include: ['creator']
      });
      setHotdogs([newHotdog, ...hotdogs]);
    } catch (err) {
      setError('Failed to create hotdog. Please try again.');
      console.error('Create hotdog error:', err);
    }
  };

  if (isLoading && !user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {/* Enhanced Backend Connection Status Indicator */}
      <div className="fixed top-4 right-4 z-50">
        <div className={`px-3 py-2 rounded-lg text-xs font-medium shadow-lg ${backendConnected ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}`}>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span>{backendConnected ? '✅ Backend Connected' : '❌ Backend Disconnected'}</span>
          </div>
          <div className="text-xs opacity-75 mt-1">{connectionStatus}</div>
        </div>
      </div>
      
        <p className="text-lg text-gray-600">Loading application...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
       {error && (
        <div className="bg-red-500 text-white text-center p-2 fixed top-0 left-0 right-0 z-50">
          {error}
          <button onClick={() => setError(null)} className="ml-4 font-bold">X</button>
        </div>
      )}
      {!user ? (
        <LandingPage onLogin={login} isLoading={isLoading} />
      ) : (
        <DashboardPage
          user={user}
          hotdogs={hotdogs}
          onLogout={logout}
          onLoadHotdogs={loadHotdogs}
          onCreateHotdog={createHotdog}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default App;
