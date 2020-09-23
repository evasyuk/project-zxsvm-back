// The Firebase Admin SDK to access Cloud Firestore.
import admin from "firebase-admin"

admin.initializeApp({
  credential: admin.credential.cert('./firebase-adminsdk.json'),
  databaseURL: process.env.DB_URL,
});

export default function (ctx, next) {
  ctx.fireadmin = admin
  return next()
}
