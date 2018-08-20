var config = {
    apiKey: "AIzaSyDhreJzt-jtfdY3Z78KFiMfHJWO-2i4SaE",
    authDomain: "fir-hosting-70332.firebaseapp.com",
    databaseURL: "https://fir-hosting-70332.firebaseio.com",
    projectId: "fir-hosting-70332",
    storageBucket: "fir-hosting-70332.appspot.com",
    messagingSenderId: "490551164537"
};
firebase.initializeApp(config);
console.log('fo 2', toasty)
// Retrieve Firebase Messaging object.
const messaging = firebase.messaging();
let tokenApp;
const publicVapidKey = "BJ_-JL6MKGwKFH7K2pILk5sjee6JZAMqSR1_iNG5cTHUA2XGcI6F3qrVxN7ommAlUu7Ms6dzJkjgV-5if5PRiGc";

// Add the public key generated from the console here.
messaging.usePublicVapidKey(publicVapidKey);

messaging.requestPermission().then(function() {
    console.log('Notification permission granted.');
    cleanError();
    // TODO(developer): Retrieve an Instance ID token for use with FCM.
    // ...
}).catch(function(err) {
    console.log('Unable to get permission to notify.', err);
    getError('Necessário aceitar a permissão de notificação que aparece no topo da página.')
});

// Callback fired if Instance ID token is updated.
messaging.onTokenRefresh(function() {
    messaging.getToken().then(function(refreshedToken) {
        console.log('Token refreshed.', refreshedToken);
        // Indicate that the new Instance ID token has not yet been sent to the
        // app server.
        setTokenSentToServer(false);
        // Send Instance ID token to app server.
        sendTokenToServer(refreshedToken);
        // ...
    }).catch(function(err) {
        console.log('Unable to retrieve refreshed token ', err);
        showToken('Unable to retrieve refreshed token ', err);
    });
});

// Get Instance ID token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
messaging.getToken().then(function(currentToken) {
    console.log('currentToken', currentToken)
    if (currentToken) {
    // sendTokenToServer(currentToken);
    // updateUIForPushEnabled(currentToken);
        console.log("if current token success")
        tokenApp = currentToken;
    } else {
    // Show permission request.
    console.log('No Instance ID token available. Request permission to generate one.');
    // Show permission UI.
    // updateUIForPushPermissionRequired();
    // setTokenSentToServer(false);
    }
}).catch(function(err) {
    console.log('An error occurred while retrieving token. ', err);
    // showToken('Error retrieving Instance ID token. ', err);
    // setTokenSentToServer(false);
});

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.setBackgroundMessageHandler` handler.
messaging.onMessage(function(payload) {
    console.log('Message received.1 ', payload.notification.body);
    callToAction(payload.notification.body);
    // ...
});

// messaging.setBackgroundMessageHandler(function(payload) {
//     console.log('[firebase-messaging-sw.js] Received background message ', payload);
//     // Customize notification here
//     var notificationTitle = 'Background Message Title';
//     var notificationOptions = {
//       body: 'Background Message body.',
//       icon: 'https://firebase.google.com/_static/73fc042828/images/firebase/lockup.png?authuser=0'
//     };
  
//     return self.registration.showNotification(notificationTitle,
//       notificationOptions);
// });
