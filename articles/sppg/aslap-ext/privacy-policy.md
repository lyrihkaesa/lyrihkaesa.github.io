# Kebijakan Privasi — Aslap Asisten SIPGN

**Terakhir Diperbarui:** 27 Agustus 2026

---

## 1. Gambaran Umum

**Aslap Asisten SIPGN** ("Ekstensi") adalah ekstensi peramban (*browser extension*) yang dirancang khusus untuk mempermudah, memvalidasi waktu operasional, serta mempercepat proses pengisian formulir kerja pada portal resmi Point of Production (POP) SIPGN Badan Gizi Nasional Republik Indonesia (`pop-sipgn.bgn.go.id`).

Privasi dan keamanan data Anda adalah komitmen utama kami. Dokumen Kebijakan Privasi ini menjelaskan jenis informasi yang diproses, cara penyimpanan data, izin peramban yang digunakan, serta jaminan perlindungan data pengguna sesuai dengan standar resmi **Google Chrome Web Store Developer Program Policies**.

---

## 2. Informasi yang Diproses & Dikumpulkan

Aslap Asisten SIPGN beroperasi dengan prinsip minimasi data (*data minimization*) dan privasi sejak perancangan (*privacy by design*):

### A. Data Template Operasional (Tersimpan Lokal)
Semua template formulir yang Anda buat (seperti daftar nama driver/kurir, plat nomor kendaraan, template menu tugas memasak, konfigurasi porsi KPM/sekolah, dan catatan default fase distribusi) disimpan **100% secara lokal pada peramban Anda** menggunakan API `chrome.storage.local`.
* Data template **tidak pernah disinkronkan ke server publik atau pihak ketiga**.
* Fitur Ekspor & Impor Cadangan (Backup JSON) bekerja langsung dari file lokal komputer Anda.

### B. Otentikasi & Verifikasi Dapur (DapurSPPG API)
Ekstensi ini disediakan secara gratis bagi pengguna berlisensi aktif di portal **dapursppg.web.id**.
* **Data yang Dikirim Saat Login**: Alamat email dan kata sandi dikirimkan secara aman melalui protokol terenkripsi HTTPS ke endpoint resmi `https://dapursppg.web.id/api/v1/login`.
* **Data yang Disimpan di Peramban**: Token otentikasi (*Bearer Token*), profil ringkas (nama & email), dan informasi status aktif unit dapur disimpan di penyimpanan lokal peramban (`chrome.storage.local`) untuk memverifikasi masa aktif lisensi dapur. Kata sandi Anda **tidak pernah disimpan permanen** di peramban.
* **Pengecekan Status Berkala**: Ekstensi melakukan panggilan HTTPS ke `https://dapursppg.web.id/api/v1/me` secara berkala untuk memastikan unit dapur Anda masih berstatus aktif.

### C. Data yang TIDAK PERNAH Kami Kumpulkan
* **Tidak Ada Pelacakan Riwayat Penjelajahan**: Ekstensi tidak memantau, mencatat, atau membaca aktivitas penjelajahan Anda di luar domain portal SIPGN.
* **Bebas Pelacak & Analitik Pihak Ketiga**: Tidak ada skrip Google Analytics, Facebook Pixel, pustaka telemetri, maupun pengenal iklan pihak ketiga di dalam ekstensi ini.
* **Tidak Ada Penjualan Data**: Kami **tidak pernah menjual, menyewakan, atau memperdagangkan** data pengguna kepada pihak mana pun.

---

## 3. Izin Peramban (*Permissions*) & Justifikasi Penggunaan

Ekstensi hanya meminta izin minimum (*least privilege*) yang benar-benar esensial untuk menjalankan fitur utamanya:

| Izin (*Permission*) | Tipe | Tujuan & Justifikasi Penggunaan |
| :--- | :--- | :--- |
| `storage` | Izin API | Menyimpan template operasional (driver, menu masak, KPM, catatan) dan status otentikasi dapur secara lokal di komputer pengguna. |
| `activeTab` | Izin API | Mengizinkan ekstensi berinteraksi secara aman dengan tab portal SIPGN yang sedang dibuka pengguna saat popup ekstensi dibuka. |
| `scripting` | Izin API | Menginjeksi antarmuka pembantu (tombol autofill satu-klik, guardrail validasi waktu operasional, dan checklist tugas) ke halaman kerja SIPGN. |
| `*://pop-sipgn.bgn.go.id/*`, `*://*.bgn.go.id/*` | *Host Permissions* | Membatasi eksekusi skrip pembantu **hanya** pada domain resmi portal POP SIPGN BGN. Ekstensi tidak dapat berjalan di situs web lain. |
| `https://dapursppg.web.id/*`, `https://*.dapursppg.web.id/*` | *Host Permissions* | Memungkinkan komunikasi HTTPS yang aman ke server API DapurSPPG untuk proses login dan validasi masa aktif dapur. |

---

## 4. Keamanan Data & Layanan Pihak Ketiga

* Seluruh komunikasi jaringan ke API DapurSPPG dienkripsi secara ketat menggunakan protokol standar industri **HTTPS (Transport Layer Security / TLS)**.
* Ekstensi tidak terhubung ke API pihak ketiga di luar server resmi `dapursppg.web.id` dan portal resmi `pop-sipgn.bgn.go.id`.

---

## 5. Kendali Pengguna & Penghapusan Data

Anda memiliki kendali mutlak atas seluruh data Anda:
* **Keluar / Logout**: Anda dapat keluar dari akun kapan saja melalui tab *Settings* atau menu popup, yang akan langsung mencabut dan menghapus sesi token otentikasi lokal.
* **Reset Pengaturan**: Anda dapat mereset seluruh template data ke kondisi awal bawaan pabrik melalui tab *Settings*.
* **Penghapusan Total**: Menghapus (*uninstall*) Ekstensi dari peramban Google Chrome (`chrome://extensions`) akan **secara permanen dan otomatis menghapus seluruh data lokal** dari perangkat Anda.

---

## 6. Kepatuhan Kebijakan Google Chrome Web Store

Aslap Asisten SIPGN sepenuhnya mematuhi pedoman:
1. **Google Chrome Web Store Single Purpose Policy**: Ekstensi berfokus pada satu tujuan spesifik, yaitu mempermudah operasional input data dan validasi waktu di portal SIPGN.
2. **User Data Privacy Policy**: Mematuhi kewajiban pembatasan penggunaan data (*Limited Use requirements*), sertifikasi non-penjualan data, dan keterbukaan informasi.

---

## 7. Pembaruan Kebijakan Privasi

Kebijakan Privasi ini dapat diperbarui sewaktu-waktu jika terdapat pembaruan fitur atau perubahan regulasi peramban. Versi terbaru akan selalu dipublikasikan dengan tanggal pembaruan yang diperbarui pada bagian atas dokumen.

---

## 8. Kontak & Dukungan

Apabila Anda memiliki pertanyaan, saran, atau kendala terkait Kebijakan Privasi ini, silakan hubungi tim pengembang melalui:
* **Website Resmi**: [https://dapursppg.web.id](https://dapursppg.web.id)
* **Dokumentasi & Dukungan**: [https://lyrihkaesa.github.io](https://lyrihkaesa.github.io)
* **Repositori Proyek**: [https://github.com/lyrihkaesa/aslap-extension-chrome](https://github.com/lyrihkaesa/aslap-extension-chrome)
