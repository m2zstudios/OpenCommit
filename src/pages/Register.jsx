// Register page for new users.
// Registration keeps the user identity simple for immutable authorship.
import React, { useState } from 'react';
import { registerUser } from '../appwrite/auth';

const Register = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      await registerUser(email, password, name);
      onRegister();
    } catch (registerError) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2 style={{ marginTop: 0 }}>Create an account</h2>
      <label style={{ display: 'block', marginBottom: '12px' }}>
        Name
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </label>
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
        {isSubmitting ? 'Creating…' : 'Register'}
      </button>
    </form>
  );
};

export default Register;
