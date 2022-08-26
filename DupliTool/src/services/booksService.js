import { db } from "firebase-config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

export const getAllBooks = async() => {
    try {
        const booksCollectionRef = collection(db, "AllBooks")
        const q = query(booksCollectionRef)

        const res = await getDocs(q) 
        const booksArr = res.docs.map((doc) =>
        doc.data()
      );
      console.log(booksArr)
      return booksArr;
    } catch (err) {
        console.log(err);
      }
}