# Installation Docker Desktop

1. Klik dua kali **Docker Desktop Installer.exe** untuk menjalankan penginstal.
2. Saat diminta, pastikan opsi **Gunakan WSL 2 alih-alih Hyper-V (Use WSL 2 instead of Hyper-V)** pada halaman Konfigurasi dipilih ✔ atau tidak tergantung pada pilihan backend Anda. Jika sistem Anda hanya mendukung salah satu dari dua opsi tersebut, Anda tidak akan dapat memilih backend mana yang akan digunakan.


## Update Docker Desktop Error

Tidak bisa jalan, loading terus maka cobalah **hapus**:
```
%AppData%\Docker\settings.json
```

Tekan `CTRL` + `R`, ketik `%AppData%` lalu ke Folder `Docker` hapus file `settings.json`.
