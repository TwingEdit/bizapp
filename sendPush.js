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
// sendPush.js
const webpush = require('web-push');

// Daha önce oluşturduğun VAPID anahtarları
const vapidKeys = {
  publicKey: 'BURAYA_PUBLIC_KEY',
  privateKey: 'BURAYA_PRIVATE_KEY'
};

webpush.setVapidDetails(
  'mailto:you@example.com', 
  vapidKeys.publicKey, 
  vapidKeys.privateKey
);

// Kullanıcının tarayıcıdan kaydettiğin subscription objesi
const subscription = {
  endpoint: "https://fcm.googleapis.com/fcm/send/...",
  keys: {
    p256dh: "...",
    auth: "..."
  }
};

webpush.sendNotification(subscription, JSON.stringify({
  title: 'Seni Öptü!',
  body: '💖 Yeni bir öpücük mesajı geldi'
}))
.then(() => console.log('Push gönderildi ✅'))
.catch(err => console.error('Push gönderilemedi ❌', err));
