// CommitCard renders a single immutable commit in the public feed.
// The UI mirrors Twitter/X cards to make the feed instantly familiar.
import React from 'react';

const CommitCard = ({ commit }) => {
  const createdAt = new Date(commit.createdAt).toLocaleString();

  return (
    <article className="card">
      {/* Header shows author identity and verification status. */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img
          src={commit.authorAvatar}
          alt={`${commit.authorName} avatar`}
          style={{ width: 48, height: 48, borderRadius: '50%' }}
        />
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <strong>{commit.authorName}</strong>
            {commit.verified && (
              <span className="badge" aria-label="Verified">
                ✔ Verified
              </span>
            )}
          </div>
          {commit.authorHeadline && <div className="muted">{commit.authorHeadline}</div>}
          {commit.authorLocation && <div className="muted">{commit.authorLocation}</div>}
          <div className="muted">{createdAt}</div>
        </div>
      </div>

      {commit.authorBio && (
        <p className="muted" style={{ marginTop: '12px' }}>
          {commit.authorBio}
        </p>
      )}

      {/* Content and tag are immutable once written. */}
      <p style={{ marginTop: '16px', marginBottom: '12px', whiteSpace: 'pre-wrap' }}>
        {commit.content}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <span className="badge">{commit.tag}</span>
        <span className="muted">Commit Hash:</span>
        <span style={{ fontFamily: 'monospace', fontSize: '12px', color: '#1d9bf0' }}>
          {commit.commitHash}
        </span>
      </div>

      {Array.isArray(commit.authorSocials) && commit.authorSocials.length > 0 && (
        <div style={{ marginTop: '12px' }}>
          <div className="muted">Social links</div>
          <ul className="social-list">
            {commit.authorSocials.map((link) => (
              <li key={link}>
                <a href={link} target="_blank" rel="noreferrer">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
};

export default CommitCard;
