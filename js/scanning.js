function termWrite(id, html){
  var el = document.getElementById(id);
  el.innerHTML += html + '\n';
  el.scrollTop = el.scrollHeight;
}
function termClear(id){ document.getElementById(id).innerHTML = ''; }
function esc(s){ return String(s).replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function playLines(termId, lines, speed, selesai){
  var i = 0;
  (function next(){
    if(i >= lines.length){ if(selesai) selesai(); return; }
    termWrite(termId, lines[i]);
    i++;
    setTimeout(next, speed);
  })();
}

var targetWhatWeb = {
  'toko-bloxy.latihan': {
    lines: [
      '<span class="dim">[200 OK]</span> Judul[<span class="hit">Top Up Robux</span>]',
      '<span class="dim">[200 OK]</span> HTTPServer[<span class="hit">nginx/1.18.0</span>]',
      '<span class="dim">[200 OK]</span> Bahasa[<span class="hit">PHP/7.4.3</span>]',
      '<span class="dim">[200 OK]</span> CMS[<span class="hit">WordPress 5.4</span>]',
      '<span class="dim">[200 OK]</span> JS-Library[<span class="hit">jQuery 1.12.4</span>]',
      '<span class="dim">[200 OK]</span> Cookie[PHPSESSID]'
    ],
    temuan: [
      ['nginx/1.18.0', 'Nomor versi server terlihat jelas. Penjahat bisa mencari kelemahan khusus versi itu.'],
      ['PHP/7.4.3', 'Versi PHP ini sudah tua dan tidak lagi mendapat pembaruan keamanan.'],
      ['WordPress 5.4', 'Versi CMS lama — sebaiknya diperbarui ke versi terbaru.'],
      ['jQuery 1.12.4', 'Pustaka JavaScript yang sudah sangat usang.']
    ]
  },
  'blog-bloxy.latihan': {
    lines: [
      '<span class="dim">[200 OK]</span> Judul[<span class="hit">Roblox Advanture</span>]',
      '<span class="dim">[200 OK]</span> HTTPServer[<span class="inf">disembunyikan</span>]',
      '<span class="dim">[200 OK]</span> Bahasa[<span class="inf">tidak terdeteksi</span>]',
      '<span class="dim">[200 OK]</span> Keamanan[<span class="pr">HSTS, CSP aktif</span>]',
      '<span class="dim">[200 OK]</span> Cookie[sesi; HttpOnly; Secure]'
    ],
    temuan: [
      ['disembunyikan', 'BAGUS! Versi server tidak dibocorkan, jadi penjahat sulit menebak kelemahannya.'],
      ['HSTS + CSP', 'BAGUS! Website ini memakai lapisan pelindung tambahan.'],
      ['HttpOnly; Secure', 'BAGUS! Cookie dilindungi supaya tidak mudah dicuri.']
    ]
  }
};

var wwBusy = false;

function runWhatWeb(){
  if(wwBusy) return;
  var target = document.getElementById('wwTarget').value;
  var data = targetWhatWeb[target];
  var btn = document.getElementById('wwBtn');

  wwBusy = true; btn.disabled = true; btn.style.opacity = .6;
  termClear('wwTerm');
  document.getElementById('wwFinds').innerHTML = '';

  termWrite('wwTerm', '<span class="pr">siswa@bloxy:~$</span> whatweb http://' + esc(target));
  termWrite('wwTerm', '<span class="dim">(simulasi — tidak ada koneksi internet sungguhan)</span>');
  termWrite('wwTerm', '');

  playLines('wwTerm', data.lines, 420, function(){
    termWrite('wwTerm', '');
    termWrite('wwTerm', '<span class="pr">Selesai.</span> <span class="dim">1 target diperiksa.</span>');

    // Tampilkan penjelasan tiap temuan
    var ul = document.getElementById('wwFinds');
    data.temuan.forEach(function(t){
      var li = document.createElement('li');
      li.innerHTML = '<span>\uD83D\uDD0E</span><span><b>' + esc(t[0]) + '</b><br>' + esc(t[1]) + '</span>';
      ul.appendChild(li);
    });

    wwBusy = false; btn.disabled = false; btn.style.opacity = 1;
  });
}

/* ============================================================
   SIMULASI 2 - Gobuster (mencari halaman tersembunyi)
   ============================================================ */

/* Daftar kata yang "dicoba" (wordlist mini) + hasil palsunya */
var kamus = [
  ['/index.html', 200], ['/gambar',    301], ['/tentang',   200],
  ['/login',      200], ['/kucing',    404], ['/naga',      404],
  ['/admin',      403], ['/backup',    200], ['/tes',       404],
  ['/css',        301], ['/rahasia',   404], ['/js',        301],
  ['/kontak',     200], ['/pohon',     404], ['/.git',      200],
  ['/blok',       404], ['/uploads',   301], ['/pesawat',   404]
];

/* Penjelasan untuk temuan penting */
var artiTemuan = {
  '/admin':  'Halaman panel admin. Statusnya 403 (dilarang) — bagus, tapi keberadaannya jadi ketahuan.',
  '/backup': 'File cadangan terbuka! Ini BAHAYA karena sering berisi data atau kode rahasia.',
  '/.git':   'Folder kode sumber terbuka! Ini BAHAYA — seluruh kode website bisa diunduh orang.',
  '/uploads':'Folder unggahan. Perlu dipastikan isinya tidak bisa dijalankan sebagai program.'
};

var gbBusy = false;

function runGobuster(){
  if(gbBusy) return;
  var btn = document.getElementById('gbBtn');
  gbBusy = true; btn.disabled = true; btn.style.opacity = .6;

  termClear('gbTerm');
  document.getElementById('gbFinds').innerHTML = '';
  var isi = document.getElementById('gbFill');
  var lbl = document.getElementById('gbLabel');
  isi.style.width = '0%';

  termWrite('gbTerm', '<span class="pr">siswa@bloxy:~$</span> gobuster dir -u http://toko-bloxy.latihan -w kamus-mini.txt');
  termWrite('gbTerm', '<span class="dim">(simulasi — tidak ada permintaan jaringan sungguhan)</span>');
  termWrite('gbTerm', '<span class="dim">Jumlah kata dalam kamus: ' + kamus.length + '</span>');
  termWrite('gbTerm', '');

  var i = 0;
  var ketemu = [];

  (function next(){
    if(i >= kamus.length){
      termWrite('gbTerm', '');
      termWrite('gbTerm', '<span class="pr">Selesai.</span> <span class="dim">' +
        kamus.length + ' kata dicoba, ' + ketemu.length + ' halaman ditemukan.</span>');
      lbl.textContent = 'Selesai — ' + ketemu.length + ' halaman ditemukan dari ' + kamus.length + ' percobaan.';

      // Tampilkan penjelasan temuan penting
      var ul = document.getElementById('gbFinds');
      ketemu.forEach(function(k){
        if(artiTemuan[k[0]]){
          var li = document.createElement('li');
          li.innerHTML = '<span>\uD83D\uDCC1</span><span><b>' + esc(k[0]) +
            '</b> (status ' + k[1] + ')<br>' + esc(artiTemuan[k[0]]) + '</span>';
          ul.appendChild(li);
        }
      });

      gbBusy = false; btn.disabled = false; btn.style.opacity = 1;
      return;
    }

    var jalur = kamus[i][0], kode = kamus[i][1];

    if(kode === 404){
      termWrite('gbTerm', '<span class="dim">mencoba ' + esc(jalur) + ' — tidak ada (404)</span>');
    } else {
      ketemu.push(kamus[i]);
      var warna = (kode === 200) ? 'hit' : (kode === 403 ? 'no' : 'inf');
      termWrite('gbTerm', '<span class="' + warna + '">KETEMU ' + esc(jalur) +
        '  (status ' + kode + ')</span>');
    }

    i++;
    var persen = Math.round(i / kamus.length * 100);
    isi.style.width = persen + '%';
    lbl.textContent = 'Mencoba kata ke-' + i + ' dari ' + kamus.length + ' (' + persen + '%)';

    setTimeout(next, 190);
  })();
}

var quizScan = [
  {
    q:'Sebelum memindai (scan) sebuah website, hal WAJIB yang harus kamu punya adalah...',
    o:['Komputer cepat','Izin tertulis dari pemilik website','Koneksi internet kencang'],
    a:1
  },
  {
    q:'Alat yang bertugas mengenali teknologi yang dipakai sebuah website adalah...',
    o:['WhatWeb','Gobuster','Notepad'],
    a:0
  },
  {
    q:'Gobuster menemukan halaman tersembunyi dengan cara...',
    o:['Menebak alamat satu per satu dari daftar kata','Bertanya ke pemilik website','Menebak kata sandi'],
    a:0
  },
  {
    q:'Kenapa versi server (misal nginx/1.18.0) sebaiknya disembunyikan?',
    o:['Supaya website lebih cepat','Supaya penjahat sulit mencari kelemahan versi itu','Supaya warnanya bagus'],
    a:1
  }
];

var sAnswered = 0, sScore = 0;

function buildScanQuiz(){
  var box = document.getElementById('scanQuizBox');
  if(!box) return;

  quizScan.forEach(function(item, qi){
    var d = document.createElement('div');
    d.className = 'q';

    var p = document.createElement('p');
    p.textContent = (qi + 1) + '. ' + item.q;
    d.appendChild(p);

    var opts = document.createElement('div');
    opts.className = 'opts';

    item.o.forEach(function(txt, oi){
      var b = document.createElement('button');
      b.className = 'opt';
      b.textContent = txt;
      b.onclick = function(){ pickScan(d, b, oi, item.a); };
      opts.appendChild(b);
    });

    d.appendChild(opts);
    box.appendChild(d);
  });

  var sc = document.createElement('div');
  sc.id = 'scanScore';
  box.appendChild(sc);
}

function pickScan(d, btn, oi, ans){
  if(d.dataset.done) return;
  d.dataset.done = '1';
  sAnswered++;

  d.querySelectorAll('.opt').forEach(function(b, i){
    if(i === ans) b.classList.add('correct');
    b.disabled = true;
  });

  if(oi === ans){ sScore++; } else { btn.classList.add('wrong'); }

  var sc = document.getElementById('scanScore');
  if(sAnswered === quizScan.length){
    sc.textContent = '\uD83C\uDFC6 Skormu: ' + sScore + ' / ' + quizScan.length + ' — ' +
      (sScore === quizScan.length ? 'Hebat! Kamu paham aturan mainnya!' : 'Bagus! Baca lagi ya bagian aturannya.');
  } else {
    sc.textContent = 'Skor sementara: ' + sScore + ' / ' + sAnswered;
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

/* =========================================
   INTERACTIVE WEB SCANNING CARDS
========================================= */

document.addEventListener("DOMContentLoaded", function(){

  const cards = document.querySelectorAll(".learning-card");
  const dots = document.querySelectorAll(".slide-dot");

  const prevBtn = document.getElementById("prevApa");
  const nextBtn = document.getElementById("nextApa");

  if (!cards.length) return;

  let currentSlide = 0;


  function showSlide(index){

    currentSlide = index;

    cards.forEach((card, i) => {
      card.classList.toggle("active", i === currentSlide);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentSlide);
    });

    // Tombol kiri mati ketika berada di slide pertama
    prevBtn.disabled = currentSlide === 0;

    // Tombol kanan mati ketika berada di slide terakhir
    nextBtn.disabled = currentSlide === cards.length - 1;
  }


  function nextSlide(){

    if(currentSlide < cards.length - 1){
      showSlide(currentSlide + 1);
    }

  }


  function prevSlide(){

    if(currentSlide > 0){
      showSlide(currentSlide - 1);
    }

  }


  nextBtn.addEventListener("click", nextSlide);

  prevBtn.addEventListener("click", prevSlide);


  // Bisa juga menggunakan keyboard ← →
  document.addEventListener("keydown", function(event){

    // Jangan mengganggu ketika user sedang mengetik
    const tag = event.target.tagName.toLowerCase();

    if(
      tag === "input" ||
      tag === "textarea" ||
      tag === "select"
    ){
      return;
    }

    if(event.key === "ArrowRight"){
      nextSlide();
    }

    if(event.key === "ArrowLeft"){
      prevSlide();
    }

  });


  // Tampilan awal
  showSlide(0);

});

buildScanQuiz();
