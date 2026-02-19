const admin = require("firebase-admin");
const webpush = require("web-push");

// 1. ADIM: Firebase Admin Bağlantısı
// serviceAccountKey.json dosyasının C:\loveapp klasöründe olduğundan emin ol!
try {
    const serviceAccount = require("./serviceAccountKey.json");
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://sadece-biz-default-rtdb.europe-west1.firebasedatabase.app"
    });
    console.log("✅ Firebase Admin bağlantısı başarılı.");
} catch (error) {
    console.error("❌ Hata: serviceAccountKey.json dosyası bulunamadı!");
    process.exit(1);
}

const db = admin.database();

// 2. ADIM: Senin Ürettiğin VAPID Anahtarları
const vapidKeys = {
  publicKey: 'BErDrUJX0GwdyREvm9MuPHoUsjM9_tXoxUI5bGVAZLKFocnBjiZB7x9cClYvnh1UWJ-z5Pa24vo9UGNhStDYSTE',
  privateKey: 'c-23vBhHX3b27uk3cfKGCJ61oZ-mcCKF1219iIJAk_A'
};

webpush.setVapidDetails('mailto:iletisim@example.com', vapidKeys.publicKey, vapidKeys.privateKey);

// 3. ADIM: Ayıcığı Acıktıran Döngü (30 Dakikada Bir)
console.log("🌟 Ayıcık bakıcı servisi arka planda başlatıldı...");

setInterval(async () => {
    console.log("⏰ Ayıcık kontrol ediliyor...");
    const roomsRef = db.ref("rooms");
    
    roomsRef.once("value", (snapshot) => {
        snapshot.forEach((roomSnapshot) => {
            const petRef = roomSnapshot.child("pet").ref;
            const petData = roomSnapshot.child("pet").val();
            
            if (petData) {
                // Değerleri düşür (Minimum 0)
                const newHunger = Math.max((petData.hunger || 0) - 5, 0);
                const newHygiene = Math.max((petData.hygiene || 0) - 3, 0);
                
                petRef.update({
                    hunger: newHunger,
                    hygiene: newHygiene,
                    lastTick: Date.now()
                });
                
                console.log(`🧸 [${roomSnapshot.key}] Durum güncellendi. Açlık: ${newHunger}, Hijyen: ${newHygiene}`);
            }
        });
    });
}, 1000 * 60 * 30); // 30 Dakika

// 4. ADIM: Bildirim Gönderici (İhtiyaç duyduğunda çağırmak için hazır)
function sendPush(subscription, title, body) {
    const payload = JSON.stringify({ title, body });
    webpush.sendNotification(subscription, payload)
        .then(() => console.log('✅ Bildirim gönderildi'))
        .catch(err => console.error('❌ Bildirim hatası:', err));
}
