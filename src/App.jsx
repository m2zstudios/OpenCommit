// App component orchestrates navigation and authentication state.
// The feed remains public while commit creation is restricted to authenticated users.
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Feed from './pages/Feed';
import Login from './pages/Login';
import Register from './pages/Register';
import { getCurrentUser, logoutUser } from './appwrite/auth';

const App = () => {
  const [currentView, setCurrentView] = useState('feed');
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const loadUser = async () => {
    try {
      const account = await getCurrentUser();
      setUser(account);
    } catch (error) {
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    setCurrentView('feed');
  };

  const handleAuthSuccess = async () => {
    await loadUser();
    setCurrentView('feed');
  };

  return (
    <div className="container">
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        user={user}
        onLogout={handleLogout}
      />
      {loadingUser ? (
        <div className="card">Loading session…</div>
      ) : (
        <main style={{ marginTop: '24px' }}>
          {currentView === 'login' && <Login onLogin={handleAuthSuccess} />}
          {currentView === 'register' && <Register onRegister={handleAuthSuccess} />}
          {currentView === 'feed' && <Feed user={user} />}
        </main>
      )}
    </div>
  );
};

export default App;
