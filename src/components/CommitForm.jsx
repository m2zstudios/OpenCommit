// CommitForm allows authenticated users to add a new immutable commit.
// The form only creates new commits and never exposes edit/delete actions.
import React, { useState } from 'react';

const CommitForm = ({ onSubmit, isSubmitting }) => {
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('Personal');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ content, tag });
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2 style={{ marginTop: 0 }}>Create a new commit</h2>
      <p className="muted">
        Commits are append-only. Once published, they can never be edited or deleted.
      </p>
      {/* Content becomes part of the hash chain, so users must be deliberate. */}
      <label style={{ display: 'block', marginBottom: '12px' }}>
        Commit text
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Write your immutable commitment..."
          required
        />
      </label>

      <label style={{ display: 'block', marginBottom: '12px' }}>
        Tag
        <select value={tag} onChange={(event) => setTag(event.target.value)}>
          <option value="Personal">Personal</option>
          <option value="Product">Product</option>
          <option value="Career">Career</option>
          <option value="Discipline">Discipline</option>
        </select>
      </label>

      <button className="primary-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Publishing…' : 'Publish commit'}
      </button>
    </form>
  );
};

export default CommitForm;
