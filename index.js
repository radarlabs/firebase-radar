const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

const COLLECTION_ID = process.env.COLLECTION_ID;

exports.handleEvents = functions.https.onRequest((req, res) => {
  const event = req.body.event;
  db.doc(`${COLLECTION_ID}/${event._id}`).set(event)
    .then(() => res.sendStatus(200))
    .catch((err) => res.status(500).send(`Error saving event. Did you create the ${COLLECTION_ID} collection?`));
});
