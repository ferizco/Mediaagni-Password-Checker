# 🔐 MediaAgni Password Checker

**MediaAgni Password Checker** adalah alat berbasis web yang dirancang untuk membantu pengguna mengukur kekuatan password mereka serta memastikan apakah password tersebut pernah terlibat dalam kebocoran data publik. Semua proses berjalan langsung di sisi pengguna (client-side), memastikan privasi dan keamanan sepenuhnya terjaga.

Versi saat ini: **v2.3.1**  
Dikembangkan oleh: [Ferizco](https://github.com/ferizco)  
Live Demo: [mediaagni.com/p/password-strength-checker.html](https://www.mediaagni.com/p/password-strength-checker.html)

---

## 🛠️ 1. Tentang Password Checker

Banyak pengguna internet masih menggunakan password yang lemah atau sudah bocor dalam berbagai insiden keamanan. Password checker ini hadir untuk:

- Memberikan **edukasi langsung** tentang kekuatan password.
- Mendorong pembuatan password yang lebih aman.
- Menyediakan **alat gratis dan privat** untuk membantu pengguna melindungi akunnya.
- Mengintegrasikan metode **k-anonymity** dari [Have I Been Pwned](https://haveibeenpwned.com/Passwords) agar dapat melakukan pengecekan kebocoran tanpa mengorbankan privasi.

---

## ✨ 2. Fitur-Fitur Unggulan

🔍 **Analisis Kekuatan Password**  
- Menilai kekuatan berdasarkan panjang, huruf besar & kecil, angka, dan simbol.
- Menampilkan indikator kekuatan dengan warna dan label yang mudah dimengerti.

💡 **Saran untuk Memperkuat Password**  
- Menampilkan tips real-time jika password kamu masih lemah.

🧠 **Pengecekan Password Bocor (HIBP)**  
- Menggunakan SHA-1 + metode k-anonymity.
- Aman: hanya 5 karakter awal hash yang dikirim ke server HIBP.

📋 **Salin Password dengan Mudah**  
- Fitur "Copy to Clipboard" untuk menyalin password yang sudah dicek atau dibuat.

🌗 **Mode Gelap (Dark Mode)**  
- Desain responsif dan nyaman digunakan di berbagai perangkat, termasuk smartphone.

---

## ✅ 3. Public Assurance

Kami sangat memprioritaskan **privasi dan keamanan pengguna**. Oleh karena itu, kami menyatakan:

- ❌ **Tidak ada data password yang dikirim atau disimpan di server kami.**
- ✅ Semua proses dilakukan langsung di **browser kamu** (client-side).
- ✅ Menggunakan metode aman dan diakui secara global: **k-anonymity**.
- ✅ Kode sumber terbuka untuk meningkatkan **transparansi** dan **kepercayaan publik**.
- 🔍 Sudah melalui proses audit internal untuk memastikan tidak ada celah keamanan.

🔗 Baca lebih lanjut tentang k-anonymity:  
[Memahami Metode K-Anonymity - Medium](https://medium.com/@ferizco/memahami-metode-k-anonymity-cara-aman-hibp-melindungi-privasi-kata-sandi-anda-6111de0fe52e)

---

## ⚖️ 4. Lisensi

MediaAgni Password Checker menggunakan lisensi **MIT**.

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)


