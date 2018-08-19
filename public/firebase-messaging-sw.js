// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
var config = {
    apiKey: "AIzaSyBTDi-VGDaR2XQ-6AgZoTGNsHfmls489c8",
    authDomain: "node-push-20cfd.firebaseapp.com",
    databaseURL: "https://node-push-20cfd.firebaseio.com",
    projectId: "node-push-20cfd",
    storageBucket: "node-push-20cfd.appspot.com",
    messagingSenderId: "388573187868"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    var notificationTitle = 'Background Message Title';
    var notificationOptions = {
      body: 'Background Message body.',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQedh_7E50-s_YyeVx5YzHoavVtJmzXmOvwa2LMi5BlfyTvUin-'
    };
  
    return self.registration.showNotification(notificationTitle,
      notificationOptions);
});