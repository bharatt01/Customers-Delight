// services/ownerAuthService.ts
//
// Firebase's client SDK signs you in as whichever user you just created
// with createUserWithEmailAndPassword — which would boot the superadmin
// out of their own session. Spinning up a second, throwaway app instance
// (reusing the same project config) sidesteps that: the new user is
// created there, and the superadmin's session on the main `auth` instance
// is never touched.

import { getApp, initializeApp, deleteApp, type FirebaseApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase/firebase";

/** Creates a Firebase Auth account for a shop owner. Does not touch the current session. */
export async function createOwnerAccount(email: string, password: string): Promise<void> {
  const secondaryApp: FirebaseApp = initializeApp(getApp().options, `owner-creation-${Date.now()}`);
  const secondaryAuth = getAuth(secondaryApp);

  try {
    await createUserWithEmailAndPassword(secondaryAuth, email, password);
  } finally {
    // Discard the throwaway app entirely — nothing about it should linger.
    await deleteApp(secondaryApp).catch(() => {});
  }
}

/**
 * For owners who already have an account — sends them a reset link so they
 * can set a new password themselves. This is the only client-side way to
 * change a password for an account you're not currently signed in as.
 */
export async function sendOwnerPasswordReset(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email);
}