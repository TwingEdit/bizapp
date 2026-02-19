// Service worker register
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/bizapp/sw.js')
    .then(reg => console.log('SW hazır:', reg.scope))
    .catch(err => console.error('SW hata:', err));
}

// Buton ve Bildirim İşlemleri
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("enablePush");
  if (!btn) return;

  btn.onclick = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        alert("Bildirim izni verilmedi ❌");
        return;
      }

      const reg = await navigator.serviceWorker.ready;

      // YENİ PUBLIC KEY BURAYA ENTEGRE EDİLDİ
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array("BErDrUJX0GwdyREvm9MuPHoUsjM9_tXoxUI5bGVAZLKFocnBjiZB7x9cClYvnh1UWJ-z5Pa24vo9UGNhStDYSTE")
      });

      console.log("SUBSCRIPTION_JSON_START");
      console.log(JSON.stringify(sub));
      console.log("SUBSCRIPTION_JSON_END");

      alert("Bildirimler ve Ayıcık Takibi Aktif! 💖");
    } catch (e) {
      console.error("Push abonelik hatası:", e);
      alert("Bir hata oluştu: " + e.message);
    }
  };
});

// VAPID anahtarını dönüştüren yardımcı fonksiyon
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}

// Kalp efekti fonksiyonu
function createHeart(x, y) {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.style.left = x + "px";
  heart.style.top = y + "px";
  heart.innerText = "💖";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 800);
}
