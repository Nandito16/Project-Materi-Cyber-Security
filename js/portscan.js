function pWrite(id, html){
  var el = document.getElementById(id);
  el.innerHTML += html + '\n';
  el.scrollTop = el.scrollHeight;
}
function pClear(id){ document.getElementById(id).innerHTML = ''; }
function pEsc(s){ return String(s).replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

var targetPort = {
  'server-ceroboh.latihan': {
    judul: 'Server Ceroboh (banyak pintu lupa dikunci)',
    ports: [
      [21,   'ftp',    'terbuka',   'Kirim file TANPA penguncian. Sandi bisa dibaca orang di tengah jalan.'],
      [22,   'ssh',    'terbuka',   'Pintu kendali jarak jauh. Aman jika pakai kunci, tapi jangan dibuka ke semua orang.'],
      [23,   'telnet', 'terbuka',   'SANGAT BAHAYA! Telnet mengirim sandi apa adanya tanpa dikunci. Harus dimatikan.'],
      [25,   'smtp',   'terbuka',   'Pintu pengirim email. Kalau salah atur, bisa dipakai orang untuk kirim spam.'],
      [80,   'http',   'terbuka',   'Pintu website biasa. Wajar terbuka, tapi sebaiknya dialihkan ke HTTPS.'],
      [443,  'https',  'terbuka',   'Pintu website terkunci (aman). Ini memang harus terbuka.'],
      [3306, 'mysql',  'terbuka',   'BAHAYA BESAR! Ini pintu gudang data. Tidak boleh terbuka ke internet.'],
      [3389, 'rdp',    'terbuka',   'BAHAYA! Pintu layar jarak jauh. Sering jadi sasaran penjahat.'],
      [8080, 'http-alt','terbuka',  'Pintu website cadangan. Sering lupa dijaga padahal ikut terbuka.'],
      [110,  'pop3',   'tertutup',  ''],
      [139,  'netbios','tertutup',  ''],
      [445,  'smb',    'tertutup',  '']
    ]
  },
  'server-rapi.latihan': {
    judul: 'Server Rapi (hanya pintu yang perlu saja)',
    ports: [
      [21,   'ftp',    'tersaring', ''],
      [22,   'ssh',    'tersaring', ''],
      [23,   'telnet', 'tertutup',  ''],
      [25,   'smtp',   'tersaring', ''],
      [80,   'http',   'terbuka',   'Terbuka, tapi langsung dialihkan ke HTTPS. Ini praktik yang baik.'],
      [443,  'https',  'terbuka',   'Satu-satunya pintu utama. Terkunci rapat dengan sertifikat.'],
      [3306, 'mysql',  'tersaring', ''],
      [3389, 'rdp',    'tertutup',  ''],
      [8080, 'http-alt','tertutup', ''],
      [110,  'pop3',   'tertutup',  ''],
      [139,  'netbios','tertutup',  ''],
      [445,  'smb',    'tertutup',  '']
    ]
  }
};

var npBusy = false;

function runNmap(){
  if(npBusy) return;

  var target = document.getElementById('npTarget').value;
  var mode   = document.getElementById('npMode').value;   // 'cepat' atau 'versi'
  var data   = targetPort[target];
  var btn    = document.getElementById('npBtn');

  npBusy = true; btn.disabled = true; btn.style.opacity = .6;

  pClear('npTerm');
  document.getElementById('npTable').innerHTML = '';
  document.getElementById('npFinds').innerHTML = '';

  var isi = document.getElementById('npFill');
  var lbl = document.getElementById('npLabel');
  isi.style.width = '0%';

  var perintah = (mode === 'versi')
    ? 'nmap -sV ' + target
    : 'nmap ' + target;

  pWrite('npTerm', '<span class="pr">siswa@bloxy:~$</span> ' + pEsc(perintah));
  pWrite('npTerm', '<span class="dim">(simulasi — tidak ada koneksi jaringan sungguhan)</span>');
  pWrite('npTerm', '');
  pWrite('npTerm', '<span class="inf">Memulai Nmap (latihan) — target: ' + pEsc(data.judul) + '</span>');
  pWrite('npTerm', '<span class="dim">Memeriksa ' + data.ports.length + ' pintu (port)...</span>');
  pWrite('npTerm', '');

  var i = 0;
  var terbuka = [];

  (function next(){
    if(i >= data.ports.length){
      selesaiNmap(data, terbuka, mode);
      return;
    }

    var p = data.ports[i];
    var no = p[0], layanan = p[1], status = p[2];

    if(status === 'terbuka'){
      terbuka.push(p);
      var teks = 'TERBUKA  ' + no + '/tcp  ' + layanan;
      if(mode === 'versi') teks += '  ' + versiPalsu(no);
      pWrite('npTerm', '<span class="hit">' + pEsc(teks) + '</span>');
    } else if(status === 'tersaring'){
      pWrite('npTerm', '<span class="inf">tersaring ' + no + '/tcp  ' + pEsc(layanan) +
        ' <span class="dim">(dihalau tembok api)</span></span>');
    } else {
      pWrite('npTerm', '<span class="dim">tertutup  ' + no + '/tcp  ' + pEsc(layanan) + '</span>');
    }

    i++;
    var persen = Math.round(i / data.ports.length * 100);
    isi.style.width = persen + '%';
    lbl.textContent = 'Memeriksa pintu ke-' + i + ' dari ' + data.ports.length + ' (' + persen + '%)';

    setTimeout(next, 230);
  })();
}

function versiPalsu(no){
  var v = {
    21:'vsftpd 2.3.4', 22:'OpenSSH 7.4', 23:'Linux telnetd',
    25:'Postfix smtpd', 80:'Apache 2.4.29', 443:'nginx 1.18.0',
    3306:'MySQL 5.7.33', 3389:'Microsoft Terminal Services', 8080:'Jetty 9.4'
  };
  return v[no] ? '(' + v[no] + ')' : '';
}

function selesaiNmap(data, terbuka, mode){
  pWrite('npTerm', '');
  pWrite('npTerm', '<span class="pr">Selesai.</span> <span class="dim">' +
    terbuka.length + ' pintu terbuka dari ' + data.ports.length + ' yang diperiksa.</span>');

  document.getElementById('npLabel').textContent =
    'Selesai — ' + terbuka.length + ' pintu terbuka dari ' + data.ports.length + ' pintu.';

  var html = '<table class="tbl" style="margin-top:14px">' +
    '<tr><th>Pintu</th><th>Layanan</th><th>Status</th></tr>';

  data.ports.forEach(function(p){
    var kelas = p[2] === 'terbuka' ? 'st-open'
              : (p[2] === 'tersaring' ? 'st-filter' : 'st-close');
    html += '<tr><td><b>' + p[0] + '/tcp</b></td><td>' + pEsc(p[1]) +
            (mode === 'versi' && p[2] === 'terbuka' ? ' <span class="dim2">' + pEsc(versiPalsu(p[0])) + '</span>' : '') +
            '</td><td><span class="st ' + kelas + '">' + p[2] + '</span></td></tr>';
  });
  html += '</table>';
  document.getElementById('npTable').innerHTML = html;

  var ul = document.getElementById('npFinds');
  terbuka.forEach(function(p){
    if(!p[3]) return;
    var bahaya = /BAHAYA/.test(p[3]);
    var li = document.createElement('li');
    li.innerHTML = '<span>' + (bahaya ? '\uD83D\uDEA8' : '\uD83D\uDEAA') + '</span>' +
      '<span><b>Pintu ' + p[0] + ' (' + pEsc(p[1]) + ')</b><br>' + pEsc(p[3]) + '</span>';
    ul.appendChild(li);
  });

  npBusy = false;
  var btn = document.getElementById('npBtn');
  btn.disabled = false; btn.style.opacity = 1;
}

var pintuGame = [
  [21,   'ftp',     true,  'FTP tidak terkunci. Sebaiknya ditutup dan diganti SFTP.'],
  [23,   'telnet',  true,  'Telnet mengirim sandi polos. Wajib ditutup!'],
  [80,   'http',    false, 'Pintu website. Perlu terbuka supaya orang bisa berkunjung.'],
  [443,  'https',   false, 'Pintu website terkunci. Ini justru yang paling penting dibuka.'],
  [3306, 'mysql',   true,  'Gudang data tidak boleh diakses langsung dari internet.'],
  [3389, 'rdp',     true,  'Layar jarak jauh sangat sering diserang. Tutup atau batasi.']
];

var pilihanGame = {};

function buildFirewallGame(){
  var box = document.getElementById('fwList');
  if(!box) return;

  pintuGame.forEach(function(p){
    var no = p[0];
    var d = document.createElement('div');
    d.className = 'fw-item';
    d.id = 'fw' + no;
    d.innerHTML =
      '<div class="fw-info"><b>Pintu ' + no + '</b><span class="dim2">' + p[1] + '</span></div>' +
      '<button class="btn small" style="background:var(--bx-slate)" ' +
      'id="fwb' + no + '" onclick="toggleFw(' + no + ')">Biarkan Terbuka</button>' +
      '<div class="fw-note" id="fwn' + no + '"></div>';
    box.appendChild(d);
  });
}

function toggleFw(no){
  pilihanGame[no] = !pilihanGame[no];
  var b = document.getElementById('fwb' + no);
  if(pilihanGame[no]){
    b.textContent = 'Tutup Pintu \uD83D\uDD12';
    b.style.background = 'var(--bx-red)';
  } else {
    b.textContent = 'Biarkan Terbuka';
    b.style.background = 'var(--bx-slate)';
  }
}

function cekFirewall(){
  var benar = 0;

  pintuGame.forEach(function(p){
    var no = p[0], harusTutup = p[2], alasan = p[3];
    var dipilih = !!pilihanGame[no];
    var item = document.getElementById('fw' + no);
    var note = document.getElementById('fwn' + no);

    item.classList.remove('fw-ok','fw-no');

    if(dipilih === harusTutup){
      benar++;
      item.classList.add('fw-ok');
      note.innerHTML = '\u2705 Tepat! ' + pEsc(alasan);
    } else {
      item.classList.add('fw-no');
      note.innerHTML = '\u274C Belum tepat. ' + pEsc(alasan);
    }
  });

  var hasil = document.getElementById('fwScore');
  hasil.textContent = '\uD83C\uDFC6 Skormu: ' + benar + ' / ' + pintuGame.length + ' — ' +
    (benar === pintuGame.length
      ? 'Sempurna! Kamu tembok api yang hebat!'
      : 'Bagus! Baca catatan di tiap pintu lalu coba lagi.');
}

function resetFirewall(){
  pilihanGame = {};
  pintuGame.forEach(function(p){
    var no = p[0];
    var b = document.getElementById('fwb' + no);
    b.textContent = 'Biarkan Terbuka';
    b.style.background = 'var(--bx-slate)';
    document.getElementById('fwn' + no).innerHTML = '';
    document.getElementById('fw' + no).classList.remove('fw-ok','fw-no');
  });
  document.getElementById('fwScore').textContent = '';
}

var quizPort = [
  {
    q:'Dalam dunia komputer, “port” paling mirip dengan...',
    o:['Pintu bernomor pada sebuah gedung','Nama pemilik komputer','Warna layar'],
    a:0
  },
  {
    q:'Alat yang paling terkenal untuk memeriksa pintu (port) sebuah komputer adalah...',
    o:['Nmap','Paint','Kalkulator'],
    a:0
  },
  {
    q:'Pintu 3306 (database MySQL) sebaiknya...',
    o:['Dibuka untuk semua orang di internet','Ditutup / hanya boleh diakses dari dalam','Dihapus selamanya'],
    a:1
  },
  {
    q:'Status “tersaring” (filtered) artinya...',
    o:['Pintu dijaga tembok api sehingga tidak terlihat jelas','Pintu rusak','Pintu sudah dihapus'],
    a:0
  },
  {
    q:'Memindai port komputer milik orang lain tanpa izin adalah...',
    o:['Boleh saja asal cepat','Tidak boleh, harus izin dulu','Wajib dilakukan setiap hari'],
    a:1
  }
];

var pAnswered = 0, pScore = 0;

function buildPortQuiz(){
  var box = document.getElementById('portQuizBox');
  if(!box) return;

  quizPort.forEach(function(item, qi){
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
      b.onclick = function(){ pickPort(d, b, oi, item.a); };
      opts.appendChild(b);
    });

    d.appendChild(opts);
    box.appendChild(d);
  });

  var sc = document.createElement('div');
  sc.id = 'portScore';
  box.appendChild(sc);
}

function pickPort(d, btn, oi, ans){
  if(d.dataset.done) return;
  d.dataset.done = '1';
  pAnswered++;

  d.querySelectorAll('.opt').forEach(function(b, i){
    if(i === ans) b.classList.add('correct');
    b.disabled = true;
  });

  if(oi === ans){ pScore++; } else { btn.classList.add('wrong'); }

  var sc = document.getElementById('portScore');
  if(pAnswered === quizPort.length){
    sc.textContent = '\uD83C\uDFC6 Skormu: ' + pScore + ' / ' + quizPort.length + ' — ' +
      (pScore === quizPort.length ? 'Hebat! Kamu paham betul soal pintu!' : 'Bagus! Baca lagi ya bagian aturannya.');
  } else {
    sc.textContent = 'Skor sementara: ' + pScore + ' / ' + pAnswered;
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

buildFirewallGame();
buildPortQuiz();
