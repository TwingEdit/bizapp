// Service worker register
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(() => console.log('SW hazır'));
}

// Buton
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("enablePush");
  if (!btn) return;

  btn.onclick = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        alert("İzin verilmedi");
        return;
      }

      const reg = await navigator.serviceWorker.ready;

      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array("BB1e5kOUhOQjUW-i3_olooiI1Orafb7rKY-ETyeQ3A7smnDpr6OGAyq8o0opRT0iHqVPoLzptgHTtagmhfdMjCw")
      });

      console.log("SUBSCRIPTION_JSON_START");
      console.log(JSON.stringify(sub));
      console.log("SUBSCRIPTION_JSON_END");

      alert("Bildirimler aktif 💖");
    } catch (e) {
      console.error("Push hata:", e);
      alert("Push hata: " + e.message);
    }
  };
});

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}
