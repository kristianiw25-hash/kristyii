// DATA AKUN CONTOH (hanya untuk simulasi tugas, bukan keamanan sungguhan)
const AKUN=[
  {role:"siswa",id:"12345",pass:"siswa123",nama:"Andi Pratama",kelas:"X-1"},
  {role:"siswa",id:"12347",pass:"siswa123",nama:"Dewi Sitorus",kelas:"X-1"},
  {role:"siswa",id:"12348",pass:"siswa123",nama:"Rudi Simanjuntak",kelas:"X-1"},
  {role:"siswa",id:"12346",pass:"siswa123",nama:"Siti Rahma",kelas:"XI-1"},
  {role:"siswa",id:"12349",pass:"siswa123",nama:"Maria Hutabarat",kelas:"XI-1"},
  {role:"guru",id:"198001",pass:"guru123",nama:"Bu Ratna",mapel:"Matematika"},
  {role:"guru",id:"198002",pass:"guru123",nama:"Pak Hotman",mapel:"Fisika"}
];
function getUser(){try{return JSON.parse(localStorage.getItem("user"))}catch(e){return null}}
function wajibLogin(){if(!getUser())location.replace("login.html")}
function logout(){localStorage.removeItem("user");location.replace("login.html")}
