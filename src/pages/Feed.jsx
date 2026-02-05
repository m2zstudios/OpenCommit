// Feed page displays the public timeline and commit creation form.
// Public users can read commits; authenticated users can append new ones.
import React, { useEffect, useState } from 'react';
import CommitCard from '../components/CommitCard';
import CommitForm from '../components/CommitForm';
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
        verified: true,
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
      {user && <CommitForm onSubmit={handleCreateCommit} isSubmitting={isSubmitting} />}
      {!user && (
        <div className="card">
          <h2 style={{ marginTop: 0 }}>Public immutable feed</h2>
          <p className="muted">
            Sign in to create a new commit. Public users can always read the timeline.
          </p>
        </div>
      )}

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
    </section>
  );
};

export default Feed;
