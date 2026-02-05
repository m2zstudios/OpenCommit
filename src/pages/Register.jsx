// Register page for new users.
// Registration keeps the user identity simple for immutable authorship.
import React, { useState } from 'react';
import { loginUser, registerUser, updateUserPrefs } from '../appwrite/auth';

const Register = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [headline, setHeadline] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [socialOne, setSocialOne] = useState('');
  const [socialTwo, setSocialTwo] = useState('');
  const [socialThree, setSocialThree] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setIsSubmitting(true);
    setError('');
    try {
      await registerUser(email, password, name);
      await loginUser(email, password);
      await updateUserPrefs({
        avatar,
        headline,
        location,
        bio,
        socialLinks: [socialOne, socialTwo, socialThree].filter(Boolean),
      });
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
      <p className="muted">
        Your profile details become part of your public identity on immutable commits.
      </p>
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
      <label style={{ display: 'block', marginBottom: '12px' }}>
        Confirm password
        <input
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
        />
      </label>
      <label style={{ display: 'block', marginBottom: '12px' }}>
        Avatar URL
        <input
          type="url"
          value={avatar}
          onChange={(event) => setAvatar(event.target.value)}
          placeholder="https://..."
        />
      </label>
      <label style={{ display: 'block', marginBottom: '12px' }}>
        Headline
        <input
          type="text"
          value={headline}
          onChange={(event) => setHeadline(event.target.value)}
          placeholder="Founder, Builder, Creator"
        />
      </label>
      <label style={{ display: 'block', marginBottom: '12px' }}>
        Location
        <input
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="City, Country"
        />
      </label>
      <label style={{ display: 'block', marginBottom: '12px' }}>
        Bio
        <textarea
          value={bio}
          onChange={(event) => setBio(event.target.value)}
          placeholder="Tell the world what you are committing to."
        />
      </label>
      <label style={{ display: 'block', marginBottom: '12px' }}>
        Social link 1
        <input
          type="url"
          value={socialOne}
          onChange={(event) => setSocialOne(event.target.value)}
          placeholder="https://..."
        />
      </label>
      <label style={{ display: 'block', marginBottom: '12px' }}>
        Social link 2
        <input
          type="url"
          value={socialTwo}
          onChange={(event) => setSocialTwo(event.target.value)}
          placeholder="https://..."
        />
      </label>
      <label style={{ display: 'block', marginBottom: '12px' }}>
        Social link 3
        <input
          type="url"
          value={socialThree}
          onChange={(event) => setSocialThree(event.target.value)}
          placeholder="https://..."
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
