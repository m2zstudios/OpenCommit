// Feed page displays the public timeline and commit creation form.
// Public users can read commits; authenticated users can append new ones.
import React, { useEffect, useState } from 'react';
import CommitCard from '../components/CommitCard';
import CommitForm from '../components/CommitForm';
import PricingSection from '../components/PricingSection';
import { createCommit, listCommits } from '../appwrite/database';

const Feed = ({ user }) => {
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchCommits = async () => {
    try {
      setLoading(true);
      const documents = await listCommits();
      setCommits(documents);
    } catch (fetchError) {
      setError('Unable to load commits. Please check your Appwrite setup.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommits();
  }, []);

  const handleCreateCommit = async ({ content, tag }) => {
    if (!user) return;
    setIsSubmitting(true);
    setError('');
    try {
      await createCommit({
        authorId: user.$id,
        authorName: user.name,
        authorAvatar: user.prefs?.avatar || 'https://i.pravatar.cc/150?img=32',
        authorBio: user.prefs?.bio || '',
        authorHeadline: user.prefs?.headline || '',
        authorLocation: user.prefs?.location || '',
        authorSocials: user.prefs?.socialLinks || [],
        content,
        tag,
      });
      await fetchCommits();
    } catch (submitError) {
      setError('Commit creation failed. Ensure Appwrite permissions allow create only.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      <div className="feed-layout">
        <aside className="feed-column">
          <div className="card">
            <h2 style={{ marginTop: 0 }}>Your profile</h2>
            {user ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img
                    src={user.prefs?.avatar || 'https://i.pravatar.cc/150?img=32'}
                    alt="User avatar"
                    style={{ width: 64, height: 64, borderRadius: '50%' }}
                  />
                  <div>
                    <strong>{user.name}</strong>
                    <div className="muted">{user.prefs?.headline || 'Unverified member'}</div>
                  </div>
                </div>
                <p style={{ marginTop: '12px' }}>
                  {user.prefs?.bio || 'Add a bio in your profile to make your commits richer.'}
                </p>
                <div className="muted">{user.prefs?.location}</div>
                {user.prefs?.socialLinks?.length ? (
                  <ul className="social-list">
                    {user.prefs.socialLinks.map((link) => (
                      <li key={link}>
                        <a href={link} target="_blank" rel="noreferrer">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </>
            ) : (
              <p className="muted">
                Create an account to build a rich profile and publish immutable commits.
              </p>
            )}
          </div>
          {user && <CommitForm onSubmit={handleCreateCommit} isSubmitting={isSubmitting} />}
          {!user && (
            <div className="card">
              <h2 style={{ marginTop: 0 }}>Public immutable feed</h2>
              <p className="muted">
                Sign in to create a new commit. Public users can always read the timeline.
              </p>
            </div>
          )}
        </aside>

        <div className="feed-column">
          {error && (
            <div className="card" role="alert">
              <strong>{error}</strong>
            </div>
          )}

          {loading ? (
            <div className="card">Loading commits…</div>
          ) : (
            commits.map((commit) => <CommitCard key={commit.$id} commit={commit} />)
          )}
        </div>
      </div>

      <PricingSection />
    </section>
  );
};

export default Feed;
