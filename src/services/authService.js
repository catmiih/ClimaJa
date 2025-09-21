import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "../lib/firebase";

setPersistence(auth, browserLocalPersistence).catch(() => {});

export function onAuth(cb) {
  return onAuthStateChanged(auth, cb);
}

export async function login(email, password) {
  const res = await signInWithEmailAndPassword(auth, email, password);
  return res.user;
}

export async function register(email, password, displayName) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) {
    const { updateProfile } = await import("firebase/auth");
    await updateProfile(user, { displayName });
  }
  return user;
}

export async function logout() {
  await signOut(auth);
}

export function currentUser() {
  return auth.currentUser;
}
