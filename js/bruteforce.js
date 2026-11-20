// NAVIGASI AKTIF SAAT SCROLL
document.addEventListener('DOMContentLoaded', () => {

  const navLinks = document.querySelectorAll('nav.menu a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      if (window.scrollY >= sectionTop) current = section.id;
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
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    });
  });

  updateActiveNav();
  renderQuizSlide();
});


// ENTER KEY — SIMULASI HYDRA
document.addEventListener('DOMContentLoaded', function() {
  const hyCommand = document.getElementById('wwCommand');
  if (!hyCommand) return;

  hyCommand.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      runHydra();
    }
  });
});


// SYNTAX PREVIEW
document.addEventListener('DOMContentLoaded', function() {
  const input   = document.getElementById('wwCommand');
  const preview = document.getElementById('wwCommandPreview');

  if (!input || !preview) return;

  function updatePreview() {
    preview.replaceChildren();
    const parts = input.value.split(/(hydra\b|-l\b|-P\b)/gi);

    parts.forEach(function(part) {
      if (/^hydra$/i.test(part)) {
        const span = document.createElement('span');
        span.className = 'keyword';
        span.textContent = part;
        preview.appendChild(span);
      } else if (/^(-l|-P)$/i.test(part)) {
        const span = document.createElement('span');
        span.className = 'gb-flag';
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
});

// TOMBOL HINT
document.addEventListener('DOMContentLoaded', function() {
  const hintBtn  = document.getElementById('hintBtn');
  const hintText = document.getElementById('hintText');

  if (hintBtn && hintText) {
    hintBtn.addEventListener('click', () => hintText.classList.toggle('show'));
  }
});


// HYDRA LOGIC
var wwBusy = false;

var kamusSandi = [
  '123456', 'password', '12345678', 'qwerty', '111111',
  'roblox', 'bloxy', 'admin', 'iloveyou', 'naga2010',
  'admin123', 'qwerty123'
];

function runHydra() {
  if (wwBusy) return;

  var input    = document.getElementById('wwCommand').value.trim();
  var btn      = document.getElementById('hyBtn');
  var terminal = document.getElementById('wwTerm');
  var finds    = document.getElementById('wwFinds');

  if (!terminal) return;

  var pola  = /^hydra\s+-l\s+(\S+)\s+-P\s+(\S+)\s+(?:https?:\/\/)?topupdoor\.vercel\.app\/admin\/?$/i;
  var cocok = input.match(pola);

  if (!cocok) {
    terminal.innerHTML =
      '<span class="no">ERROR: Perintah tidak dikenali.</span>\n';
    return;
  }

  var user         = cocok[1];
  var wordlist     = cocok[2];
  var sandiRahasia = 'admin123';

  wwBusy = true;
  if (btn) { btn.disabled = true; btn.style.opacity = .6; }

  terminal.innerHTML = '';
  if (finds) finds.innerHTML = '';

  terminal.innerHTML =
    '<div>Hydra v9.1 (SIMULASI) Password Cracker</div>'     +
    '<div class="dim">Target  : topupdoor.vercel.app/admin</div>'  +
    '<div class="dim">User    : ' + user + '</div>'          +
    '<div class="dim">Wordlist: ' + wordlist + '</div>'      +
    '<br>';

  var i = 0;

  function step() {
    if (kamusSandi[i] === sandiRahasia) {
      terminal.innerHTML +=
        '<div><span class="hit">[' + (i + 1) + '] mencoba "' + kamusSandi[i] + '" ... <b>COCOK! 😱</b></span></div>' +
        '<br>' +
        '<div><span class="pr">[+] LOGIN BERHASIL DITEBAK!</span></div>'                          +
        '<div><span class="pr">    login   : ' + user + '</span></div>'                            +
        '<div><span class="pr">    password: ' + kamusSandi[i] + '</span></div>';

      terminal.scrollTop = terminal.scrollHeight;
      selesaiHydra('ketemu', kamusSandi[i], i + 1);
      return;
    }

    if (i >= kamusSandi.length) {
      terminal.innerHTML +=
        '<br><div><span class="pr">[-] Semua sandi dicoba — tidak ada yang cocok.</span></div>';

      terminal.scrollTop = terminal.scrollHeight;
      selesaiHydra('gagal', null, kamusSandi.length);
      return;
    }

    terminal.innerHTML +=
      '<div><span class="dim">[' + (i + 1) + '] mencoba "' + kamusSandi[i] +
      '" ... <span class="no">GAGAL</span></span></div>';

    terminal.scrollTop = terminal.scrollHeight;
    i++;
    setTimeout(step, 430);
  }

  setTimeout(step, 500);
}

function selesaiHydra(hasil, sandi, coba) {
  wwBusy = false;

  var btn = document.getElementById('hyBtn');
  if (btn) { btn.disabled = false; btn.style.opacity = 1; }
  document.getElementById('wwCommand').value = '';

  var ul = document.getElementById('wwFinds');
  if (!ul) return;

  if (hasil === 'ketemu') {
    ul.innerHTML =
      '<li><span>😱</span><span><b>' + sandi + '</b> ditebak hanya dalam <b>' + coba +
        ' percobaan</b>. Sandi ini ada di daftar paling umum sedunia!</span></li>' +
      '<li><span>⚠️</span><span>Sandi <b>pendek &amp; umum</b> tanpa batas percobaan bisa ' +
        'ditebak secepat kilat oleh program otomatis.</span></li>' +
      '<li><span>💡</span><span>Pakai sandi <b>panjang &amp; unik</b> dan aktifkan ' +
        '<b>pembatas percobaan login</b>.</span></li>';
  } else {
    ul.innerHTML =
      '<li><span>🙂</span><span>Sandi target <b>tidak ada</b> di daftar umum — ' +
        'tebakan gagal.</span></li>' +
      '<li><span>💡</span><span>Sandi yang tidak umum membuat brute force ' +
        'jauh lebih sulit.</span></li>';
  }
}


// KUIS BRUTE FORCE (MODE SLIDE)
var quizBf = [
  {
    q: 'Serangan brute force adalah...',
    o: ['Mencoba banyak sandi satu per satu sampai ada yang cocok', 'Merusak layar komputer', 'Mengirim email lucu'],
    a: 0
  },
  {
    q: 'Alat yang terkenal untuk mencoba banyak sandi login adalah...',
    o: ['Paint', 'Hydra', 'Kalkulator'],
    a: 1
  },
  {
    q: 'Kenapa sandi "123456" sangat berbahaya?',
    o: ['Terlalu panjang', 'Ada di daftar sandi paling umum, jadi cepat ditebak', 'Warnanya jelek'],
    a: 1
  },
  {
    q: 'Cara paling ampuh melawan brute force adalah...',
    o: ['Sandi panjang &amp; unik + batasi percobaan login', 'Memakai huruf kecil semua', 'Menyembunyikan tombol login'],
    a: 0
  },
  {
    q: 'Kalau sebuah akun dikunci setelah 5 kali salah sandi, artinya...',
    o: ['Website-nya rusak', 'Brute force jadi sangat lambat dan hampir mustahil', 'Sandi jadi lebih lemah'],
    a: 1
  }
];

var currentQuizIndex = 0;
var bfScore = 0;

function renderQuizSlide() {
  var box = document.getElementById('bfQuizBox');
  if (!box) return;

  box.innerHTML = '';

  if (currentQuizIndex >= quizBf.length) {
    var finalDiv = document.createElement('div');
    finalDiv.className = 'q-slide';
    finalDiv.style.textAlign = 'center';

    var msg = (bfScore === quizBf.length)
      ? 'Sempurna! Kamu paham betul cara menjaga sandi! 🏆'
      : 'Kerja Bagus! Terus pelajari cara memperkuat keamananmu ya! 👍';

    finalDiv.innerHTML =
      '<h3>Kuis Selesai!</h3>' +
      '<div id="bfScoreResult">Skormu: ' + bfScore + ' / ' + quizBf.length + '</div>' +
      '<p>' + msg + '</p>' +
      '<button class="btn play" style="margin-top:20px" onclick="resetQuiz()">Ulangi Kuis</button>';
    box.appendChild(finalDiv);
    return;
  }

  var item     = quizBf[currentQuizIndex];
  var slideDiv = document.createElement('div');
  slideDiv.className = 'q-slide';

  var p = document.createElement('p');
  p.innerHTML =
    '<span style="color:var(--bx-slate); font-weight:bold;">Pertanyaan ' +
    (currentQuizIndex + 1) + ' dari ' + quizBf.length + '</span><br><br>' +
    '<b style="font-size:1.1rem">' + item.q + '</b>';
  slideDiv.appendChild(p);

  var opts = document.createElement('div');
  opts.className = 'opts';

  item.o.forEach(function(txt, oi) {
    var b = document.createElement('button');
    b.className = 'opt';
    b.innerHTML = txt;
    b.onclick = function() { handleAnswer(b, oi, item.a, slideDiv); };
    opts.appendChild(b);
  });
  slideDiv.appendChild(opts);

  var navDiv = document.createElement('div');
  navDiv.className = 'quiz-nav';
  navDiv.style.display = 'none';
  navDiv.style.marginTop = '20px';
  navDiv.style.textAlign = 'right';

  var nextBtn = document.createElement('button');
  nextBtn.className = 'btn play';
  nextBtn.innerHTML = (currentQuizIndex === quizBf.length - 1) ? 'Lihat Skor Akhir' : 'Selanjutnya ➔';
  nextBtn.onclick = function() { currentQuizIndex++; renderQuizSlide(); };

  navDiv.appendChild(nextBtn);
  slideDiv.appendChild(navDiv);
  box.appendChild(slideDiv);
}

function handleAnswer(btn, selectedIndex, correctIndex, slideEl) {
  if (slideEl.dataset.done) return;
  slideEl.dataset.done = '1';

  slideEl.querySelectorAll('.opt').forEach(function(b, i) {
    if (i === correctIndex) b.classList.add('correct');
    b.disabled = true;
  });

  if (selectedIndex === correctIndex) { bfScore++; }
  else { btn.classList.add('wrong'); }

  var navDiv = slideEl.querySelector('.quiz-nav');
  if (navDiv) navDiv.style.display = 'block';
}

function resetQuiz() {
  currentQuizIndex = 0;
  bfScore = 0;
  renderQuizSlide();
}

// SLIDER "APA ITU"
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('#apa .learning-slider').forEach(function(slider) {
    const cards   = slider.querySelectorAll('.learning-card');
    const indicator = slider.nextElementSibling;
    const dots    = indicator ? indicator.querySelectorAll('.slide-dot') : [];
    const prevBtn = slider.querySelector('.slide-arrow.left');
    const nextBtn = slider.querySelector('.slide-arrow.right');

    if (!cards.length || !prevBtn || !nextBtn) return;
    let currentSlide = 0;

    function showSlide(index) {
      currentSlide = Math.max(0, Math.min(index, cards.length - 1));
      cards.forEach(function(card, i) { card.classList.toggle('active', i === currentSlide); });
      dots.forEach(function(dot, i)   { dot.classList.toggle('active', i === currentSlide); });
      prevBtn.disabled = currentSlide === 0;
      nextBtn.disabled = currentSlide === cards.length - 1;
    }

    nextBtn.addEventListener('click', function() { showSlide(currentSlide + 1); });
    prevBtn.addEventListener('click', function() { showSlide(currentSlide - 1); });
    dots.forEach(function(dot, i) { dot.addEventListener('click', function() { showSlide(i); }); });

    showSlide(0);
  });
});