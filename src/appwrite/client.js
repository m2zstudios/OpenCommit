// Appwrite client setup for OpenCommit.
// Centralizing the client keeps network configuration consistent and auditable.
import { Client } from 'appwrite';

const client = new Client();

// These environment variables must be provided by the deploy target (Netlify).
// Using env variables makes it clear what is configured outside the codebase.
client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export default client;
