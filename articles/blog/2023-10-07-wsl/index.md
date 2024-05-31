---
title: WSL (Windows Subsystem for Linux)
authors: lyrihkaesa
tags:
  - guide
  - windows-10
---
## Cara Instalasi 

- Buka **Turn Windows: feature on or off**
![Search Turn Windows: feature on or off](attachments/search-windows-feature.png)

![Turn Windows: feature on or off](attachments/windows-feature.png)

Pada gambar **Windows Feature** di atas Anda aktifkan fitur:
- [-] Virtual Machine Platform
- [-] Windows Subsystem for Linux
- [ ] Hyper-V (Tidak wajib diaktifkan jika menggunakan `WSL2`)

- Selanjutnya membuka `Terminal` > `PowerShell` > `Run as Administator`
- Pada `PowerShell` ketik perintah berikut:
```powershell
wsl --install
```

```powershell
wsl --list --online
```

```powershell
wsl --install -d Ubuntu-22.04 # Untuk install distro Ubuntu 22.04 LTS
```

![Windows PowerShell](attachments/windows%20powershell.png)

- Tunggu instalasinya
- Setelah itu Anda akan dimintai untuk mengisi username (saran huruf kecil semua jangan KAPITAL) dan password yang mudah Anda ketik karena WSL ini biasanya Anda pakai sendiri.

```powershell
 wsl --set-default Ubuntu-22.04
```
