import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import CocktailsFeed from './components/CocktailsFeed';
import './App.css';

const AppContent = () => {
  const { isAuthenticated, isLoggingIn, login, logout } = useAuth();

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="neon-title">MIXOLOGY</h1>
        <div className="auth-controls">
          {isAuthenticated ? (
            <button className="neon-button logout-btn" onClick={logout}>
              LOGOUT
            </button>
          ) : (
            <button 
              className="neon-button" 
              onClick={login} 
              disabled={isLoggingIn}
            >
              {isLoggingIn ? 'LOGGING IN...' : 'LOGIN'}
            </button>
          )}
        </div>
      </header>
      
      <main className="app-main">
        {isAuthenticated ? (
          <CocktailsFeed />
        ) : (
          <div className="login-prompt">
            <div className="neon-border-box">
              <h2 className="neon-text-small">Welcome to Mixology Hub</h2>
              <p>Please login to view cocktails feed.</p>
              <button 
                className="neon-button big-btn" 
                onClick={login} 
                disabled={isLoggingIn}
              >
                {isLoggingIn ? 'LOGGING IN...' : 'CLICK TO ENTER'}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
