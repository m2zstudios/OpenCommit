// Database helper functions for OpenCommit.
// All write operations are CREATE-only to preserve the immutable commit chain.
import { Databases, ID, Query } from 'appwrite';
import client from './client';
import { generateCommitHash } from '../utils/hash';

const databases = new Databases(client);

const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const commitsCollectionId = import.meta.env.VITE_APPWRITE_COMMITS_COLLECTION_ID;

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
  verified,
  content,
  tag,
}) => {
  // WARNING: For strict immutability, the hash must be generated using a server timestamp.
  // In production, move this logic into an Appwrite Function so createdAt is server-derived.
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
