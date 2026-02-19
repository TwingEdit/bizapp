const webpush = require('web-push');

const vapidKeys = {
  publicKey: 'BB1e5kOUhOQjUW-i3_olooiI1Orafb7rKY-ETyeQ3A7smnDpr6OGAyq8o0opRT0iHqVPoLzptgHTtagmhfdMjCw',
  privateKey: 'UF6A-UDio7IpAuBrSiG3qJXpDToDUyvShQ5laR4TbAQ'
};

webpush.setVapidDetails(
  'mailto:you@example.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const subscription = {
  endpoint: "TELEFONUN_SUBSCRIPTION_ENDPOINT",
  keys: {
    p256dh: "TELEFONUN_P256DH",
    auth: "TELEFONUN_AUTH"
  }
};

// Bildirimi gönder
webpush.sendNotification(subscription, JSON.stringify({
  title: '💋 Seni Öptü!',
  body: 'Yeni bir öpücük mesajı geldi 💖',
  icon: '/icon.png',
  badge: '/badge.png',
  data: { url: '/' }
}))
.then(() => console.log('Bildirim gönderildi 🚀'))
.catch(err => console.error('Push gönderilemedi ❌', err));
