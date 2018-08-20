// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
var config = {
    apiKey: "AIzaSyDhreJzt-jtfdY3Z78KFiMfHJWO-2i4SaE",
    authDomain: "fir-hosting-70332.firebaseapp.com",
    databaseURL: "https://fir-hosting-70332.firebaseio.com",
    projectId: "fir-hosting-70332",
    storageBucket: "fir-hosting-70332.appspot.com",
    messagingSenderId: "490551164537"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
    alert('entrou aqui')
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    var notificationTitle = 'Background Message Title 111';
    var notificationOptions = {
      body: payload.data.body,
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQedh_7E50-s_YyeVx5YzHoavVtJmzXmOvwa2LMi5BlfyTvUin-'
    };
  
    return self.registration.showNotification(notificationTitle, notificationOptions);
});