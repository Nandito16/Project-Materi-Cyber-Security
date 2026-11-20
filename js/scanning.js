//  FUNGSI TERMINAL BANTU
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


//  SIMULASI 1 - WhatWeb
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

  var input = document.getElementById('wwCommand').value.trim();
  var pola = /^whatweb\s+(https?:\/\/)(topupdoor\.vercel\.app|blog-bloxy\.latihan)\/?$/i;
  var cocok = input.match(pola);

  if(!cocok){
    termClear('wwTerm');
    termWrite('wwTerm', '<span class="no">ERROR: Perintah tidak dikenali. Cek ejaan atau target URL-nya.</span>');
    return;
  }
  var target = input.match(/https?:\/\/([^\/\s]+)/i)[1].toLowerCase();
  var data = targetWhatWeb[target];

  if (target === 'topupdoor.vercel.app') {
    data = targetWhatWeb['toko-bloxy.latihan'];
  }

  if(!data){
    termClear('wwTerm');
    termWrite('wwTerm', '<span class="no">ERROR: Target tidak tersedia dalam simulasi.</span>');
    return;
  }

  wwBusy = true;

  termClear('wwTerm');
  document.getElementById('wwFinds').innerHTML = '';
  termWrite('wwTerm', '');
  playLines('wwTerm', data.lines, 420, function(){
    termWrite('wwTerm', '');
    termWrite('wwTerm', '<span class="pr">Selesai.</span> <span class="dim">1 target diperiksa.</span>');

    var ul = document.getElementById('wwFinds');
    data.temuan.forEach(function(t){
      var li = document.createElement('li');
      li.innerHTML = '<span>🔎</span><span><b>' + esc(t[0]) + '</b><br>' + esc(t[1]) + '</span>';
      ul.appendChild(li);
    });

    wwBusy = false;
    document.getElementById('wwCommand').value = '';
  });
}



// KUIS WEB SCANNING (MODE SLIDE)
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

var currentQuizIndex = 0;
var sScore = 0;

function renderQuizSlide() {
  var box = document.getElementById('scanQuizBox');
  if(!box) return;

  box.innerHTML = '';

  if (currentQuizIndex >= quizScan.length) {
    var finalDiv = document.createElement('div');
    finalDiv.className = 'q-slide';
    finalDiv.style.textAlign = 'center';

    var msg = (sScore === quizScan.length)
        ? 'Sempurna! Kamu detektif website yang handal! 🏆'
        : 'Kerja Bagus! Coba baca lagi bagian aturannya ya! 👍';

    finalDiv.innerHTML = '<h3>Kuis Selesai!</h3>' +
                         '<div id="scanScoreResult">Skormu: ' + sScore + ' / ' + quizScan.length + '</div>' +
                         '<p>' + msg + '</p>' +
                         '<button class="btn play" style="margin-top:20px" onclick="resetQuiz()">Ulangi Kuis</button>';
    box.appendChild(finalDiv);
    return;
  }

  var item = quizScan[currentQuizIndex];
  var slideDiv = document.createElement('div');
  slideDiv.className = 'q-slide';
  var p = document.createElement('p');
  p.innerHTML = '<span style="color:var(--bx-slate); font-weight:bold;">Pertanyaan ' + (currentQuizIndex + 1) + ' dari ' + quizScan.length + '</span><br><br>' +
                '<b style="font-size:1.1rem">' + item.q + '</b>';
  slideDiv.appendChild(p);

  var opts = document.createElement('div');
  opts.className = 'opts';

  item.o.forEach(function(txt, oi){
    var b = document.createElement('button');
    b.className = 'opt';
    b.innerHTML = txt;
    b.onclick = function(){ handleAnswer(b, oi, item.a, slideDiv); };
    opts.appendChild(b);
  });

  slideDiv.appendChild(opts);

  var navDiv = document.createElement('div');
  navDiv.className = 'quiz-nav';
  navDiv.style.marginTop = '20px';
  navDiv.style.display = 'none';
  navDiv.style.textAlign = 'right';

  var nextBtn = document.createElement('button');
  nextBtn.className = 'btn play';
  nextBtn.innerHTML = (currentQuizIndex === quizScan.length - 1) ? 'Lihat Skor Akhir' : 'Selanjutnya ➔';
  nextBtn.onclick = function() {
    currentQuizIndex++;
    renderQuizSlide();
  };

  navDiv.appendChild(nextBtn);
  slideDiv.appendChild(navDiv);
  box.appendChild(slideDiv);
}

function handleAnswer(btn, selectedIndex, correctIndex, slideEl) {
  if(slideEl.dataset.done) return;
  slideEl.dataset.done = '1';

  var btns = slideEl.querySelectorAll('.opt');
  btns.forEach(function(b, i){
    if(i === correctIndex) {
      b.classList.add('correct');
    }
    b.disabled = true;
  });

  if(selectedIndex === correctIndex) {
    sScore++;
  } else {
    btn.classList.add('wrong');
  }

  var navDiv = slideEl.querySelector('.quiz-nav');
  if (navDiv) navDiv.style.display = 'block';
}

function resetQuiz() {
  currentQuizIndex = 0;
  sScore = 0;
  renderQuizSlide();
}



//  EVENT LISTENER HALAMAN & SLIDER

document.addEventListener('DOMContentLoaded', () => {

  const navLinks = document.querySelectorAll('nav.menu a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 140) current = section.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', updateActiveNav);
  window.addEventListener('resize', updateActiveNav);
  navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      const header = document.querySelector('.nav');
      const headerHeight = header ? header.offsetHeight : 0;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - headerHeight - 20,
        behavior: 'smooth'
      });
    });
  });
  updateActiveNav();

  const cards  = document.querySelectorAll('.learning-card');
  const dots   = document.querySelectorAll('.slide-dot');
  const prevBtn = document.getElementById('prevApa');
  const nextBtn = document.getElementById('nextApa');

  if (cards.length && prevBtn && nextBtn) {
    let currentSlide = 0;

    function showSlide(index) {
      currentSlide = index;
      cards.forEach((card, i) => card.classList.toggle('active', i === currentSlide));
      dots.forEach((dot, i)   => dot.classList.toggle('active', i === currentSlide));
      prevBtn.disabled = currentSlide === 0;
      nextBtn.disabled = currentSlide === cards.length - 1;
    }

    nextBtn.addEventListener('click', () => { if (currentSlide < cards.length - 1) showSlide(currentSlide + 1); });
    prevBtn.addEventListener('click', () => { if (currentSlide > 0) showSlide(currentSlide - 1); });
    document.addEventListener('keydown', function(event) {
      const tag = event.target.tagName.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
      if (event.key === 'ArrowRight') nextBtn.click();
      if (event.key === 'ArrowLeft')  prevBtn.click();
    });

    showSlide(0);
  }

  const input   = document.getElementById('wwCommand');
  const preview = document.getElementById('wwCommandPreview');

  if (input && preview) {
    function updatePreview() {
      preview.replaceChildren();
      input.value.split(/(whatweb)/gi).forEach(function(part) {
        if (/^whatweb$/i.test(part)) {
          const span = document.createElement('span');
          span.className = 'keyword';
          span.textContent = part;
          preview.appendChild(span);
        } else {
          preview.appendChild(document.createTextNode(part));
        }
      });
      preview.scrollLeft = input.scrollLeft;
    }
    input.addEventListener('input', updatePreview);
    input.addEventListener('scroll', updatePreview);
    updatePreview();
  }

  if (input) {
    input.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') { event.preventDefault(); runWhatWeb(); }
    });
  }

  const hintBtn = document.getElementById('hintBtn');
  const safeTip = document.getElementById('hintText');
  if (hintBtn && safeTip) {
    hintBtn.addEventListener('click', () => safeTip.classList.toggle('show'));
  }

  renderQuizSlide();
});