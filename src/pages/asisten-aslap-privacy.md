---
title: Kebijakan Privasi - Asisten Aslap
description: Kebijakan Privasi untuk Ekstensi Google Chrome Asisten Aslap (SIPGN Auto Fill Driver)
---

# Kebijakan Privasi / Privacy Policy

_Terakhir diperbarui: 18 Agustus 2026_  
_Last updated: August 18, 2026_

---

## Bahasa Indonesia

Kebijakan Privasi ini menjelaskan bagaimana ekstensi Google Chrome **Asisten Aslap** ("kami", "ekstensi") mengelola, menyimpan, dan melindungi informasi pengguna saat menggunakan ekstensi ini.

Kami berkomitmen penuh untuk menjaga privasi Anda. Ekstensi ini dirancang dengan prinsip _privacy-first_ dan **tidak mengumpulkan, mengirim, atau menjual data pribadi Anda ke server eksternal mana pun**.

---

### 1. Informasi yang Digunakan dan Disimpan

Ekstensi **Asisten Aslap** dirancang untuk membantu efisiensi dan produktivitas pengguna dalam melakukan pengisian data otomatis (_auto-fill_) informasi kurir/driver dan nomor plat kendaraan pada portal SIPGN (`https://pop-sipgn.bgn.go.id/*`).

Data yang dikelola oleh ekstensi meliputi:

- **Preset Data Driver**: Nama driver/kurir dan nomor plat kendaraan yang diinput secara manual oleh pengguna melalui menu pengaturan (popup).
- **Penyimpanan Lokal**: Semua data preset di atas disimpan sepenuhnya secara lokal di browser Anda menggunakan API `chrome.storage.local`.

---

### 2. Penggunaan Izin (_Permissions_)

Ekstensi hanya meminta izin minimum yang mutlak diperlukan agar fungsinya dapat berjalan:

1. **`storage`**  
   Digunakan untuk menyimpan konfigurasi preset driver (nama kurir dan plat nomor) di penyimpanan lokal browser pengguna sehingga data tetap tersimpan saat browser ditutup.
2. **Izin Host / Content Script (`https://pop-sipgn.bgn.go.id/*`)**  
   Digunakan untuk menyuntikkan script (_content script_) khusus pada domain portal SIPGN agar ekstensi dapat mengenali kolom form input kurir & plat kendaraan dan menyediakan tombol pembantu pengisian otomatis. Ekstensi **tidak** berjalan pada situs web lain di luar domain tersebut.

---

### 3. Pengumpulan dan Pembagian Data

- **Tidak Ada Pengumpulan Data ke Server Luar**: Kami tidak memiliki server analitik, pelacak (_tracking_), atau database eksternal.
- **Tidak Ada Kode Jarak Jauh (_No Remote Code_)**: Seluruh kode JavaScript dan aset ekstensi dijalankan secara lokal dari dalam paket ekstensi tanpa memuat script eksternal.
- **Tidak Ada Penjualan Data**: Kami tidak pernah menjual, menyewakan, membagikan, atau mentransfer data pengguna kepada pihak ketiga mana pun.
- **Tidak Ada Iklan**: Ekstensi ini bebas dari pelacak iklan dan jaringan periklanan pihak ketiga.

---

### 4. Keamanan Data

Karena semua data tersimpan secara lokal di browser perangkat Anda, keamanan data mengikuti standar keamanan browser Google Chrome dan perangkat yang Anda gunakan. Anda dapat menghapus data preset kapan saja melalui menu popup ekstensi atau dengan mencopot (_uninstall_) ekstensi dari browser.

---

### 5. Kepatuhan Kebijakan Pengembang Chrome Web Store

Ekstensi ini mematuhi sepenuhnya [Kebijakan Program Pengembang Chrome Web Store](https://developer.chrome.com/docs/webstore/program-policies/), termasuk persyaratan Penggunaan Terbatas (_Limited Use Policy_).

---

### 6. Perubahan Kebijakan Privasi

Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu jika terdapat pembaruan fitur. Perubahan akan dicantumkan pada halaman ini dengan tanggal pembaruan terbaru.

---

### 7. Kontak Kami

Jika Anda memiliki pertanyaan mengenai Kebijakan Privasi ini atau penggunaan ekstensi **Asisten Aslap**, Anda dapat menghubungi kami melalui:

- **Pengembang**: Kaesa Lyrih
- **Situs Web**: [https://kaesa.charapon.my.id](https://kaesa.charapon.my.id)

---

---

## English Version

This Privacy Policy describes how the **Asisten Aslap** Google Chrome Extension ("we", "our", or "the extension") handles, stores, and protects user data.

We are committed to respecting and protecting your privacy. This extension is built with a _privacy-first_ architecture and **does not collect, transmit, or monetize any personal data or browsing history to external servers**.

---

### 1. Information We Handle

The **Asisten Aslap** extension is designed to improve workflow efficiency by assisting users with autofilling courier/driver names and vehicle license plate numbers on the SIPGN portal (`https://pop-sipgn.bgn.go.id/*`).

The data handled by the extension includes:

- **Driver Presets**: Driver names and vehicle license plate numbers manually entered by the user in the extension popup settings.
- **Local Storage**: All preset data is stored strictly locally within your browser using the `chrome.storage.local` API.

---

### 2. Permissions Justification

The extension requests only the minimum permissions required for its core functionality:

1. **`storage`**  
   Required to save and retrieve user-defined driver and plate number presets locally within the user's browser across sessions.
2. **Host Permissions / Content Scripts (`https://pop-sipgn.bgn.go.id/*`)**  
   Required to inject helper scripts (_content scripts_) exclusively on the SIPGN portal to detect courier and vehicle input fields and render autofill helper controls. The extension does **not** run on or access any other websites.

---

### 3. Data Collection and Third-Party Sharing

- **No Remote Server Collection**: We do not operate any tracking servers, remote analytics, or external databases.
- **No Remote Code Execution**: All JavaScript and assets are packaged and executed locally within the extension package.
- **No Data Sale or Transfer**: We do not sell, rent, monetize, or transfer your data to third parties.
- **No Advertisements**: The extension is completely free of ads, tracking pixels, and marketing beacons.

---

### 4. Data Retention and Security

Because all configuration data remains on your local machine, your data security is maintained by Google Chrome's sandbox and your local device security. You can clear all saved presets at any time directly through the extension interface or by uninstalling the extension.

---

### 5. Compliance with Chrome Web Store Policies

This extension strictly adheres to the [Chrome Web Store Developer Program Policies](https://developer.chrome.com/docs/webstore/program-policies/), including the User Data Privacy policy and Limited Use requirements.

---

### 6. Contact Information

If you have any questions, feedback, or concerns regarding this Privacy Policy, please contact:

- **Developer**: Kaesa Lyrih
- **Website**: [https://kaesa.charapon.my.id](https://kaesa.charapon.my.id)
