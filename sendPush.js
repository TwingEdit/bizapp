const webpush = require('web-push');

// VAPID anahtarların
const vapidKeys = {
  publicKey: 'BB1e5kOUhOQjUW-i3_olooiI1Orafb7rKY-ETyeQ3A7smnDpr6OGAyq8o0opRT0iHqVPoLzptgHTtagmhfdMjCw',
  privateKey: 'UF6A-UDio7IpAuBrSiG3qJXpDToDUyvShQ5laR4TbAQ'
};

webpush.setVapidDetails(
  'mailto:you@example.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// TELEFONUN GÜNCEL SUBSCRIPTION JSON’U
const subscription = {
  endpoint: "https://fcm.googleapis.com/fcm/send/e84UMc29kCE:APA91bEt3FVOlYKZcGdLpZ3cpLFeLcSOtjuarwwJaQtDdRwXlwdCUo6ocs-0sfPoLeaI-1GGdC1DKWBOXr6dLIsgXcSfJs89wWXxhIPqgvRtsxdf2uANUo9sg7_uhJ4-Iy1O9-1V5jdZ",
  keys: {
    p256dh: "BLITiJzhBk_1L9LSF9Na3LEI1INsiIIJjvu-MPwrAAftXZhCoqwXI-z6BFAuHx52vvp8XDUHmHVpeyjTG2bcsfI",
    auth: "77g0c8eMwFv8Z-ofS1prRQ"
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
