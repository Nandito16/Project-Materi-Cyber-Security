// PENGATURAN AWAL: NAVIGASI AKTIF SAAT SCROLL
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

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });

  updateActiveNav();
  
  renderQuizSlide();
});


// SLIDER "APA ITU DIREKTORI?"
document.addEventListener("DOMContentLoaded", function(){
  const cards = document.querySelectorAll(".learning-card");
  const dots = document.querySelectorAll(".slide-dot");
  const prevBtn = document.getElementById("prevApa");
  const nextBtn = document.getElementById("nextApa");

  if (!cards.length) return;

  let currentSlide = 0;
  function showSlide(index){
    currentSlide = index;
    cards.forEach((card, i) => { card.classList.toggle("active", i === currentSlide); });
    dots.forEach((dot, i) => { dot.classList.toggle("active", i === currentSlide); });    
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === cards.length - 1;
  }

  function nextSlide(){
    if(currentSlide < cards.length - 1){ showSlide(currentSlide + 1); }
  }

  function prevSlide(){
    if(currentSlide > 0){ showSlide(currentSlide - 1); }
  }

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function(event){
    const tag = event.target.tagName.toLowerCase();
    if(tag === "input" || tag === "textarea" || tag === "select"){ return; }
    if(event.key === "ArrowRight"){ nextSlide(); }
    if(event.key === "ArrowLeft"){ prevSlide(); }
  });
  showSlide(0);
});


// SIMULATION GOBUSTER
document.addEventListener("DOMContentLoaded", function(){
  const gbCommand = document.getElementById("gbCommand");
  if(!gbCommand) return;

  gbCommand.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
      event.preventDefault();
      runGobuster();
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("gbCommand");
  if (!input) return;

  const wrapper = document.createElement("div");
  wrapper.className = "gb-input-wrap";

  const preview = document.createElement("div");
  preview.id = "gbCommandPreview";
  preview.setAttribute("aria-hidden", "true");

  input.parentNode.insertBefore(wrapper, input);
  wrapper.appendChild(preview);
  wrapper.appendChild(input);

  function updatePreview() {
    preview.replaceChildren();
    const parts = input.value.split(/(gobuster|-w)/gi);

    parts.forEach(function (part) {
      if (/^gobuster$/i.test(part)) {
        const span = document.createElement("span");
        span.className = "gb-command";
        span.textContent = part;
        preview.appendChild(span);
      } else if (/^-w$/i.test(part)) {
        const span = document.createElement("span");
        span.className = "gb-flag";
        span.textContent = part;
        preview.appendChild(span);
      } else {
        preview.appendChild(document.createTextNode(part));
      }
    });
    preview.scrollLeft = input.scrollLeft;
  }

  input.addEventListener("input", updatePreview);
  input.addEventListener("scroll", updatePreview);
  updatePreview();
});

// TOMBOL HINT
document.addEventListener("DOMContentLoaded", function(){
  const hintBtn = document.getElementById("hintBtn");
  const safeTip = document.getElementById("hintText");

  if(hintBtn && safeTip){
    hintBtn.addEventListener("click", () => {
      safeTip.classList.toggle("show");
    });
  }
});

// GOBUSTER LOGIC
var wwBusy = false;
var kamus = [
  ['/register', 200], ['/image', 301],
  ['/login', 200], ['/database', 404],
  ['/admin', 200], ['/backup', 200], ['/tes', 404],
  ['/css', 301], ['/rahasia', 404], ['/javascript', 301],
  ['/admin/debug', 200], ['/pohon', 404], ['/.git', 200],
  ['/topup', 404], ['/uploads', 301], ['/pesawat', 404]
];
var gbTemuan = [
  ['/admin', 'Ayo coba akses /admin. Direktori ini ditemukan dengan status 200. Wow!Apakah halaman admin tidak sengaja bisa diakses?'],
  ['/admin/debug', 'Ayo coba akses /admin/debug. Halaman debug yang terbuka untuk publik dapat membocorkan informasi sensitif.'],
];

function runGobuster(){
  if(wwBusy) return;

  var input = document.getElementById('gbCommand').value.trim();
  var btn = document.getElementById('gbBtn');
  var terminal = document.getElementById('gbTerm');
  var finds = document.getElementById('gbFinds');

  if(!terminal) return;
  var pola = /^gobuster\s+-w\s+(https?:\/\/topupdoor\.vercel\.app)\/?\s+-w\s+file\.txt$/i;
  var cocok = input.match(pola);

  if(!cocok){
    terminal.innerHTML = '<span class="no">ERROR: Perintah tidak dikenali.</span>';
    return;
  }

  wwBusy = true;
  if(btn){
    btn.disabled = true;
    btn.style.opacity = .6;
  }

  terminal.innerHTML = '';
  if(finds){
    finds.innerHTML = '';
  }

  var hasil = kamus.filter(function(item){
    return item[1] !== 404;
  });

  var i = 0;

  terminal.innerHTML =
    '<div class="pr">================================================</div>' +
    '<div>Gobuster Directory Scanner</div>' +
    '<div class="dim">Target: http://toko-latihan.latihan</div>' +
    '<div class="dim">Wordlist: file.txt</div>' +
    '<div class="pr">================================================</div>' +
    '<br>';

  function tampilkanHasil(){
    if(i >= hasil.length){
      terminal.innerHTML +=
        '<br><span class="pr">Scan selesai.</span> <span class="dim">' +
        hasil.length + ' direktori ditemukan.</span>';

      if(finds){
        finds.innerHTML = '';

        hasil.forEach(function(item){
          var path = item[0];
          var status = item[1];

          var temuan = gbTemuan.find(function(t){
            return t[0] === path;
          });

          if(!temuan) return;

          var li = document.createElement('li');

          var info = document.createElement('span');
          var judul = document.createElement('b');
          var keterangan = document.createElement('span');

          judul.textContent = path + ' (Status: ' + status + ')';
          keterangan.textContent = temuan[1];

          info.appendChild(judul);
          info.appendChild(document.createElement('br'));
          info.appendChild(keterangan);

          li.appendChild(document.createTextNode('🔎 '));
          li.appendChild(info);

          finds.appendChild(li);
        });
      }

      wwBusy = false;

      if(btn){
        btn.disabled = false;
        btn.style.opacity = 1;
      }

      document.getElementById('gbCommand').value = '';
      terminal.scrollTop = terminal.scrollHeight;
      return;
    }

    var path = hasil[i][0];
    var status = hasil[i][1];
    var statusClass = "pr";

    if(status === 403){ statusClass = "no"; }
    if(status === 301){ statusClass = "dim"; }

    terminal.innerHTML +=
      '<div><span class="pr">' + path + '</span> <span class="' + statusClass + '">(Status: ' + status + ')</span></div>';
      
    terminal.scrollTop = terminal.scrollHeight;
    i++;
    setTimeout(tampilkanHasil, 300);
  }

  setTimeout(tampilkanHasil, 500);
}

// KUIS DIREKTORI & PORT SCANNING
var quizPort = [
  {
    q: 'Apa tujuan utama Directory Scanning?',
    o: [
      'Mencari direktori atau file yang tersedia pada website',
      'Mengubah alamat IP server',
      'Mempercepat koneksi internet'
    ],
    a: 0
  },
  {
    q: 'Alat yang dapat digunakan untuk melakukan Directory Scanning adalah...',
    o: [
      'Paint',
      'Gobuster',
      'Kalkulator'
    ],
    a: 1
  },
  {
    q: 'Dalam hasil Gobuster, status HTTP 200 berarti...',
    o: [
      'Direktori atau resource berhasil diakses',
      'Direktori pasti berisi malware',
      'Server tidak ditemukan'
    ],
    a: 0
  },
  {
    q: 'Mengapa direktori /admin yang ditemukan perlu diperiksa lebih lanjut?',
    o: [
      'Karena semua halaman admin pasti rentan',
      'Untuk memastikan kontrol autentikasi dan otorisasi berjalan dengan benar',
      'Agar semua pengguna bisa menjadi administrator'
    ],
    a: 1
  },
  {
    q: 'Apa tindakan yang tepat jika Directory Scanning menemukan direktori /backup yang dapat diakses publik?',
    o: [
      'Mengunduh seluruh file tanpa izin',
      'Mengabaikannya karena statusnya 200',
      'Memeriksa apakah akses tersebut memang diizinkan dan melaporkannya jika berisiko'
    ],
    a: 2
  }
];

var currentQuizIndex = 0;
var pScore = 0;

function renderQuizSlide() {
  var box = document.getElementById('portQuizBox');
  if (!box) return;

  box.innerHTML = '';

  if (currentQuizIndex >= quizPort.length) {
    var finalDiv = document.createElement('div');
    finalDiv.className = 'q-slide';
    finalDiv.style.textAlign = 'center';

    var msg = (pScore === quizPort.length)
      ? 'Sempurna! Kamu memahami Directory Scanning! 🏆'
      : 'Kerja bagus! Pelajari kembali materi Directory Scanning, ya! 👍';

    finalDiv.innerHTML =
      '<h3>Kuis Selesai!</h3>' +
      '<div id="portScoreResult">Skormu: ' +
      pScore + ' / ' + quizPort.length + '</div>' +
      '<p>' + msg + '</p>' +
      '<button class="btn play" style="margin-top:20px" ' +
      'onclick="resetQuiz()">Ulangi Kuis</button>';

    box.appendChild(finalDiv);
    return;
  }

  var item = quizPort[currentQuizIndex];
  var slideDiv = document.createElement('div');
  slideDiv.className = 'q-slide';

  var p = document.createElement('p');
  p.innerHTML =
    '<span style="color:var(--bx-slate); font-weight:bold;">' +
    'Pertanyaan ' + (currentQuizIndex + 1) +
    ' dari ' + quizPort.length +
    '</span><br><br>' +
    '<b style="font-size:1.1rem">' + item.q + '</b>';

  slideDiv.appendChild(p);

  var opts = document.createElement('div');
  opts.className = 'opts';

  item.o.forEach(function(txt, oi) {
    var b = document.createElement('button');
    b.className = 'opt';
    b.textContent = txt;

    b.onclick = function() {
      handleAnswer(b, oi, item.a, slideDiv);
    };

    opts.appendChild(b);
  });

  slideDiv.appendChild(opts);

  var navDiv = document.createElement('div');
  navDiv.className = 'quiz-nav';
  navDiv.style.display = 'none';

  var nextBtn = document.createElement('button');
  nextBtn.className = 'btn play';

  nextBtn.textContent =
    (currentQuizIndex === quizPort.length - 1)
      ? 'Lihat Skor Akhir'
      : 'Selanjutnya ➔';

  nextBtn.onclick = function() {
    currentQuizIndex++;
    renderQuizSlide();
  };

  navDiv.appendChild(nextBtn);
  slideDiv.appendChild(navDiv);
  box.appendChild(slideDiv);
}

function handleAnswer(btn, selectedIndex, correctIndex, slideEl) {
  if (slideEl.dataset.done) return;
  slideEl.dataset.done = '1';

  var btns = slideEl.querySelectorAll('.opt');

  btns.forEach(function(b, i) {
    if (i === correctIndex) {
      b.classList.add('correct');
    }

    b.disabled = true;
  });

  if (selectedIndex === correctIndex) {
    pScore++;
  } else {
    btn.classList.add('wrong');
  }
  var navDiv = slideEl.querySelector('.quiz-nav');
  if (navDiv) navDiv.style.display = 'block';
}

function resetQuiz() {
  currentQuizIndex = 0;
  pScore = 0;
  renderQuizSlide();
}
