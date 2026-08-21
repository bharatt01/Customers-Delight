// hooks/useOwnerShop.ts
//
// Matches the signed-in Firebase Auth user's email against shops.ownerEmail.
// No uid-syncing step needed — the superadmin just types the owner's email
// into the shop form like any other field.

import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";
import { Shop } from "@/types/shop";

type Status = "loading" | "signed-out" | "no-shop" | "ready";

export function useOwnerShop() {
  const [status, setStatus] = useState<Status>("loading");
  const [user, setUser] = useState<User | null>(null);
  const [shop, setShop] = useState<Shop | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (!firebaseUser || !firebaseUser.email) {
        setShop(null);
        setStatus("signed-out");
        return;
      }

      const q = query(
        collection(db, "shops"),
        where("ownerEmail", "==", firebaseUser.email.toLowerCase()),
        limit(1)
      );
      const snap = await getDocs(q);

      if (snap.empty) {
        setShop(null);
        setStatus("no-shop");
        return;
      }

      setShop({ id: snap.docs[0].id, ...snap.docs[0].data() } as Shop);
      setStatus("ready");
    });

    return () => unsub();
  }, []);

  return { status, user, shop };
}