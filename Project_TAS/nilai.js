const U=getUser();
const $=id=>document.getElementById(id);
const MAPEL=["Matematika","Fisika","Bahasa Indonesia","Bahasa Inggris","Kimia","Biologi"];
const KKM=75,BOBOT=[.2,.3,.2,.3];
const SISWA=AKUN.filter(a=>a.role==="siswa");
function load(){try{return JSON.parse(localStorage.getItem("sia"))||{nilai:{},absen:{}}}catch(e){return{nilai:{},absen:{}}}}
const DB=load();
const simpan=()=>localStorage.setItem("sia",JSON.stringify(DB));
// Nilai contoh dibuat otomatis sampai guru menyimpan nilai asli
function nilaiDari(nis,m){const k=nis+"|"+m;if(DB.nilai[k])return DB.nilai[k];const n=+nis%100,i=MAPEL.indexOf(m);return[0,1,2,3].map(j=>70+((n*7+i*13+j*5)%26))}
function absenDari(nis){return DB.absen[nis]||[40+(+nis%5),+nis%3,+nis%2,0]}
const akhir=a=>Math.round(a.reduce((s,v,i)=>s+v*BOBOT[i],0)*10)/10;
const pred=n=>n>=90?"A":n>=80?"B":n>=70?"C":"D";
const klamp=(v,max)=>Math.min(max,Math.max(0,Math.round(+v||0)));

function viewSiswa(){
  $("judul").textContent="Nilai saya";
  const rows=MAPEL.map(m=>{const a=nilaiDari(U.id,m),f=akhir(a);
    return `<tr><td>${m}</td>${a.map(v=>`<td>${v}</td>`).join("")}<td><b>${f}</b></td><td>${pred(f)}</td><td>${f>=KKM?"Tuntas":"Belum tuntas"}</td></tr>`}).join("");
  const h=absenDari(U.id);
  $("isi").innerHTML=`<div class="tw"><table><thead><tr><th>Mata pelajaran</th><th>Tugas</th><th>UH</th><th>UTS</th><th>UAS</th><th>Nilai akhir</th><th>Predikat</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table></div>
  <p class="sub">Nilai akhir = Tugas 20% + UH 30% + UTS 20% + UAS 30%. KKM ${KKM}.</p>
  <h2>Kehadiran</h2><div class="kg">${["Hadir","Izin","Sakit","Alpa"].map((x,i)=>`<div class="panel"><h3>${h[i]}</h3><p>${x}</p></div>`).join("")}</div>`;
}

function viewGuru(){
  $("judul").textContent="Input nilai dan absensi";
  const ks=[...new Set(SISWA.map(s=>s.kelas))];
  $("isi").innerHTML=`<div class="row"><label for="kls"><small>Kelas</small></label><select id="kls">${ks.map(k=>`<option>${k}</option>`).join("")}</select></div>
  <h2>Nilai ${U.mapel}</h2><div class="tw" id="tn"></div><p class="sub" id="pn" role="status"></p>
  <h2>Absensi semester ini</h2><div class="tw" id="ta"></div><p class="sub" id="pa" role="status"></p>`;
  $("kls").onchange=tabel;tabel();
}
function tabel(){
  const ss=SISWA.filter(s=>s.kelas===$("kls").value);
  $("tn").innerHTML=`<table><thead><tr><th>Siswa</th><th>Tugas</th><th>UH</th><th>UTS</th><th>UAS</th><th>Akhir</th></tr></thead><tbody>${ss.map(s=>{const a=nilaiDari(s.id,U.mapel);
    return `<tr data-n="${s.id}"><td>${s.nama}</td>${a.map(v=>`<td><input type="number" min="0" max="100" value="${v}" aria-label="Nilai ${s.nama}"></td>`).join("")}<td>${akhir(a)}</td></tr>`}).join("")}</tbody></table><button class="btn" id="sn">Simpan nilai</button>`;
  $("ta").innerHTML=`<table><thead><tr><th>Siswa</th><th>Hadir</th><th>Izin</th><th>Sakit</th><th>Alpa</th></tr></thead><tbody>${ss.map(s=>{const a=absenDari(s.id);
    return `<tr data-a="${s.id}"><td>${s.nama}</td>${a.map(v=>`<td><input type="number" min="0" max="200" value="${v}" aria-label="Absensi ${s.nama}"></td>`).join("")}</tr>`}).join("")}</tbody></table><button class="btn" id="sa">Simpan absensi</button>`;
  $("sn").onclick=()=>{
    $("tn").querySelectorAll("tr[data-n]").forEach(tr=>{
      const v=[...tr.querySelectorAll("input")].map(i=>klamp(i.value,100));
      DB.nilai[tr.dataset.n+"|"+U.mapel]=v;tr.lastElementChild.textContent=akhir(v)});
    simpan();$("pn").textContent="Nilai tersimpan.";
  };
  $("sa").onclick=()=>{
    $("ta").querySelectorAll("tr[data-a]").forEach(tr=>{DB.absen[tr.dataset.a]=[...tr.querySelectorAll("input")].map(i=>klamp(i.value,200))});
    simpan();$("pa").textContent="Absensi tersimpan.";
  };
}

$("userBox").textContent=U.nama+(U.role==="guru"?" (Guru)":" ("+U.kelas+")");
$("logout").onclick=logout;
U.role==="guru"?viewGuru():viewSiswa();
