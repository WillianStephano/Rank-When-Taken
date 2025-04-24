import {
    arrayUnion,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

export const addGameResult = async (gameDate, playerData) => {
  const gameRef = doc(db, "games", gameDate);
  await setDoc(
    gameRef,
    {
      players: arrayUnion({
        ...playerData,
        timestamp: new Date().toISOString(),
      }),
    },
    { merge: true }
  );
};

export const getDailyRanking = async (date) => {
  const docSnap = await getDoc(doc(db, "games", date));
  return docSnap.exists()
    ? (docSnap.data().players || []).sort((a, b) => b.totalScore - a.totalScore)
    : [];
};

export const getDates = async () => {
  const querySnapshot = await getDocs(query(collection(db, "games")));
  return querySnapshot.docs
    .map((doc) => doc.id)
    .sort()
    .reverse();
};
