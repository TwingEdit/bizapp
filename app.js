const input = document.querySelector("input");
const btn = document.querySelector("button");

btn.onclick = () => {
  const code = input.value.trim();
  if(!code) return alert("Kod gir");

  localStorage.setItem("room", code);
  location.href = "room.html";
};
