import { auth } from "../lib/firebase";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const db = getFirestore();

export async function findFavoriteByName(name) {
  const all = await listFavorites();
  return all.find((f) => f.name.toLowerCase() === String(name).toLowerCase());
}

export async function toggleFavoriteByName({ name, region }) {
  const exists = await findFavoriteByName(name);
  if (exists) {
    await removeFavorite(exists.id);
    return { saved: false, id: exists.id };
  } else {
    const created = await addFavorite({ name, region });
    return { saved: true, id: created.id };
  }
}

export async function isFavorite(name) {
  const all = await listFavorites();
  return all.find((f) => f.name.toLowerCase() === name.toLowerCase());
}

function colRef() {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Usuário não autenticado");
  return collection(db, "users", uid, "favorites");
}

export async function addFavorite({ name, region }) {
  const ref = await addDoc(colRef(), {
    name: (name || "").trim(),
    region: (region || "").trim(),
    createdAt: Date.now(),
  });
  return { id: ref.id, name, region };
}

export async function listFavorites() {
  const snap = await getDocs(colRef());
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getFavorite(id) {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Usuário não autenticado");
  const ref = doc(db, "users", uid, "favorites", id);
  const snap = await getDoc(ref);
  return snap.exists() ? { id, ...snap.data() } : null;
}

export async function updateFavorite(id, data) {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Usuário não autenticado");
  const ref = doc(db, "users", uid, "favorites", id);
  await updateDoc(ref, data);
}

export async function removeFavorite(id) {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Usuário não autenticado");
  const ref = doc(db, "users", uid, "favorites", id);
  await deleteDoc(ref);
}
