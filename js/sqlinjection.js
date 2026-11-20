/* =========================================
   PENGATURAN AWAL: NAVIGASI & SLIDER
========================================= */
document.addEventListener("DOMContentLoaded", function () {
  
  // --- 1. Navigasi Active & Smooth Scroll ---
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

  // --- 2. Fungsi Slideshow (Mendukung Multi-Slider) ---
  const sliders = document.querySelectorAll(".learning-slider");

  sliders.forEach(function (slider) {
    const cards = slider.querySelectorAll(".learning-card");
    const indicator = slider.nextElementSibling;
    const dots = indicator ? indicator.querySelectorAll(".slide-dot") : [];

    const prevBtn = slider.querySelector(".slide-arrow.left");
    const nextBtn = slider.querySelector(".slide-arrow.right");

    if (!cards.length || !prevBtn || !nextBtn) return;

    let currentSlide = 0;

    function showSlide(index) {
      currentSlide = Math.max(0, Math.min(index, cards.length - 1));

      cards.forEach((card, i) => {
        card.classList.toggle("active", i === currentSlide);
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentSlide);
      });

      prevBtn.disabled = currentSlide === 0;
      nextBtn.disabled = currentSlide === cards.length - 1;
    }

    nextBtn.addEventListener("click", function () {
      showSlide(currentSlide + 1);
    });

    prevBtn.addEventListener("click", function () {
      showSlide(currentSlide - 1);
    });

    dots.forEach((dot, index) => {
      dot.addEventListener("click", function () {
        showSlide(index);
      });
    });

    showSlide(0);
  });

  // --- 3. Panggil Render Kuis Awal ---
  renderQuizSlide();
});


/* =========================================
   KUIS SQL INJECTION (MODE SLIDE)
========================================= */

var quizSql = [
  {
    q: 'SQL Injection terjadi ketika sebuah website...',
    o: [
      'Menempel ketikan pengguna langsung ke perintah database',
      'Memakai warna yang terlalu terang',
      'Terlalu lambat dibuka'
    ],
    a: 0
  },
  {
    q: "Kenapa OR '1'='1' bisa membuka pintu login yang tidak aman?",
    o: [
      'Karena itu nama admin',
      'Karena syaratnya jadi SELALU benar',
      'Karena database menyukainya'
    ],
    a: 1
  },
  {
    q: 'Cara paling ampuh developer mencegah SQL Injection adalah...',
    o: [
      'Memakai parameterized query (perintah dan data dipisah)',
      'Melarang huruf kapital',
      'Menyembunyikan tombol login'
    ],
    a: 0
  },
  {
    q: 'Kalau kamu menemukan website rentan terhadap SQL Injection, sebaiknya...',
    o: [
      'Masuk dan mengacak-acak datanya',
      'Melaporkannya kepada pemilik website',
      'Membagikannya ke semua teman'
    ],
    a: 1
  }
];

var currentQuizIndex = 0;
var sqlScore = 0;

function renderQuizSlide() {
  var box = document.getElementById('sqlQuizBox');
  if(!box) return;

  // Bersihkan kotak kuis terlebih dahulu
  box.innerHTML = '';

  // Jika kuis sudah selesai
  if (currentQuizIndex >= quizSql.length) {
    var finalDiv = document.createElement('div');
    finalDiv.className = 'q-slide';
    finalDiv.style.textAlign = 'center';

    var msg = (sqlScore === quizSql.length)
        ? 'Sempurna! Kamu paham betul cara pintu login dijaga! 🏆'
        : 'Kerja Bagus! Terus belajar ya! 👍';

    finalDiv.innerHTML = '<h3>Kuis Selesai!</h3>' +
                         '<div id="sqlScoreResult">Skormu: ' + sqlScore + ' / ' + quizSql.length + '</div>' +
                         '<p>' + msg + '</p>' +
                         '<button class="btn play" style="margin-top:20px" onclick="resetQuiz()">Ulangi Kuis</button>';
    box.appendChild(finalDiv);
    return;
  }

  // Buat slide untuk pertanyaan saat ini
  var item = quizSql[currentQuizIndex];
  var slideDiv = document.createElement('div');
  slideDiv.className = 'q-slide';

  // Label pertanyaan
  var p = document.createElement('p');
  p.innerHTML = '<span style="color:var(--bx-slate); font-weight:bold;">Pertanyaan ' + (currentQuizIndex + 1) + ' dari ' + quizSql.length + '</span><br><br>' +
                '<b style="font-size:1.1rem">' + item.q + '</b>';
  slideDiv.appendChild(p);

  // Buat tombol opsi jawaban
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

  // Navigasi bawah (Tombol Next) - disembunyikan sampai user menjawab
  var navDiv = document.createElement('div');
  navDiv.className = 'quiz-nav';

  var nextBtn = document.createElement('button');
  nextBtn.className = 'btn play';
  nextBtn.innerHTML = (currentQuizIndex === quizSql.length - 1) ? 'Lihat Skor Akhir' : 'Selanjutnya ➔';
  nextBtn.onclick = function() {
    currentQuizIndex++;
    renderQuizSlide(); // Muat slide berikutnya
  };

  navDiv.appendChild(nextBtn);
  slideDiv.appendChild(navDiv);
  box.appendChild(slideDiv);
}

function handleAnswer(btn, selectedIndex, correctIndex, slideEl) {
  // Cegah spam klik
  if(slideEl.dataset.done) return;
  slideEl.dataset.done = '1';

  var btns = slideEl.querySelectorAll('.opt');
  btns.forEach(function(b, i){
    // Highlight jawaban yang benar
    if(i === correctIndex) {
      b.classList.add('correct');
    }
    b.disabled = true; // Matikan semua tombol opsi
  });

  // Cek jawaban
  if(selectedIndex === correctIndex) {
    sqlScore++;
  } else {
    // Highlight warna merah pada tombol yang salah dipilih
    btn.classList.add('wrong');
  }

  // Tampilkan tombol "Selanjutnya"
  var navDiv = slideEl.querySelector('.quiz-nav');
  if (navDiv) navDiv.style.display = 'block';
}

function resetQuiz() {
  currentQuizIndex = 0;
  sqlScore = 0;
  renderQuizSlide();
}