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
    endpoint: "BURAYA_ENDPOINT_URL",
    keys: {
        p256dh: "BURAYA_P256DH_KEY",
        auth: "BURAYA_AUTH_KEY"
    }
};

webpush.sendNotification(subscription, JSON.stringify({
    title: 'Seni Öptü!',
    body: '💖 Yeni bir öpücük mesajı geldi'
}))
.then(() => console.log('Push gönderildi ✅'))
.catch(err => console.error('Push gönderilemedi ❌', err));
