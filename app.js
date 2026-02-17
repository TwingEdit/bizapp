let room=null;

function join(){
  const code=document.getElementById("code").value.trim();
  if(code.length<4) return alert("Geçersiz kod");

  room=code;

  document.getElementById("login").style.display="none";
  document.getElementById("app").style.display="block";

  load();
}

function sendKiss(){
  const data=JSON.parse(localStorage.getItem(room)||"[]");
  data.push("💋 "+new Date().toLocaleTimeString());
  localStorage.setItem(room,JSON.stringify(data));
  load();
}

function load(){
  const data=JSON.parse(localStorage.getItem(room)||"[]");
  document.getElementById("feed").innerHTML=
    data.map(e=>`<p>${e}</p>`).join("");
}
