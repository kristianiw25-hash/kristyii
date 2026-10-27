if(getUser())location.replace("index.html");
const $=id=>document.getElementById(id);
$("show").onchange=e=>{$("pw").type=e.target.checked?"text":"password"};
$("f").onsubmit=e=>{
  e.preventDefault();
  const a=AKUN.find(x=>x.role===$("role").value&&x.id===$("uid").value.trim()&&x.pass===$("pw").value);
  if(!a){$("err").textContent="NIS/NIP atau kata sandi salah. Periksa lagi lalu coba masuk kembali.";return}
  const {pass,...u}=a;
  localStorage.setItem("user",JSON.stringify(u));
  location.replace("index.html");
};
