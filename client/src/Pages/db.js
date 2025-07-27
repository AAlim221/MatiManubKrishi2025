// db.js
import { openDB } from "idb";

const DB_NAME = "MarketDB";
const STORE_NAME = "pdfStore";

export async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
}

export async function savePDF(blob, language) {
  const db = await getDB();
  await db.put(STORE_NAME, { blob, language, savedAt: new Date() }, "pdfData");
}

export async function loadPDF() {
  const db = await getDB();
  return await db.get(STORE_NAME, "pdfData");
}

export async function clearPDF() {
  const db = await getDB();
  await db.delete(STORE_NAME, "pdfData");
}
