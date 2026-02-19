const admin = require("firebase-admin");
const webpush = require("web-push");

// 1. ADIM: Firebase Admin Bağlantısı
// NOT: 'serviceAccountKey.json' dosyasını Firebase Konsol > Proje Ayarları > Hizmet Hesapları kısmından indirip 
// proje klasörüne (C:\loveapp) koymalısın.
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sadece-biz-default-rtdb.europe-west1.firebasedatabase.app"
});

const db = admin.database();

// 2. ADIM: Bildirim Ayarları (VAPID)
const vapidKeys = {
  publicKey: 'BB1e5kOUhOQjUW-i3_olooiI1Orafb7rKY-ETyeQ3A7smnDpr6OGAyq8o0opRT0iHqVPoLzptgHTtagmhfdMjCw',
  privateKey: 'SENIN_OZEL_ANAHTARIN' // Bunu kendi özel anahtarınla değiştir
};

webpush.setVapidDetails('mailto:iletisim@example.com', vapidKeys.publicKey, vapidKeys.privateKey);

console.log("🚀 Ayıcık Bakıcı Servisi Başlatıldı...");

// 3. ADIM: Ayıcığı Acıktıran Döngü (30 Dakikada Bir Çalışır)
setInterval(async () => {
    console.log("⏰ Ayıcık kontrol ediliyor...");
    const roomsRef = db.ref("rooms");
    
    roomsRef.once("value", (snapshot) => {
        snapshot.forEach((roomSnapshot) => {
            const petRef = roomSnapshot.child("pet").ref;
            const petData = roomSnapshot.child("pet").val();
            
            if (petData) {
                // Değerleri düşür (En az 0 olabilir)
                const newHunger = Math.max((petData.hunger || 0) - 5, 0);
                const newHygiene = Math.max((petData.hygiene || 0) - 3, 0);
                
                petRef.update({
                    hunger: newHunger,
                    hygiene: newHygiene
                });

                // Eğer ayıcık çok acıktıysa bildirim gönder
                if (newHunger <= 20) {
                    console.log(`⚠️ ${roomSnapshot.key} odasındaki ayı çok aç!`);
                    // Burada opsiyonel olarak sendNotification çağırabilirsin
                }
            }
        });
    });
}, 1000 * 60 * 30); // 30 Dakika

// 4. ADIM: Bildirim Gönderme Fonksiyonu (İhtiyaç duyduğunda çağırmak için)
function sendPush(subscription, title, body) {
    const payload = JSON.stringify({ title, body });
    webpush.sendNotification(subscription, payload)
        .then(() => console.log('✅ Bildirim gönderildi'))
        .catch(err => console.error('❌ Bildirim hatası:', err));
}
