const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const cors = require('cors')({origin: true});

exports.addMessage = functions.https.onRequest((req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    return admin.database().ref('/messages').push({original: original}).then((snapshot) => {
      // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
      return res.redirect(303, snapshot.ref.toString());
    });
});

exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
.onCreate((snapshot, context) => {
    // Grab the current value of what was written to the Realtime Database.
    const original = snapshot.val();
    console.log('Uppercasing', context.params.pushId, original);
    const uppercase = original.toUpperCase();
    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to the Firebase Realtime Database.
    // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
    return snapshot.ref.parent.child('uppercase').set(uppercase);
});

exports.sendMessage = functions.https.onRequest((req, res) => {
    cors(req, res, () => {});
    if(req.method !== 'POST') return res.status(401).json({message: 'Not Allowed!'})
    console.log('req.body.tokenApp', req.body)
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    // This registration token comes from the client FCM SDKs.
    const registrationToken = req.body.tokenApp

    // See documentation on defining a message payload.
    const message = {
        notification: {
            body: req.body.message
        },
        data: {
            icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQedh_7E50-s_YyeVx5YzHoavVtJmzXmOvwa2LMi5BlfyTvUin-",
            click_action: "https://fir-hosting-70332.firebaseapp.com",
            body: req.body.message
        },
        token: registrationToken
    };

    // Send a message to the device corresponding to the provided
    // registration token.
    admin.messaging().send(message)
    .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
        return res.status(200).json({
            message: "It worked!",
            success: 1,
            failed: 0
        })
    })
    .catch((error) => {
        console.log('Error sending message:', error);
        return res.status(200).json({
            message: "It worked!",
            success: 0,
            failed: 1
        })
    });
});