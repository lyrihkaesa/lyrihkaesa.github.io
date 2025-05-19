# Deploy VPS

Ini adalah catatan singkat mengenai masalah/issue yang ada pada saat deploy ke VPS:

## HTTP & HTTPS

- `app\Providers\AppServiceProvider.php`
```php
\Illuminate\Support\Facades\URL::forceScheme('https');
```
## CORS

## Permission Storage
```bash
sudo chown -R $USER:www-data storage
sudo chown -R $USER:www-data bootstrap/cache
sudo chmod -R 775 storage
sudo chmod -R 775 bootstrap/cache
```

## Container Persistent Storage Symlink ke Dir HOST

## Reverse Proxy


## Deploy

### Create VPS (Virtual Private Server)

Untuk latihan anda bisa menggunakan layanan sewa VPS (Virtual Private Server) yang pembayarannya hanya saat digunakan bukan bulanan atau tahunan melainkan bayar per jam, istilah lainnya itu `pay as you go`. Contoh saja `IDCouldHost` Anda dapat membantu saya dengan menggunakan:
- Referral link: https://console.idcloudhost.com/referral/4k86mh
- Referral code:  
```txt
4k86mh
```

Pada tanggal 25 Januari 2025 Top Up minimal pada `IDCouldHost` adalah Rp55.000 + Rp6.050 `PPN 11%` = Rp61.050 + Rp2.000 `admin dari e-wallet saya` = Rp63.050 `Total`.
Jadi siapkan saja uang sekitar Rp65.000 untuk belajar.

Jika sudah mari kita buat VPS. Spekfikasi VPS bebas yang penting menggunakan OS (Operating System) `Ubuntu`. Karena panduan saya menggunakan OS Ubuntu. Saya sarankan pada server gunakanlah OS seri `Long Term Support (LTS)` karena lebih lama dalam support atau perawatan OS tersebut. Misal saya menggunakan `Ubuntu 24.04 LTS`.

**Tentang VPS IDCouldhost yang saya maksud:**

**Apa yang terjadi jika VPS-nya dimatikan (shutdown)?**  
Jawaban: Anda hanya menyewa storage disk/hdd saja 20GB = Rp12.000

**Apa yang terjadi jika VPS-nya dihapus?**  
Jawaban: Yaa, Anda tidak keluar biaya lagi, jadi bisa disimpan buat latihan nanti.
### Pantangan Saat Deploy Ke Server Linux

- Jangan gunakan `root` user untuk login SSH dengan password, kalau bisa gunakan user biasa dan gunakan SSH key.

### Login ke VPS dengan SSH

Contoh: 
- IP yang didapatkan dari VPS: `100.100.100.100`

Login SSH root user
```bash
ssh root@100.100.100.100
```

Jika muncul pertanyaan:
```bash
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
```

Ketik `yes` lalu `enter`. Nanti anda akan diminta masukan password dari user tersebut misal user `root`.

```bash
root@100.100.100.100's password:
```

Ketik password lalu enter. Catatan: password tidak tampil demi keamanan jadi saat ketik sebenarnya tulisannya masuk hanya saja di sembunyikan.

Jangan lupa update OS:
```bash
sudo apt update
```

```bash
sudo apt upgrade -y
```

Jika tidak menggunakan `-y` anda harus ketik `y` lalu `enter`. Karena perlu konfirmasi.

### Menambahkan User (Opsional)

Menambahkan user baru untuk login ke OS Ubuntu diperlukan demi keamanan karena user `root` itu terlalu OP (Over Power) jadi kita harus membuat user lain. Biasanya saat membuat VPS auto dibuatkan user jadi ini sifatnya opsional jika sudah dibuatkan oleh penyedia layanan VPS.

Perintah di bawah ini dalam mode user `root@ubuntu:~#` 

Membuat user baru:
```bash
adduser kaesa
```

Masukan password, etc.

Memodifikasi user dengan menambahkan user `kaesa` ke dalam grup `sudo`
```bash
usermod -aG sudo kaesa
```

Ganti user `root` ke user `kaesa`. 'switch user'
```bash
su - kaesa
```

### Mengatur SSH

Login dengan user `kaesa`
```bash
ssh kaesa@100.100.100.100
```

### Generate SSH Key

Pertama buka terminal/git bash pada laptop, lalu jalankan perintah dibawah:

```bash
cd ~/.ssh
```

```bash
ssh-keygen -t rsa -b 2048 -C "idcouldhost.com/kaesa-ubuntu"
```

Saya biasanya mengubah nama file key SSH:
```bash
Generating public/private rsa key pair.
Enter file in which to save the key (/c/Users/kaesa/.ssh/id_rsa): id_rsa_kaesa
```

Anda bisa menambahkan passphrase untuk keamanan tambahan.

Nanti akan dibuatkan dua file:
- `id_rsa_kaesa` (Private SSH Key)
- `id_rsa_kaesa.pub` (Public SSH Key)

Melihat isi file dan directory dengan perintah:
```bash
ll
```

Copy `Public SSH Key` ke server
```bash
ssh-copy-id kaesa@100.100.100.100
```

### Mematikan kemampuan login ssh dengan root user 
```bash
sudo nano /etc/ssh/sshd_config
```

Cari:
```sshd_config
PremitRootLogin no # Default: yes

PubkeyAuthentication yes # Default: commented/disabled ada pagar '#' didepan

AuthorizedKeysFile    .ssh/authorized_keys .ssh/authorized_keys2 # Default: commented/disabled

PasswordAuthentication no # Default: commented/disabled dan yes
PermitEmptyPasswords no # Default: commented/disabled
```

```bash
sudo systemctl restart ssh
```


### Membuat alias login ssh

```bash
cd ~/.ssh
```

```bash
sudo nano config
```

```config
Host kaesa
   User kaesa
   Hostname 100.100.100.100
   Port 22
   IdentityFile ~/.ssh/id_rsa_kaesa
```

Cara cepat login ke server:
```bash
ssh kaesa
```

Perintah di atas itu quick login dari `ssh kaesa@100.100.100.100 -p 22 -i ~/.ssh/id_rsa_kaesa`

### Install `php`

```bash
sudo add-apt-repository ppa:ondrej/php -y
```

```bash
sudo apt install php8.3 php8.3-cli -y
```

```bash
sudo apt install php8.3-common php8.3-bcmath php8.3-mbstring php8.3-xml php8.3-curl php8.3-gd php8.3-zip -y
```

```bash
sudo apt install php8.3-fpm php8.3-opcache php8.3-imap php8.3-intl php8.3-readline php8.3-soap -y
```

```bash
sudo apt install php8.3-mysql -y
```

```bash
sudo apt install php8.3-pgsql -y
```

```bash
sudo apt install php8.3-sqlite3
```

```bash
php -v
```