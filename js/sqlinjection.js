function sqliEsc(s){
  return String(s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
function sqliTerm(html){
  document.getElementById('sqliTerm').innerHTML = html;
}
function sqliVerdict(cls, html){
  var el = document.getElementById('sqliOut');
  el.className = 'out ' + cls;
  el.innerHTML = html;
}

var sqliTrick = /('|")\s*or\s*('|")?\s*\d+\s*=\s*\d+|--|;|\bor\b\s+\d+\s*=\s*\d+/i;

function sqliLogin(){
  var u = document.getElementById('sqliUser').value;
  var p = document.getElementById('sqliPass').value;
  var mode = document.getElementById('sqliMode').value;

  if(u.trim() === '' && p.trim() === ''){
    sqliVerdict('bad','Isi nama pemain dan sandi dulu ya!');
    sqliTerm('<span class="dim">Menunggu kamu menekan tombol \u201CMasuk\u201D...</span>');
    return;
  }

  var adaTrik = sqliTrick.test(u) || sqliTrick.test(p);

  if(mode === 'rentan'){
    sqliModeRentan(u, p, adaTrik);
  } else {
    sqliModeAman(u, p, adaTrik);
  }
}

function sqliModeRentan(u, p, adaTrik){
  var lines = [];
  lines.push('<span class="dim"># Website RENTAN menempel apa adanya ke perintah:</span>');
  lines.push('<span class="pr">SELECT * FROM pemain</span>');
  lines.push('<span class="pr">WHERE</span> nama=<span class="hit">\'' + sqliEsc(u) + '\'</span>');
  lines.push('  <span class="pr">AND</span> sandi=<span class="hit">\'' + sqliEsc(p) + '\'</span>;');
  lines.push('');

  if(adaTrik){
    lines.push('<span class="no"># Tanda kutip milikmu \u201Cmematahkan\u201D perintah!</span>');
    lines.push('<span class="no"># Sekarang syaratnya berisi  OR \'1\'=\'1\'  yang SELALU benar.</span>');
    lines.push('<span class="no"># Database mengira SEMUA pemain cocok \u2192 pintu terbuka.</span>');
    sqliTerm(lines.join('\n'));
    sqliVerdict('bad',
      '\uD83D\uDE2E Pintu <b>TERBUKA tanpa sandi yang benar!</b> Karena website ini menempel ' +
      'ketikanmu langsung ke perintah, tanda kutip <code>\'</code> milikmu mematahkan perintah, ' +
      'lalu <code>OR \'1\'=\'1\'</code> membuat syaratnya <b>selalu benar</b>. Inilah <b>SQL Injection</b>. ' +
      'Untung ini cuma simulasi! Ganti mode ke <b>\u201CWebsite Aman\u201D</b> dan coba trik yang sama.');
  } else if(u.trim() === '' || p.trim() === ''){
    sqliTerm(lines.join('\n'));
    sqliVerdict('warn','Isi <b>kedua</b> kolom ya, supaya perintahnya lengkap.');
  } else {
    lines.push('<span class="dim"># Database mencari pemain yang cocok...</span>');
    lines.push('<span class="inf"># Tidak ada akun bernama \u201C' + sqliEsc(u) + '\u201D \u2192 login gagal.</span>');
    lines.push('<span class="inf"># Jika input mengandung sintaks SQL, sintaks tersebut dapat dianggap sebagai bagian dari perintah.</span>');
    sqliTerm(lines.join('\n'));
    sqliVerdict('ok',
      '\u2705 Login biasa gagal karena akun ini palsu \u2014 bagus, kamu mencoba dengan jujur! ' +
      'Tapi hati-hati: website ini <b>rentan</b>. Klik <b>\u201CBeri Petunjuk\u201D</b> untuk melihat ' +
      'kata ajaib yang bisa menembusnya.');
  }
}

function sqliModeAman(u, p, adaTrik){
  var lines = [];
  lines.push('<span class="dim"># Website AMAN memisahkan PERINTAH dari DATA:</span>');
  lines.push('<span class="pr">SELECT * FROM pemain</span>');
  lines.push('<span class="pr">WHERE</span> nama=<span class="inf">?</span> <span class="pr">AND</span> sandi=<span class="inf">?</span>;');
  lines.push('');
  lines.push('<span class="dim"># Ketikanmu dikirim TERPISAH sebagai data biasa:</span>');
  lines.push('  <span class="inf">?1</span> = <span class="hit">\'' + sqliEsc(u) + '\'</span>');
  lines.push('  <span class="inf">?2</span> = <span class="hit">\'' + sqliEsc(p) + '\'</span>');
  lines.push('');

  if(adaTrik){
    lines.push('<span class="pr"># Tanda kutip &amp; \u201COR 1=1\u201D dianggap TEKS biasa, bukan perintah.</span>');
    lines.push('<span class="pr"># Database mencari pemain yang namanya benar-benar seperti itu.</span>');
    lines.push('<span class="inf"># Tentu tidak ada \u2192 login DITOLAK. Aman!</span>');
    sqliTerm(lines.join('\n'));
    sqliVerdict('ok',
      '\uD83D\uDEE1\uFE0F <b>Aman!</b> Kata ajaib yang tadi membobol kini <b>tidak berfungsi</b>. ' +
      'Website aman memakai <b>parameterized query</b> (tanda <code>?</code>): perintah dan data ' +
      'dikirim terpisah, jadi ketikanmu selalu dianggap teks biasa \u2014 bukan perintah. ' +
      'Inilah cara developer melindungi pintu login.');
  } else if(u.trim() === '' || p.trim() === ''){
    sqliTerm(lines.join('\n'));
    sqliVerdict('warn','Isi <b>kedua</b> kolom ya.');
  } else {
    lines.push('<span class="inf"># Tidak ada akun yang cocok \u2192 login gagal dengan aman.</span>');
    lines.push('<span class="inf"># Database tidak menjalankan input tersebut sebagai perintah SQL.</span>');
    lines.push('<span class="inf"># Input hanya dianggap sebagai nilai yang dicari.</span>');
    lines.push('<span class="inf"># \u2192 SQL Injection berhasil dicegah.</span>');
    sqliTerm(lines.join('\n'));
    sqliVerdict('ok','\u2705 Login gagal dengan aman. Coba tempel kata ajaib di sini \u2014 kamu akan lihat ia <b>tidak mempan</b> di website aman.');
  }
}

function sqliHint(){
  document.getElementById('sqliUser').value = "admin' OR '1'='1";
  document.getElementById('sqliPass').value = "apa saja";
  sqliVerdict('warn',
    '\uD83D\uDC40 Petunjuk: penjahat mengetik <code>admin\' OR \'1\'=\'1</code> di kolom nama. ' +
    'Sekarang klik <b>Masuk</b>. Coba di kedua mode dan bandingkan hasilnya!');
  sqliTerm('<span class="dim">Kata ajaib sudah diisi. Klik \u201CMasuk\u201D untuk melihat hasilnya...</span>');
}

function sqliReset(){
  document.getElementById('sqliUser').value = '';
  document.getElementById('sqliPass').value = '';
  document.getElementById('sqliMode').value = 'rentan';
  sqliVerdict('ok','');
  document.getElementById('sqliOut').className = 'out';
  sqliTerm('<span class="dim">Klik \u201CMasuk\u201D untuk melihat perintah yang dibuat website...</span>');
}

var quizSql = [
  {
    q:'SQL Injection terjadi ketika sebuah website...',
    o:['Menempel ketikan pengguna langsung ke perintah database','Memakai warna yang terlalu terang','Terlalu lambat dibuka'],
    a:0
  },
  {
    q:'Kenapa  OR \'1\'=\'1\'  bisa membuka pintu login yang tidak aman?',
    o:['Karena itu nama admin','Karena syaratnya jadi SELALU benar','Karena database menyukainya'],
    a:1
  },
  {
    q:'Cara paling ampuh developer mencegah SQL Injection adalah...',
    o:['Memakai parameterized query (perintah & data dipisah)','Melarang huruf kapital','Menyembunyikan tombol login'],
    a:0
  },
  {
    q:'Kalau kamu menemukan sebuah website bisa ditembus dengan kata ajaib, sebaiknya...',
    o:['Masuk dan mengacak-acak datanya','Melaporkannya ke pemilik/orang dewasa','Membagikannya ke semua teman'],
    a:1
  }
];

var sqlAnswered = 0;
var sqlScore = 0;

function buildSqlQuiz(){
  var box = document.getElementById('sqlQuizBox');
  if(!box) return;

  quizSql.forEach(function(item, qi){
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
      b.onclick = function(){ pickSql(d, b, oi, item.a); };
      opts.appendChild(b);
    });

    d.appendChild(opts);
    box.appendChild(d);
  });

  var sc = document.createElement('div');
  sc.id = 'sqlScore';
  box.appendChild(sc);
}

function pickSql(d, btn, oi, ans){
  if(d.dataset.done) return;
  d.dataset.done = '1';
  sqlAnswered++;

  var btns = d.querySelectorAll('.opt');
  btns.forEach(function(b, i){
    if(i === ans) b.classList.add('correct');
    b.disabled = true;
  });

  if(oi === ans){ sqlScore++; } else { btn.classList.add('wrong'); }

  var sc = document.getElementById('sqlScore');
  if(sqlAnswered === quizSql.length){
    sc.textContent = '\uD83C\uDFC6 Skormu: ' + sqlScore + ' / ' + quizSql.length + ' \u2014 ' +
      (sqlScore === quizSql.length ? 'Sempurna! Kamu paham cara pintu login dijaga!' : 'Bagus! Terus belajar ya!');
  } else {
    sc.textContent = 'Skor sementara: ' + sqlScore + ' / ' + sqlAnswered;
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

buildSqlQuiz();
