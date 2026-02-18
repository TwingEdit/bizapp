// sendPush.js
const webpush = require('web-push');

const vapidKeys = {
  publicKey: 'PUBLIC_VAPID_KEY',
  privateKey: 'PRIVATE_VAPID_KEY'
};

webpush.setVapidDetails('mailto:you@example.com', vapidKeys.publicKey, vapidKeys.privateKey);

// Örnek subscription objesi (tarayıcıdan alıp POST ile kaydetmelisin)
const subscription = /* buraya subscription objesini JSON olarak koy */;

webpush.sendNotification(subscription, JSON.stringify({
  title: 'Seni Öptü!',
  body: '💖 Yeni bir öpücük mesajı geldi'
}))
.then(() => console.log('Push gönderildi ✅'))
.catch(err => console.error('Push gönderilemedi ❌', err));
