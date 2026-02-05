// Navbar component for top-level navigation and session actions.
// This provides access to the feed and authentication flows without routing.
import React from 'react';

const Navbar = ({ currentView, onNavigate, user, onLogout }) => {
  return (
    <nav className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      {/* Brand area explains the immutable purpose of the product. */}
      <div style={{ fontWeight: 700, fontSize: '20px' }}>OpenCommit</div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          className="secondary-button"
          type="button"
          onClick={() => onNavigate('feed')}
          aria-pressed={currentView === 'feed'}
        >
          Feed
        </button>
        {!user && (
          <>
            <button
              className="secondary-button"
              type="button"
              onClick={() => onNavigate('login')}
              aria-pressed={currentView === 'login'}
            >
              Login
            </button>
            <button
              className="secondary-button"
              type="button"
              onClick={() => onNavigate('register')}
              aria-pressed={currentView === 'register'}
            >
              Register
            </button>
          </>
        )}
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
        {user ? (
          <>
            <span className="muted">Signed in as {user.name}</span>
            <button className="secondary-button" type="button" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <span className="muted">Public read-only view</span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
