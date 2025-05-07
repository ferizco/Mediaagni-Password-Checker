
// Mediaagni tools : Password Checker
// Version         : 2.3.1
// Author          : Ferizco


  const passwordInput = document.getElementById('passwordInput');
  const strengthBar = document.getElementById('strengthBar');
  const strengthText = document.getElementById('strengthText');
  const suggestionBox = document.getElementById('suggestionBox');
  const iconVisible = document.getElementById('icon-visible');
  const iconHidden = document.getElementById('icon-hidden');

  /**
   * Event listener untuk mendeteksi perubahan di input password.
   * Akan menghitung skor kekuatan password, memberikan saran, 
   * dan memperbarui indikator kekuatan secara visual.
   */
  passwordInput.addEventListener('input', () => {
    const pwd = passwordInput.value.trim();

    if (pwd === "") {
      strengthBar.style.width = "0%";
      strengthBar.style.background = "#ccc";
      strengthText.textContent = "Tingkat kekuatan akan muncul di sini";
      suggestionBox.style.display = "none";

      // Bersihkan hasil cek bocor
      const resultBox = document.getElementById("breachResult");
      if (resultBox) {
        resultBox.innerHTML = "";
        resultBox.style.color = "";
      }
          return;
    }

    let score = 0;
    const suggestions = [];

    if (pwd.length >= 12) score++;
    else suggestions.push("Gunakan minimal 12 karakter");

    if (/[A-Z]/.test(pwd)) score++;
    else suggestions.push("Tambahkan huruf besar (A-Z)");

    if (/[a-z]/.test(pwd)) score++;
    else suggestions.push("Tambahkan huruf kecil (a-z)");

    if (/\d/.test(pwd)) score++;
    else suggestions.push("Tambahkan angka (0-9)");

    if (/[\W_]/.test(pwd)) score++;
    else suggestions.push("Tambahkan simbol (!@#$% dll)");

    let strength = "", width = "0%", color = "#ccc";

    if (score <= 2) {
      strength = "Lemah 😟";
      width = "25%";
      color = "#e74c3c";
    } else if (score === 3) {
      strength = "Sedang 😐";
      width = "50%";
      color = "#f1c40f";
    } else if (score === 4) {
      strength = "Cukup Kuat 🙂";
      width = "75%";
      color = "#2ecc71";
    } else if (score === 5) {
      strength = "Sangat Kuat 💪";
      width = "100%";
      color = "#27ae60";
    }

    strengthBar.style.width = width;
    strengthBar.style.background = color;
    strengthText.textContent = strength;
    
    strengthBar.animate([
      { transform: 'scaleX(1)', offset: 0 },
      { transform: 'scaleX(1.03)', offset: 0.8 },
      { transform: 'scaleX(1)', offset: 1 }
    ], {
        duration: 300,
        fill: 'forwards'
      });
    
    if (suggestions.length > 0) {
      suggestionBox.style.display = "block";
      suggestionBox.innerHTML = "💡 Saran:<br>- " + suggestions.join("<br>- ");
    } else {
      suggestionBox.style.display = "none";
    }
  });

  /**
   * Mengubah tampilan password menjadi terlihat atau tersembunyi.
   * Juga mengganti ikon mata terbuka/tertutup secara dinamis.
   */
  function toggleVisibility() {
    const input = document.getElementById('passwordInput');
    const isHidden = input.getAttribute('type') === 'password';
    input.setAttribute('type', isHidden ? 'text' : 'password');

    const iconVisible = document.getElementById('icon-visible');
    const iconHidden = document.getElementById('icon-hidden');

    iconVisible.style.display = isHidden ? 'none' : 'block';
    iconHidden.style.display = isHidden ? 'block' : 'none';
  }

  /**
   * Menyalin password dari input ke clipboard menggunakan Clipboard API.
   * Setelah disalin, menampilkan notifikasi 'berhasil disalin' dengan animasi.
   * Fallback atau error akan ditampilkan jika gagal.
   */
  async function copyPassword() {
    try {
      await navigator.clipboard.writeText(passwordInput.value);

      const notice = document.getElementById("copyNotice");
      notice.style.opacity = 0;
      notice.style.display = "block";
      notice.animate([
        { opacity: 0, transform: "translateY(5px)" },
        { opacity: 1, transform: "translateY(0)" }
      ], {
        duration: 300,
        fill: "forwards"
      });
      setTimeout(() => {
        notice.animate([
          { opacity: 1, transform: "translateY(0)" },
          { opacity: 0, transform: "translateY(-5px)" }
        ], {
          duration: 300,
          fill: "forwards"
        });
        setTimeout(() => {
          notice.style.display = "none";
        }, 300);
      }, 2000);
    } catch (err) {
      alert("Gagal menyalin password ke clipboard.");
      console.error(err);
    }
  }
 
  /**
   * Menghasilkan hash SHA-1 dari string yang diberikan.
   * Digunakan untuk memproses password secara aman sebelum dikirim ke HIBP.
   * @param {string} str - Password yang akan di-hash.
   * @returns {Promise<string>} - Nilai hash dalam bentuk string hexadecimal huruf besar.
   */
  async function sha1(str) {
    const buffer = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest("SHA-1", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
  }
  
  /**
   * Membatasi jumlah request pengecekan password bocor (max 5x per menit).
   * Data disimpan sementara di localStorage browser.
   * @returns {boolean} - True jika masih boleh request, false jika kena limit.
   */
  function getRateLimitStatus() {
    const data = JSON.parse(localStorage.getItem("pwnedRateLimit")) || {};
    const now = Date.now();

      if (!data.timestamp || now - data.timestamp > 60000) {
        // Reset jika sudah lewat 1 menit
        const newData = { count: 1, timestamp: now };
        localStorage.setItem("pwnedRateLimit", JSON.stringify(newData));
        return true;
      }
      if (data.count >= 5) return false;
      data.count += 1;
      localStorage.setItem("pwnedRateLimit", JSON.stringify(data));
      return true; 
  }
    /**
     * Mengecek apakah password pengguna pernah bocor berdasarkan database HIBP.
     * Metode yang digunakan adalah k-anonymity (mengirim 5 karakter awal hash SHA-1).
     * Hasil akan ditampilkan ke user dan diberi warna sesuai status.
     */
    async function checkPwned() {
      const resultBox = document.getElementById("breachResult");
      if (!resultBox) return;

      if (!getRateLimitStatus()) {
        resultBox.innerHTML = "⚠️ Maksimal 5 kali pengecekan per menit. Silahkan tunggu sebentar.";
        resultBox.style.color = "#f39c12";
        return;
      }

      const pwd = passwordInput.value.trim();
      if (!pwd) {
        resultBox.innerHTML = "⚠️ Silahkan isi password terlebih dahulu.";
        resultBox.style.color = "#e67e22";
        return;
      }

      if (pwd.length > 25) {
      resultBox.innerHTML = "⚠️ Maksimal panjang password untuk dicek adalah 25 karakter.";
      resultBox.style.color = "#e67e22";
      return;
      }

      resultBox.innerHTML = `
        <svg class="checking-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path d="M32 0C14.3 0 0 14.3 0 32S14.3 64 32 64l0 11c0 42.4 16.9 83.1 46.9 113.1L146.7 256 78.9 323.9C48.9 353.9 32 394.6 32 437l0 11c-17.7 0-32 14.3-32 32s14.3 32 32 32l32 0 256 0 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-11c0-42.4-16.9-83.1-46.9-113.1L237.3 256l67.9-67.9c30-30 46.9-70.7 46.9-113.1l0-11c17.7 0 32-14.3 32-32s-14.3-32-32-32L320 0 64 0 32 0zM96 75l0-11 192 0 0 11c0 19-5.6 37.4-16 53L112 128c-10.3-15.6-16-34-16-53zm16 309c3.5-5.3 7.6-10.3 12.1-14.9L192 301.3l67.9 67.9c4.6 4.6 8.6 9.6 12.1 14.9L112 384z"/>
        </svg>
        Mengecek...
      `;
      resultBox.style.color = "#555";

      const hash = await sha1(pwd);
      const prefix = hash.slice(0, 5);
      const suffix = hash.slice(5);

      try {
        const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
        const text = await res.text();

        const lines = text.split("\n");
        const found = lines.find(line => line.startsWith(suffix));

        if (found) {
          const count = found.split(":")[1].trim();
          const countFormatted = Number(count).toLocaleString("en-US");
          resultBox.innerHTML = `❌ Password ini telah bocor <strong>${countFormatted}</strong> kali! Hindari penggunaan.`;
          resultBox.style.color = "#e74c3c";
        } else {
          resultBox.innerHTML = "✅ Password ini belum ditemukan dalam database kebocoran publik.";
          resultBox.style.color = "#2ecc71";
        }
      } catch (err) {
        resultBox.innerHTML = "⚠️ Gagal menghubungi server HIBP.";
        resultBox.style.color = "#e67e22";
      }
    }

    // Inisialisasi event setelah DOM siap
    document.addEventListener("DOMContentLoaded", () => {
      const toggleBtn = document.getElementById("toggleVisibility");
      const copyBtn = document.getElementById("copyBtn");
      const checkBtn = document.getElementById("checkBtn");

      if (toggleBtn) toggleBtn.addEventListener("click", toggleVisibility);
      if (copyBtn) copyBtn.addEventListener("click", copyPassword);
      if (checkBtn) checkBtn.addEventListener("click", checkPwned);
    });
