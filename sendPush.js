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
  endpoint: "https://fcm.googleapis.com/fcm/send/e84UMc29kCE:APA91bEt3FVOlYKZcGdLpZ3cpLFeLcSOtjuarwwJaQtDdRwXlwdCUo6ocs-0sfPoLeaI-1GGdC1DKWBOXr6dLIsgXcSfJs89wWXxhIPqgvRtsxdf2uANUo9sg7_uhJ4-Iy1O9-1V5jdZ",
  expirationTime: null,
  keys: {
    p256dh: "BBgV_lT6bulBOL3eFuwlV6RcMX7iaqu3wL-z5s8twKhT4KDh7rl0ESrPL3M9DoLeohf9PNpE1WjOctOCSF7aFhA",
    auth: "5Hn4LlqkrTswQSfOr0xazA"
  }
};

webpush.sendNotification(subscription, JSON.stringify({
  title: 'Seni Öptü! 💋',
  body: 'Yeni bir öpücük mesajı geldi 💖'
}))
.then(() => console.log('Bildirim gönderildi 🚀'))
.catch(err => console.error('Push gönderilemedi ❌', err));
