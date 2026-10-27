const U=getUser();
const HARI=["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
const SLOT=[["07.00–08.30",420,510],["08.30–10.00",510,600],["10.15–11.45",615,705],["12.30–14.00",750,840]];
const J={
"X-1":["Matematika|Bahasa Indonesia|Fisika|PJOK","Biologi|Bahasa Inggris|Sejarah|Informatika","Kimia|Matematika|Pendidikan Agama|Seni Budaya","Bahasa Indonesia|Ekonomi|Fisika|Bahasa Inggris","Pendidikan Pancasila|Matematika|Bimbingan Konseling|Pramuka"],
"XI-1":["Fisika|Matematika|Bahasa Inggris|Kimia","Bahasa Indonesia|Biologi|PJOK|Sosiologi","Matematika|Sejarah|Informatika|Pendidikan Agama","Kimia|Bahasa Inggris|Fisika|Seni Budaya","Biologi|Pendidikan Pancasila|Bahasa Indonesia|Bimbingan Konseling"],
"XII-1":["Matematika|Fisika|Bahasa Inggris|Kimia","Biologi|Bahasa Indonesia|Informatika|Pendidikan Agama","Fisika|Matematika|Sejarah|PJOK","Kimia|Biologi|Bahasa Inggris|Pendidikan Pancasila","Bahasa Indonesia|Matematika|Bimbingan Konseling|Bimbingan Karier"]};
const N=[
{t:"Asesmen Sumatif Tengah Semester dimulai 9 November",d:"22 Okt 2026",c:"Siswa",b:"Asesmen berlangsung 9–13 November. Siswa membawa kartu peserta dan alat tulis. Jadwal per kelas ditempel di papan pengumuman dan dibagikan melalui wali kelas."},
{t:"Rapat dewan guru: persiapan asesmen",d:"21 Okt 2026",c:"Guru",b:"Rapat dilaksanakan Rabu, 28 Oktober pukul 13.00 di ruang guru. Mohon membawa draf soal dan kisi-kisi masing-masing mata pelajaran."},
{t:"Pendaftaran ekstrakurikuler semester genap",d:"20 Okt 2026",c:"Siswa",b:"Siswa dapat mendaftar ekstrakurikuler melalui pembina masing-masing sampai 6 November. Setiap siswa memilih maksimal dua kegiatan."},
{t:"Perubahan jam masuk hari Jumat",d:"19 Okt 2026",c:"Umum",b:"Mulai pekan depan kegiatan Jumat dimulai pukul 07.00 dengan literasi pagi selama 15 menit. Siswa diharapkan sudah berada di kelas sebelum bel."},
{t:"Pengumpulan nilai harian paling lambat 4 November",d:"18 Okt 2026",c:"Guru",b:"Guru mata pelajaran mengisi nilai harian ke wali kelas sebelum 4 November agar rekap dapat diselesaikan sebelum asesmen."},
{t:"Peringatan Hari Guru Nasional",d:"16 Okt 2026",c:"Umum",b:"Panitia OSIS membuka pengumpulan ide acara sampai 30 Oktober. Siswa yang ingin ikut berpartisipasi dapat menemui pengurus OSIS."}];
const A=[["28","Okt","Rapat dewan guru"],["9","Nov","Asesmen Sumatif Tengah Semester dimulai"],["25","Nov","Peringatan Hari Guru Nasional"],["19","Des","Pembagian rapor semester ganjil"]];
const K=[["Tata Usaha","Surat, administrasi, dan layanan umum","tu@sman2siborongborong.example"],["Kesiswaan","Izin, OSIS, dan ekstrakurikuler","kesiswaan@sman2siborongborong.example"],["Kurikulum","Jadwal dan penilaian","kurikulum@sman2siborongborong.example"],["Bimbingan Konseling","Konsultasi siswa dan karier","bk@sman2siborongborong.example"]];
const $=id=>document.getElementById(id);
const kelasList=Object.keys(J);
["kelasHero","kelas"].forEach(id=>{$(id).innerHTML=kelasList.map(k=>`<option>${k}</option>`).join("")});
const now=new Date();let today=now.getDay();const weekend=today===0||today===6;
let day=weekend?1:today;
function items(k,h,live){const r=J[k][h-1].split("|");const m=now.getHours()*60+now.getMinutes();
return r.map((s,i)=>`<li class="${live&&h===today&&m>=SLOT[i][1]&&m<SLOT[i][2]?"now":""}"><span class="t">${SLOT[i][0]}</span><span>${s}</span></li>`).join("")}
function hero(){$("hDay").textContent=HARI[day];$("hNote").textContent=weekend?"Akhir pekan. Ini jadwal hari masuk berikutnya.":"Jadwal hari ini. Pelajaran yang sedang berlangsung diberi warna kuning.";$("hList").innerHTML=items($("kelasHero").value,day,true)}
let jd=day;
function sched(){$("dayChips").innerHTML=[1,2,3,4,5].map(h=>`<button class="chip" aria-pressed="${h===jd}" data-h="${h}">${HARI[h]}</button>`).join("");$("jList").innerHTML=items($("kelas").value,jd,false)}
$("dayChips").onclick=e=>{const h=e.target.dataset.h;if(h){jd=+h;sched()}};
$("kelasHero").onchange=()=>{$("kelas").value=$("kelasHero").value;hero();sched()};
$("kelas").onchange=()=>{$("kelasHero").value=$("kelas").value;hero();sched()};
let cat="Semua";const CATS=U&&U.role==="siswa"?["Semua","Umum","Siswa"]:["Semua","Umum","Siswa","Guru"];
function news(){const q=$("q").value.toLowerCase().trim();
$("catChips").innerHTML=CATS.map(c=>`<button class="chip" aria-pressed="${c===cat}" data-c="${c}">${c}</button>`).join("");
const r=N.filter(n=>!(U&&U.role==="siswa"&&n.c==="Guru")).filter(n=>(cat==="Semua"||n.c===cat)&&(n.t+n.b).toLowerCase().includes(q));
$("news").innerHTML=r.length?r.map(n=>`<details><summary><div><span class="tag">${n.c}</span>${n.t}</div><span>${n.d}</span></summary><p>${n.b}</p></details>`).join(""):`<p class="empty">Tidak ada pengumuman yang cocok. Coba kata kunci lain atau pilih Semua.</p>`}
$("catChips").onclick=e=>{if(e.target.dataset.c){cat=e.target.dataset.c;news()}};
$("q").oninput=news;
$("ag").innerHTML=A.map(a=>`<div class="ev"><div><b>${a[0]}</b><em>${a[1]}</em></div><div>${a[2]}</div></div>`).join("");
$("kg").innerHTML=K.map(k=>`<div class="panel"><h3>${k[0]}</h3><p>${k[1]}</p><p><a href="mailto:${k[2]}">${k[2]}</a></p></div>`).join("");
$("userBox").textContent=U.nama+(U.role==="guru"?" (Guru)":" ("+U.kelas+")");
$("logout").onclick=logout;
if(U.kelas){$("kelasHero").value=U.kelas;$("kelas").value=U.kelas}
hero();sched();news();
