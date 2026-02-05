// Database helper functions for OpenCommit.
// All write operations are CREATE-only to preserve the immutable commit chain.
import { Databases, Functions, ID, Query } from 'appwrite';
import client from './client';
import { generateCommitHash } from '../utils/hash';

const databases = new Databases(client);
const functions = new Functions(client);

const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const commitsCollectionId = import.meta.env.VITE_APPWRITE_COMMITS_COLLECTION_ID;
const commitFunctionId = import.meta.env.VITE_APPWRITE_COMMIT_FUNCTION_ID;
const verifiedUserId = import.meta.env.VITE_VERIFIED_USER_ID;

export const listCommits = async () => {
  // The feed is ordered in reverse chronological order for the public timeline.
  const response = await databases.listDocuments(databaseId, commitsCollectionId, [
    Query.orderDesc('createdAt'),
  ]);
  return response.documents;
};

export const getLatestCommit = async () => {
  // Fetch the most recent commit so we can chain hashes for immutability.
  const response = await databases.listDocuments(databaseId, commitsCollectionId, [
    Query.orderDesc('createdAt'),
    Query.limit(1),
  ]);
  return response.documents[0] || null;
};

export const createCommit = async ({
  authorId,
  authorName,
  authorAvatar,
  authorBio,
  authorHeadline,
  authorLocation,
  authorSocials,
  content,
  tag,
}) => {
  // Only the configured verified user ID is allowed to set verified to true.
  const verified = Boolean(verifiedUserId && authorId === verifiedUserId);

  // Strict immutability requires server timestamps and hashing.
  // If a function is configured, delegate commit creation to the server.
  if (commitFunctionId) {
    const execution = await functions.createExecution(
      commitFunctionId,
      JSON.stringify({
        authorId,
        authorName,
        authorAvatar,
        authorBio,
        authorHeadline,
        authorLocation,
        authorSocials,
        verified,
        content,
        tag,
      })
    );
    return JSON.parse(execution.response);
  }

  // Fallback for local development when no function is configured.
  // WARNING: This uses a client timestamp and should not be used in production.
  const previousCommit = await getLatestCommit();
  const previousCommitHash = previousCommit?.commitHash || null;
  const createdAt = new Date().toISOString();
  const commitHash = await generateCommitHash({ content, createdAt, previousCommitHash });

  // Only CREATE is permitted by Appwrite rules; no updates or deletes are allowed.
  const response = await databases.createDocument(
    databaseId,
    commitsCollectionId,
    ID.unique(),
    {
      authorId,
      authorName,
      authorAvatar,
      authorBio,
      authorHeadline,
      authorLocation,
      authorSocials,
      verified,
      content,
      tag,
      createdAt,
      previousCommitHash,
      commitHash,
    }
  );

  return response;
};
