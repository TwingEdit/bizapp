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

