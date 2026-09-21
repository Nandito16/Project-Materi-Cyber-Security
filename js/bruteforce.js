/* ============================================================
   Akademi Keamanan Siber Bloxy - bruteforce.js

   PENTING: SEMUA DI BAWAH INI ADALAH SIMULASI DALAM MEMORI.
   Tidak ada server login sungguhan, tidak ada koneksi jaringan,
   dan TIDAK ADA alat Hydra yang benar-benar dijalankan. Semua
   "percobaan sandi" hanya teks yang dianimasikan untuk anak.

   Nama fungsi & variabel diberi awalan "bf" (brute force) supaya
   tidak bentrok dengan file JavaScript halaman lain.
   ============================================================ */

/* ---------- Fungsi bantu ---------- */
function bfEsc(s){
  return String(s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
function bfWrite(html){
  document.getElementById('bfTerm').innerHTML = html;
}
function bfSetBar(pct, label){
  var f = document.getElementById('bfFill');
  if(f) f.style.width = pct + '%';
  var l = document.getElementById('bfLabel');
  if(l) l.textContent = label;
}

/* Sedang berjalan? supaya tombol tidak ditekan dua kali */
var bfBusy = false;
var targetBf = 'login.bloxy.latihan';

/* Daftar sandi yang PALING SERING dipakai orang (wordlist).
   Inilah yang dicoba Hydra satu per satu dari atas ke bawah.
   Semua ini contoh sandi lemah yang gampang ditebak. */
var kamusSandi = [
  '123456', 'password', '12345678', 'qwerty', '111111',
  'roblox', 'bloxy', 'admin', 'iloveyou', 'naga2010',
  'bloxy123', 'qwerty123'
];

/* ---------- Simulasi utama: menjalankan Hydra ---------- */
function runHydra(){
  if(bfBusy) return;
  var mode = document.getElementById('bfMode').value; // 'lemah' | 'kuat'
  bfBusy = true;
  var btn = document.getElementById('bfBtn');
  btn.disabled = true;
  document.getElementById('bfFinds').innerHTML = '';
  bfSetBar(0, 'Mulai...');

  var user = 'pemain1';

  // Sandi rahasia si target (hanya untuk simulasi):
  //  - akun lemah  -> sandinya ADA di daftar umum, jadi pasti ketemu
  //  - akun kuat   -> sandi panjang & unik, DAN akun dikunci setelah 5 gagal
  var sandiRahasia = (mode === 'lemah') ? 'bloxy123' : 'B10xy!Naga#77';
  var pakaiKunci   = (mode === 'kuat'); // akun kuat mengunci setelah 5 percobaan
  var batasKunci   = 5;
  var maxLangkah   = pakaiKunci ? batasKunci : kamusSandi.length;

  var lines = [
    '<span class="pr">siswa@bloxy:~$</span> hydra -l ' + user + ' -P daftar-sandi.txt ' + bfEsc(targetBf),
    '<span class="dim">Hydra v9.1 (SIMULASI) \u2014 mencoba sandi satu per satu...</span>',
    '<span class="dim">target: ' + bfEsc(targetBf) + '   nama: ' + user + '</span>',
    ''
  ];
  bfWrite(lines.join('\n'));

  var i = 0;
  function step(){
    // MODE LEMAH: berhenti begitu sandi di daftar cocok dengan sandi rahasia
    if(mode === 'lemah' && kamusSandi[i] === sandiRahasia){
      lines.push('<span class="hit">[' + (i + 1) + '] ' + bfEsc(kamusSandi[i]) +
        '  \u2190 COCOK! sandi ketemu \uD83D\uDE31</span>');
      bfWrite(lines.join('\n'));
      bfSetBar(100, 'Sandi ditemukan pada percobaan ke-' + (i + 1) + '!');
      selesaiHydra('ketemu', kamusSandi[i], i + 1);
      return;
    }
    // MODE KUAT: akun dikunci setelah beberapa kali gagal
    if(pakaiKunci && i >= batasKunci){
      lines.push('');
      lines.push('<span class="no">[!] Akun DIKUNCI setelah ' + batasKunci + ' percobaan gagal.</span>');
      lines.push('<span class="no">[!] Hydra diblokir \u2014 tidak bisa mencoba lagi.</span>');
      bfWrite(lines.join('\n'));
      bfSetBar(100, 'Diblokir \u2014 akun terkunci');
      selesaiHydra('terkunci', null, batasKunci);
      return;
    }
    // Daftar habis, tidak ada yang cocok
    if(i >= kamusSandi.length){
      lines.push('');
      lines.push('<span class="pr">[-] Semua sandi di daftar dicoba \u2014 tidak ada yang cocok.</span>');
      bfWrite(lines.join('\n'));
      bfSetBar(100, 'Gagal \u2014 sandi tidak ada di daftar umum');
      selesaiHydra('gagal', null, kamusSandi.length);
      return;
    }
    // Coba satu sandi -> GAGAL
    lines.push('<span class="dim">[' + (i + 1) + '] mencoba \u201C' + bfEsc(kamusSandi[i]) +
      '\u201D ... <span class="no">GAGAL</span></span>');
    bfWrite(lines.join('\n'));
    bfSetBar(Math.round((i + 1) / maxLangkah * 100),
      'Mencoba sandi ke-' + (i + 1) + ' dari ' + maxLangkah + '...');
    i++;
    setTimeout(step, 430);
  }
  setTimeout(step, 500);
}

/* ---------- Menampilkan kesimpulan + daftar temuan ---------- */
function selesaiHydra(hasil, sandi, coba){
  bfBusy = false;
  document.getElementById('bfBtn').disabled = false;
  var ul = document.getElementById('bfFinds');

  if(hasil === 'ketemu'){
    ul.innerHTML =
      '<li>\uD83D\uDE31 <div><b>' + bfEsc(sandi) + '</b> \u2014 sandi berhasil ditebak hanya dalam <b>' +
        coba + ' percobaan</b>. Sandi ini ada di daftar sandi paling umum sedunia!</div></li>' +
      '<li>\u26A0\uFE0F <div>Karena sandinya <b>pendek &amp; umum</b> dan tidak ada pembatas percobaan, ' +
        'komputer bisa menebaknya secepat kilat.</div></li>' +
      '<li>\uD83D\uDCA1 <div>Pelajaran: pakai sandi yang <b>panjang, unik, dan sulit ditebak</b> \u2014 ' +
        'dan aktifkan pembatas percobaan. Coba mode <b>\u201CAkun Kuat\u201D</b> lalu jalankan lagi!</div></li>';
  } else if(hasil === 'terkunci'){
    ul.innerHTML =
      '<li>\uD83D\uDEE1\uFE0F <div><b>Aman!</b> Akun <b>dikunci</b> setelah ' + coba +
        ' kali salah, jadi Hydra langsung berhenti \u2014 sandi tidak pernah ketemu.</div></li>' +
      '<li>\u2705 <div>Sandinya juga <b>panjang &amp; unik</b> (<code>B10xy!Naga#77</code>), jadi tidak ada ' +
        'di daftar sandi umum mana pun.</div></li>' +
      '<li>\uD83D\uDD10 <div>Inilah cara pintu login yang baik melindungi diri: sandi kuat + batasi percobaan + ' +
        '(lebih bagus lagi) verifikasi 2 langkah.</div></li>';
  } else {
    ul.innerHTML =
      '<li>\uD83D\uDE42 <div>Sandi target <b>tidak ada</b> di daftar sandi umum, jadi tebakan gagal.</div></li>' +
      '<li>\uD83D\uDCA1 <div>Sandi yang tidak umum membuat brute force jauh lebih sulit. Tambah pembatas ' +
        'percobaan supaya makin aman!</div></li>';
  }
}

/* ---------- Tombol "Ulangi" ---------- */
function bfReset(){
  if(bfBusy) return;
  document.getElementById('bfFinds').innerHTML = '';
  bfSetBar(0, 'Belum dijalankan.');
  bfWrite('<span class="dim">Klik \u201CJalankan Hydra\u201D untuk memulai simulasi...</span>');
}

/* ============================================================
   KUIS BRUTE FORCE
   q = pertanyaan, o = pilihan, a = indeks jawaban benar (mulai 0)
   ============================================================ */
var quizBf = [
  {
    q:'Serangan brute force adalah...',
    o:['Mencoba banyak sandi satu per satu sampai ada yang cocok','Merusak layar komputer','Mengirim email lucu'],
    a:0
  },
  {
    q:'Alat yang terkenal untuk mencoba banyak sandi login adalah...',
    o:['Paint','Hydra','Kalkulator'],
    a:1
  },
  {
    q:'Kenapa sandi \u201C123456\u201D sangat berbahaya?',
    o:['Terlalu panjang','Ada di daftar sandi paling umum, jadi cepat ditebak','Warnanya jelek'],
    a:1
  },
  {
    q:'Cara paling ampuh melawan brute force adalah...',
    o:['Sandi panjang &amp; unik + batasi percobaan login','Memakai huruf kecil semua','Menyembunyikan tombol login'],
    a:0
  },
  {
    q:'Kalau sebuah akun dikunci setelah 5 kali salah sandi, artinya...',
    o:['Website-nya rusak','Brute force jadi sangat lambat dan hampir mustahil','Sandi jadi lebih lemah'],
    a:1
  }
];

var bfAnswered = 0;
var bfScore = 0;

function buildBfQuiz(){
  var box = document.getElementById('bfQuizBox');
  if(!box) return;

  quizBf.forEach(function(item, qi){
    var d = document.createElement('div');
    d.className = 'q';

    var p = document.createElement('p');
    p.innerHTML = (qi + 1) + '. ' + item.q;
    d.appendChild(p);

    var opts = document.createElement('div');
    opts.className = 'opts';

    item.o.forEach(function(txt, oi){
      var b = document.createElement('button');
      b.className = 'opt';
      b.innerHTML = txt;
      b.onclick = function(){ pickBf(d, b, oi, item.a); };
      opts.appendChild(b);
    });

    d.appendChild(opts);
    box.appendChild(d);
  });

  var sc = document.createElement('div');
  sc.id = 'bfScore';
  box.appendChild(sc);
}

function pickBf(d, btn, oi, ans){
  if(d.dataset.done) return;
  d.dataset.done = '1';
  bfAnswered++;

  var btns = d.querySelectorAll('.opt');
  btns.forEach(function(b, i){
    if(i === ans) b.classList.add('correct');
    b.disabled = true;
  });

  if(oi === ans){ bfScore++; } else { btn.classList.add('wrong'); }

  var sc = document.getElementById('bfScore');
  if(bfAnswered === quizBf.length){
    sc.textContent = '\uD83C\uDFC6 Skormu: ' + bfScore + ' / ' + quizBf.length + ' \u2014 ' +
      (bfScore === quizBf.length ? 'Sempurna! Kamu paham cara menjaga sandi!' : 'Bagus! Terus belajar ya!');
  } else {
    sc.textContent = 'Skor sementara: ' + bfScore + ' / ' + bfAnswered;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('nav.menu a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;

      if (window.scrollY >= sectionTop) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === '#' + current
      );
    });
  }

  window.addEventListener('scroll', updateActiveNav);
  window.addEventListener('resize', updateActiveNav);
  updateActiveNav();
});

buildBfQuiz();
