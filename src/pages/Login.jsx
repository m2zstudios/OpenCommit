// Login page for email/password sessions.
// Authentication gates commit creation but never hides the public feed.
import React, { useState } from 'react';
import { loginUser } from '../appwrite/auth';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      await loginUser(email, password);
      onLogin();
    } catch (loginError) {
      setError('Login failed. Check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2 style={{ marginTop: 0 }}>Login</h2>
      <p className="muted">
        Verified badges are reserved for the official OpenCommit account.
      </p>
      <label style={{ display: 'block', marginBottom: '12px' }}>
        Email
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </label>
      <label style={{ display: 'block', marginBottom: '12px' }}>
        Password
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </label>
      {error && <div className="muted" style={{ marginBottom: '12px' }}>{error}</div>}
      <button className="primary-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Signing in…' : 'Login'}
      </button>
    </form>
  );
};

export default Login;
