import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db();
const playlistsCollection = db.collection("playlists");

export { client, db, playlistsCollection };
