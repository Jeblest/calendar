import { auth, db } from "../../config/firebase-config";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export async function createItem(type, item) {
  try {
    const itemRef = collection(db, `${type}s`);
    await addDoc(itemRef, { ...item, userId: auth.currentUser.uid });
  } catch (error) {
    console.error(error);
  }
}

export async function getItems(type, userId) {
  try {
    const itemRef = collection(db, `${type}s`);
    const userTasksQuery = query(itemRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(userTasksQuery);
    const userItems = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return userItems;
  } catch (error) {
    console.error(error);
  }
}

export async function updateItem(type, id, item) {
  try {
    const docRef = doc(db, `${type}s`, id);
    await updateDoc(docRef, item);
  } catch (error) {
    console.error(error);
  }
}

export async function deleteItem(type, id) {
  try {
    const docRef = doc(db, `${type}s`, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(error);
  }
}
