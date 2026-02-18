const input = document.querySelector("input");
const btn = document.querySelector("button");

btn.onclick = () => {
  const code = input.value.trim();
  if(!code) return alert("Kod gir");

  localStorage.setItem("room", code);
  location.href = "room.html";
};

// Ana JS dosyan
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(() => console.log('Service Worker kayıtlı ✅'))
    .catch(err => console.error('Service Worker hatası ❌'));
}

// Push izni buton ile tetikleme
function requestNotificationPermission() {
  if ('Notification' in window) {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') console.log('Push izni verildi ✅');
      else console.log('Push izni reddedildi ❌');
    });
  }
}

// Örnek buton
document.getElementById('pushButton').addEventListener('click', requestNotificationPermission);

async function subscribeUser() {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    const sw = await navigator.serviceWorker.ready;

    const subscription = await sw.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array('PUBLIC_VAPID_KEY')
    });

    console.log('Subscription:', subscription);
    // Burayı backend’e POST et, kaydet
    await fetch('/save-subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subscription)
    });
  }
}
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}
document.getElementById('pushButton').addEventListener('click', () => {
  requestNotificationPermission(); // izin al
  subscribeUser();                // subscription oluştur ve backend’e gönder
});


