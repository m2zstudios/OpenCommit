// Hash utilities for OpenCommit.
// The commit hash chains content + timestamp + previous hash to enforce immutability.
export const generateCommitHash = async ({ content, createdAt, previousCommitHash }) => {
  const encoder = new TextEncoder();
  const payload = `${content}|${createdAt}|${previousCommitHash || ''}`;
  const data = encoder.encode(payload);

  // SHA-256 ensures that any change to content or timestamps breaks the chain.
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
};
