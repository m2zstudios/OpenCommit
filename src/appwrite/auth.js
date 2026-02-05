// Auth helper functions for email/password authentication.
// We keep authentication minimal and explicit to avoid hidden side effects.
import { Account, ID } from 'appwrite';
import client from './client';

const account = new Account(client);

export const registerUser = (email, password, name) => {
  // Registration uses Appwrite's email/password flow.
  return account.create(ID.unique(), email, password, name);
};

export const loginUser = (email, password) => {
  // Login creates an email/password session so commits can be created.
  return account.createEmailPasswordSession(email, password);
};

export const logoutUser = () => {
  // Logout removes the current session to prevent unintended commit creation.
  return account.deleteSession('current');
};

export const getCurrentUser = () => {
  // Current user info powers the author profile on commit cards.
  return account.get();
};
