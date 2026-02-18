// sendPush.js
const webpush = require('web-push');

// VAPID anahtarlarını bir kez oluştur
const vapidKeys = webpush.generateVAPIDKeys();
webpush.setVapidDetails(
  'mailto:you@example.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// Kullanıcının subscription objesi (tarayıcıdan alıp kaydettiğin)
const subscription = /* veritabanından al veya test için kaydet */;

webpush.sendNotification(subscription, JSON.stringify({
  title: 'Öpücük!',
  body: 'Yeni mesaj geldi 💖'
}))
.then(() => console.log('Push gönderildi ✅'))
.catch(err => console.error('Push gönderilemedi ❌', err));
