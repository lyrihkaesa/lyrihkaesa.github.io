# SSH

**SSH** (Secure Shell) adalah sebuah protokol jaringan yang digunakan untuk mengakses dan mengelola perangkat atau server dari jarak jauh secara aman. SSH dirancang untuk menggantikan protokol yang kurang aman seperti Telnet dengan menyediakan enkripsi kuat untuk menjaga kerahasiaan dan integritas data yang ditransfer.

Berikut adalah penjelasan dasar tentang SSH untuk pemula:

## Fungsi SSH

- **Mengakses server jarak jauh:** SSH memungkinkan pengguna untuk mengontrol server atau komputer lain yang berada di tempat jauh, seolah-olah mereka bekerja langsung di perangkat tersebut.
- **Mengelola file:** Dengan SSH, Anda dapat mentransfer file antara komputer lokal dan server menggunakan alat seperti SCP atau SFTP.
- **Menjalankan perintah:** Anda bisa menjalankan perintah di server melalui terminal (command line).
- **Keamanan jaringan:** SSH mengenkripsi data, sehingga informasi sensitif seperti kata sandi atau data lainnya tidak bisa dibaca oleh pihak ketiga yang mungkin menyadap koneksi.

---

## Cara Kerja SSH

SSH menggunakan sistem **client-server**, di mana:

- **Client:** Komputer Anda (atau perangkat lain) yang menginisiasi koneksi SSH.
- **Server:** Perangkat atau server jarak jauh yang menerima koneksi SSH.

Koneksi SSH biasanya menggunakan **port 22** secara default. Saat Anda melakukan koneksi, identitas client dan server diverifikasi untuk memastikan keduanya dapat dipercaya.

---

## Komponen Utama

- **IP Address atau Hostname:** Alamat server yang akan diakses.
- **Port:** Biasanya 22, kecuali server dikonfigurasi berbeda.
- **Username:** Nama pengguna yang terdaftar di server.
- **Password atau SSH Key:** Untuk otentikasi, bisa menggunakan kata sandi atau pasangan kunci SSH (lebih aman).

---

## Cara Menggunakan SSH

Di komputer Anda, pastikan ada software untuk mengakses SSH, seperti:

- **Linux/Mac:** Terminal bawaan bisa langsung digunakan.
- **Windows:** Gunakan aplikasi seperti _PuTTY_ atau terminal bawaan (_Windows PowerShell_ atau _Windows Terminal_).

Contoh perintah SSH di terminal:

```bash
ssh username@ip-address
```

Misalnya:

```bash
ssh admin@192.168.1.10
```

Setelah Anda menekan Enter, biasanya akan diminta kata sandi, atau jika menggunakan SSH key, sistem akan langsung terhubung.

## Generate Key SSH

Perintah berikut adalah untuk membuat **SSH key pair** (kunci SSH publik dan privat) yang sering digunakan untuk autentikasi aman, misalnya dalam koneksi ke layanan seperti GitHub. Mari kita bahas bagian-bagiannya:

### Perintah Utama

```bash
ssh-keygen -t rsa -b 2048 -C "github.com/lyrihkaesa"
```

1. **`ssh-keygen`**  
    Alat bawaan untuk membuat kunci SSH. Ini digunakan untuk menghasilkan sepasang kunci (public key dan private key).
    
2. **`-t rsa`**  
    Menentukan jenis algoritma enkripsi untuk kunci SSH.
    
    - `rsa` adalah salah satu algoritma kriptografi populer yang sering digunakan.
    - RSA (Rivest-Shamir-Adleman) digunakan untuk menghasilkan pasangan kunci yang aman.
3. **`-b 2048`**  
    Menentukan panjang kunci (key length) dalam bit.
    
    - **2048-bit** adalah panjang kunci yang direkomendasikan untuk keamanan standar.
    - Semakin panjang kunci, semakin sulit diretas, tetapi memerlukan lebih banyak waktu untuk menghasilkan dan memprosesnya.
4. **`-C "github.com/lyrihkaesa"`**  
    Menambahkan komentar ke kunci publik.
    
    - Biasanya digunakan untuk memberi label atau identifikasi pada kunci.
    - Dalam kasus ini, komentar "github.com/lyrihkaesa" menunjukkan bahwa kunci ini digunakan untuk GitHub dan diidentifikasi dengan akun tersebut.

---

### **Hasil Perintah**

Setelah menjalankan perintah ini:

1. Anda akan diminta lokasi penyimpanan kunci:
    - **Default**: `~/.ssh/id_rsa` (untuk private key) dan `~/.ssh/id_rsa.pub` (untuk public key). Anda bisa menekan **Enter** untuk menggunakan lokasi default.
2. Dua file akan dibuat:
    - **Private key (`id_rsa`)**: Kunci rahasia yang harus dijaga aman, jangan pernah membagikannya.
    - **Public key (`id_rsa.pub`)**: Kunci publik yang dapat Anda bagikan, misalnya diunggah ke GitHub.

Ingin mengubah nama `id_rsa` menjadi `id_rsa_github`
Jalankan perintah berikut:
```bash
ssh-keygen -t rsa -b 2048 -C "github.com/lyrihkaesa"
```

Ketika muncul prompt:
```bash
Generating public/private rsa key pair.
Enter file in which to save the key (/c/Users/kaesa/.ssh/id_rsa):
```

Ketik nama file dengan path yang Anda inginkan, misalnya:
```bash
/c/Users/kaesa/.ssh/id_rsa_github_example
```

Ketika muncul prompt:
```bash
Enter passphrase (empty for no passphrase):
```

Lanjutkan proses dengan menekan **Enter** untuk frasa sandi (_passphrase_), atau masukkan jika Anda ingin menambah perlindungan ekstra pada kunci. Misal Anda ketik passphrase `example`, akan muncul prompt:
```bash
Enter same passphrase again:
```
Anda harus mengetik lagi passphrase sebelumnya yaitu `example`

Setelah itu nanti akan otomatis generate file `id_rsa_github_example` (Private Key, yang harus di simpan pada komputer anda) dan `id_rsa_github_example.pub` (Public Key, yang disimpan pada ).

Contoh:
```bash
$ ssh-keygen -t rsa -b 2048 -C "github.com/lyrihkaesa"
Generating public/private rsa key pair.
Enter file in which to save the key (/c/Users/kaesa/.ssh/id_rsa): /c/Users/kaesa/.ssh/id_rsa_github_example
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /c/Users/kaesa/.ssh/id_rsa_github_example
Your public key has been saved in /c/Users/kaesa/.ssh/id_rsa_github_example.pub
The key fingerprint is:
SHA256:pgfl4k6qmjvUx/Zznd4n5WT4fozaWvS7ph8vVWlRdMs github.com/lyrihkaesa
The key's randomart image is:
+---[RSA 2048]----+
|               .=|
|              ..o|
|        .      Eo|
|       o       o.|
|  . . o S     + .|
| . . = =     o =.|
|.   o = . . . B=.|
|..   + + . o.+o=*|
|++... . o ..o=O*+|
+----[SHA256]-----+
```

**Hasil**
Setelah selesai, dua file akan dibuat:
- **Private key:** `~/.ssh/id_rsa_github`
- **Public key:** `~/.ssh/id_rsa_github.pub`

### Menggunakan SSH Key Baru dengan GitHub

1. **Tambahkan Public Key ke GitHub**:
    
    - Salin isi file `~/.ssh/id_rsa_github_example.pub`:  
```bash
cat ~/.ssh/id_rsa_github.pub
```
	- Masuk ke GitHub, buka _Settings > SSH and GPG keys > New SSH Key_, lalu tempelkan kunci publik Anda.
2. **Konfigurasi SSH Client**: Jika Anda menggunakan lebih dari satu SSH key, pastikan GitHub menggunakan kunci ini. Tambahkan konfigurasi di file `~/.ssh/config` (buat file ini jika belum ada):
```txt
# Github
Host github.com
        User git
        Hostname github.com
        PreferredAuthentications publickey
        IdentityFile /home/user/.ssh/id_rsa
```
    
3. **Uji Koneksi**: Jalankan perintah berikut untuk memastikan koneksi menggunakan kunci baru:  
```bash
ssh -T git@github.com
```
    Jika berhasil, Anda akan mendapatkan pesan seperti:
    
```text
Hi lyrihkaesa! You've successfully authenticated, but GitHub does not provide shell access.
```



---

### Langkah-langkah Menaruh Kunci SSH di VPS Ubuntu
Jika Anda ingin menggunakan kunci SSH untuk mengakses **VPS Ubuntu**, kunci SSH publik harus ditempatkan di direktori **`~/.ssh/authorized_keys`** pada server VPS Anda. Berikut adalah langkah-langkahnya:

1. **Salin Kunci Publik ke VPS**
    
    - Gunakan perintah berikut di komputer lokal untuk menyalin kunci publik ke VPS:
        
```bash
ssh-copy-id -i ~/.ssh/id_rsa_github.pub username@ip-address-vps
```
        
        Keterangan:
        
        - `~/.ssh/id_rsa_github.pub`: Lokasi kunci publik di komputer lokal.
        - `username`: Nama pengguna di VPS (contoh: `root` atau `ubuntu`).
        - `ip-address-vps`: Alamat IP dari VPS Anda.
        
        Perintah ini akan secara otomatis menyalin kunci publik ke file **`~/.ssh/authorized_keys`** di VPS, serta mengatur izin file dengan benar.
        
2. **Jika `ssh-copy-id` Tidak Tersedia** Anda juga bisa melakukannya secara manual:
    
    - Salin isi kunci publik di komputer lokal:
        
```bash
cat ~/.ssh/id_rsa_github.pub
```
        
    - Login ke VPS menggunakan kata sandi:
        
        ```bash
        ssh username@ip-address-vps
        ```
        
    - Buat direktori `.ssh` di VPS jika belum ada:
        
        ```bash
        mkdir -p ~/.ssh
        chmod 700 ~/.ssh
        ```
        
    - Tambahkan kunci publik ke file **`authorized_keys`**:
        
        ```bash
        echo "PASTE_KUNCI_PUBLIK_DI_SINI" >> ~/.ssh/authorized_keys
        chmod 600 ~/.ssh/authorized_keys
        ```
        
        Ganti **`PASTE_KUNCI_PUBLIK_DI_SINI`** dengan isi kunci publik Anda.
3. **Pastikan Izin File Benar** Pastikan direktori dan file memiliki izin yang sesuai:
    
```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```
    
4. **Tes Koneksi dengan SSH** Kembali ke komputer lokal, uji koneksi menggunakan private key yang sesuai:
    
```bash
ssh -i ~/.ssh/id_rsa_github username@ip-address-vps
```
    
    Jika berhasil, Anda akan terhubung ke VPS tanpa perlu memasukkan kata sandi.
    

---

### Catatan Penting

- **Nama file kunci:** Jika Anda menggunakan nama kunci khusus seperti `id_rsa_github`, pastikan Anda menyertakan opsi `-i` saat menggunakan SSH.
- **Keamanan:** Selalu jaga agar private key aman, jangan pernah membagikannya ke siapa pun.
- **Firewall:** Pastikan port **22** (atau port SSH lain jika dikustomisasi) terbuka di firewall VPS Anda.

Dengan cara ini, Anda dapat menggunakan kunci SSH untuk login ke VPS dengan aman tanpa perlu kata sandi. 🎉

### Contoh Login ke VPS dengan file `id_rsa_example`
```bash
ssh kaesa@90.90.90.90 -p 2233 -i ~/.ssh/id_rsa_example
```

- `ssh`: aplikasi client SSH
- `kaesa`: username pada VPS Ubuntu
- `90.90.90.90`: IP Address server VPS Ubuntu (Bisa juga domainnya, misal: https://kaesa.example.com)
- `-p 2233`: `-p` maksudnya itu port dan `2233` adalah custom port, default-nya adalah `22`.
- `-i ~/.ssh/id_rsa_example`: `-i` ingin menggunakan id file private key mana `~/.ssh/id_rsa_example` path serta file dari private key.

## Contoh Login ke VPS dengan shortcut pada `config`

Login dengan perintah berikut:
```bash
ssh ubuntu-vps
```

Ada harus `config` ssh Anda terlebih dahulu pada `~/.ssh/config` file.
```bash
nano ~/.ssh/config
```

Note: `~` adalah home directory user tersebut.

```config
Host ubuntu-vps
   User kaesa
   Hostname 90.90.90.90
   Port 2233
   IdentityFile ~/.ssh/id_rsa_example
```

Nah sekarang anda bisa login dengan shortcut `ssh ubuntu-vps`
## SSH Reverse Proxy
- [ngrok](https://dashboard.ngrok.com/)
- expose (Laravel Herd)


## SSH Agent for Windows

### Fungsi `ssh-agent` pada Windows

`ssh-agent` adalah layanan yang berjalan di latar belakang untuk **menyimpan dan mengelola private key SSH** sehingga Anda tidak perlu memasukkan passphrase setiap kali menggunakan key tersebut.

**Keuntungan menggunakan `ssh-agent` di Windows:**

- Menghindari keharusan mengetik passphrase setiap kali menggunakan SSH key.
- Bisa menyimpan lebih dari satu private key (misalnya, untuk GitHub dan server lain).
- Bekerja dengan **Windows OpenSSH** dan **Git for Windows**.

Gunakan PowerShell pada windows
```powershell
Get-Service ssh-agent
```

```powershell
Status   Name               DisplayName
------   ----               -----------
Stopped  ssh-agent          OpenSSH Authentication Agent
```

default/awalnya stopped

```powershell
Get-Service ssh-agent | Set-Service -StartupType Manual
```

```powershell
Get-Service ssh-agent | Set-Service -StartupType Automatic
```

```powershell
Start-Service ssh-agent
```

```powershell
ssh-add
```

```powershell
ssh-add -l
```

```powershell
ssh-add -L
```

```powershell
ssh-add C:\Users\kaesa\.ssh\id_rsa_github
```

