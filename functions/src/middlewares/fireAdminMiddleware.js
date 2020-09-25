// The Firebase Admin SDK to access Cloud Firestore.
import admin from "firebase-admin"

import { DB_URL } from '../helper/AppConfigHelper'

admin.initializeApp({
  credential: admin.credential.cert('./firebase-adminsdk.json'),
  databaseURL: DB_URL,
});

export default function (ctx, next) {
  ctx.fireadmin = admin
  return next()
}
