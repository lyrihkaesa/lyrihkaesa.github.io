# Ubuntu
## Perintah Umum
### `pwd` Print Working Directory
Ini adalah perintah untuk mengetahui directory/folder tempat kerja sekarang.
```bash
pwd
```

### `whoami` Siapa Saya
Perintah ini digunakan untuk mengetahui user yang digunakan saat ini.
```bash
whoami
```

----
## Ganti Port SSH
### Mengecek port SSH
```bash
sudo ss -tulpn | grep ssh
```

### Mengecek status SSH
```bash
sudo systemctl status ssh
```

### Mengganti port SSH
```bash
sudo nano /etc/ssh/sshd_config
```

- Hapus `#` lalu ubah tulisan `Port 22` menjadi `Port 2200` 
- Tanpa menghapus default tulisan `#Port 22` dengan cara Enter tambahkan tulisan `Port 2200`
```sshd_config
#...

Include /etc/ssh/sshd_config.d/*.conf

#Port 22
Port 2200 # <- TAMBAHKAN INI
#AddressFamily any
#ListenAddress 0.0.0.0
#ListenAddress ::

#...
```

Setelah selesai `reboot`  VPS ubuntu Anda.

### Masuk SSH dengan `Port 2200`
```bash
ssh kaesa@100.100.100.100 -p 2200
```

| Nama              | Keterangan                     |
| ----------------- | ------------------------------ |
| `ssh`             | Aplikasi SSH Client Terminal   |
| `kaesa`           | Username Anda                  |
| `100.100.100.100` | IP Address VPS Ubuntu Anda     |
| `-p`              | PORT (Argument)                |
| `2200`            | Port SSH yang telah Anda rubah |

## Konfigurasi SSH supaya tidak dapat diakses oleh user `root`
```bash
sudo nano /etc/ssh/sshd_config
```

- Ubah `PremitRootLogin yes` menjadi `PremitRootLogin no` .
```sshd_config
#...

# Example of overriding settings on a per-user basis
#Match User anoncvs
#	X11Forwading no
#	AllowTcpForwarding no
#	PermitTTY no
#	ForceCommand no
PremitRootLogin no # Default `yes`

#...
```
## Tambah User
Jika ada error: `fatal: Only root may add a user or group to the system` silahkan ganti ke user `root` dahulu dengan perintah:
```bash
sudo su
```

```bash
adduser kaesa
```

```
Adding user `kaesa` ...
Adding new group `kaesa` (1001) ...
Adding new user `kaesa` (1001) with group `kaesa` ...
Creating home directory `/home/kaesa` ...
Copying file from `/etc/skel` ...

New password: # Masukan Password 
Retype new password: # Ketik ulang password diatas

passwd: password updated successfully
Changing the user information for kaesa
Enter the new value, or press Enter for the default
	Full Name []: Kaesa Lyrih # Ketik `Kaesa Lyrih` lalu Enter
	Room Number []: # Enter
	Work Phone []: # Enter
	Home Phone []: # Enter
	Other []: # Enter
Is the information corrent? [Y/n] Y # Karena kapital Y berarti default `Y` alias Yes
info: Adding new user `kaesa` to supplemental / extra groups `users` ...
info: Adding user `kaesa` to group `users` ...
```

## Pindah User
```bash
su - kaesa
```

## Memberi akses `sudoers` ke User baru
Pastikan anda menggunakan user `root` lalu ketik perintah berikut:
```bash
usermod -aG sudo kaesa
```

## Mengecek Group User
```bash
group
```

```txt
kaesa users wheel sudo
```
## Keluar User
```bash
exit
```
## Management Firewall `UFW`

### Mengecek Status `UFW`
```bash
sudo ufw status
```

Pengecekan Status Lengkap
```bash
sudo ufw status verbose
```
### Allow `SSH`
```bash
sudo ufw allow 22/tcp
```

Jika sudah diganti port `ssh` dari `22` menjadi `2200` maka perintahnya berikut:
```bash
sudo ufw allow 2200/tcp
```
### Allow `http`
```bash
sudo ufw allow http
```

```bash
sudo ufw allow 80
```
### Allow `https`
```bash
sudo ufw allow https
```

```bash
sudo ufw allow 443
```

### Opsi lain allow `http` dan `https`
```bash
sudo ufw allow 'Apache Full'
```

```bash
sudo ufw allow 'Nginx Full'
```

### Allow Aplikasi Lain Misal Port `8081`
```bash
sudo ufw allow 8081
```

Pada kasus tertentu anda harus allow port tertentu ke ip local misal docker nginx-proxy-manager `172.17.0.1` 
```bash
sudo ufw allow from 172.17.0.0/16 to any port 8081
```

Jika sudah menjalankan perintah diatas, pastikan ip table seperti berikut
```bash
sudo iptables -L -n | grep 80
# ACCEPT     6    --  0.0.0.0/0            172.17.0.2           tcp dpt:80
# ACCEPT     6    --  0.0.0.0/0            0.0.0.0/0            multiport dports 80,443 /* 'dapp_Nginx%20Full' */
# ACCEPT     6    --  172.17.0.0/16        0.0.0.0/0            tcp dpt:8081
# ACCEPT     17   --  172.17.0.0/16        0.0.0.0/0            udp dpt:8081

```

- Test app work di bash punya host, kalau work maka muncul html
```bash
curl -H "Host: demo.charapon.my.id" http://172.17.0.1:8081
```

- Test app work via docker nginx-proxy-manager. nama containernya: `nginxproxymanager` 
```bash
docker exec nginxproxymanager curl -H "Host: demo.charapon.my.id" http://172.17.0.1:8081
```
### Mengecek Daftar APP
```bash
sudo ufw app list
```
### Aktifkan `UFW`
```bash
sudo ufw enable
```
### Menonaktifkan `UFW`
```bash
sudo ufw disable
```
### Mengaktifkan Ulang `UFW`
Jika beberapa pengaturan belum berfungsi jangan lupa melakukan reload.
```bash
sudo ufw reload
```

### Menghapus Rule `UFW`
```bash
sudo ufw status numbered
```

```bash
sudo ufw delete 2
```

```bash
sudo ufw delete allow http
```

```bash
sudo ufw delete allow 'Nginx Full'
```
## Ganti password

```bash
passwd kaesa #enter
# passwod sekarang
# new password
# confirm password
```

---

## Memasang `crul`
```bash
sudo apt install curl
```

## Memasang `PHP`

```bash
sudo add-apt-repository ppa:ondrej/php -y
```

```bash
sudo apt search php8.3 | more
```

```bash
sudo apt install php8.3 php8.3-cli php8.3-common php8.3-curl php8.3-pgsql php8.3-fpm php8.3-gd php8.3-imap php8.3-intl php8.3-mbstring php8.3-mysql php8.3-opcache php8.3-readline php8.3-soap php8.3-xml php8.3-zip php8.3-sqlite3
```

```bash
php -v
```

---

```bash
sudo apt search php8.4 | more
```

```bash
sudo apt install -y \
php8.4 php8.4-cli php8.4-common php8.4-fpm \
php8.4-mbstring php8.4-xml php8.4-curl php8.4-zip \
php8.4-bcmath php8.4-opcache \
php8.4-pgsql php8.4-sqlite3 \
php8.4-gd \
php8.4-mysql
```


---
## Memasang `nvm`

```bash
sudo apt update
```

```bash
cd ~
```

```bash
sudo su
```

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh
```

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

```bash
source ~/.bashrc
```

```bash
nvm list-remote
```

```bash
nvm install --lts
```

---
## Memasang `Composer`
```bash
sudo apt update
```

```bash
cd ~
```

```bash
curl -sS https://getcomposer.org/installer -o /tmp/composer-setup.php
```

```bash
HASH=`curl -sS https://composer.github.io/installer.sig`
```

```bash
php -r "if (hash_file('SHA384', '/tmp/composer-setup.php') === '$HASH') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
```

```bash
sudo php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer
```

## Memasang `nginx`

```bash
sudo apt install nginx
```

```bash
sudo systemctl status nginx
```

```bash
cd /etc/nginx
```

```bash
cd sites-available
```

```bash
sudo nano default
```

- Ubah yang semula `listen 80` menjadi `listen 8080` seperti berikut:
```conf
# ...
server {
	listen 8080 default_server;
	listen [::]:8080 default_server;
	
	# ...
}
```
- Save: `CTRL + X` > `Y`

```bash
sudo nano charapon.conf
```

```conf
server {
    listen 8081;
    listen [::]:8081;
    server_name charapon.my.id;
    root /var/www/pondokmbodo/public;
 
    # add_header X-Frame-Options "SAMEORIGIN";
    # add_header X-Content-Type-Options "nosniff";
 
    index index.html index.php;
 
    charset utf-8;
 
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
 
    # location = /favicon.ico { access_log off; log_not_found off; }
    # location = /robots.txt  { access_log off; log_not_found off; }
 
    error_page 404 /index.php;
 
    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }
 
    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

```bash
cd ..
```

```bash
cd sites-enabled
```

```bash
sudo ln -s /etc/nginx/sites-available/charapon.conf /etc/nginx/sites-enabled/
```

```bash
sudo nginx -t
```

```bash
sudo systemctl reload nginx
```

### Menghentikan Service Nginx
Jalankan perintah berikut untuk mematikan layanan Nginx:
```bash
sudo systemctl stop nginx
```

Perintah ini akan menghentikan layanan Nginx yang sedang berjalan.

### Nonaktifkan Pengaturan Otomatis Menjalankan Nginx pada saat Startup
Untuk mencegah Nginx dari memulai secara otomatis setiap kali sistem reboot, jalankan perintah berikut:

```bash
sudo systemctl disable nginx
```

Dengan melakukan ini, Nginx tidak akan dijalankan secara otomatis saat sistem boot.

### Verifikasi Status Nginx

Untuk memastikan bahwa Nginx telah dimatikan dan dinonaktifkan, Anda dapat memeriksa status layanan:

```bash
sudo systemctl status nginx
```

Pastikan statusnya menunjukkan bahwa layanan telah dimatikan (`inactive`) dan dinonaktifkan (`disabled`).

### Opsional: Hapus Konfigurasi

Jika Anda tidak berencana untuk menggunakan Nginx lagi, Anda dapat menghapus paket Nginx dari sistem Anda. Namun, pastikan untuk mempertimbangkan dampaknya terhadap aplikasi atau layanan lain yang bergantung pada Nginx.

```bash
sudo apt remove nginx
```

Atau, jika Anda ingin menjaga paket Nginx tetapi tidak menjalankannya secara otomatis, Anda dapat menggunakan perintah `apt-mark` untuk menandainya sebagai "manual", sehingga tidak akan dihapus secara otomatis oleh manajer paket:

```bash
sudo apt-mark manual nginx
```

Dengan ini, Nginx akan tetap diinstal tetapi tidak akan dijalankan secara otomatis pada startup.

Dengan langkah-langkah di atas, Anda telah mematikan layanan Nginx dan menonaktifkan pengaturan otomatis pada startup.


## Melihat Semua User Ubuntu

```bash
cat /etc/passwd
```

## Mengganti Password
```bash
sudo passwd pondokmbodo
```

## Laravel Issue
```
sudo chown -R $USER:www-data storage
sudo chown -R $USER:www-data bootstrap/cache
sudo chmod -R 775 storage
sudo chmod -R 775 bootstrap/cache
```

## Fail2Ban

Digunakan untuk ban IP yang melakukan serangan `brute force`.

Pengecekan log `auth`:
```bash
sudo tail -f /var/log/auth.log
```

```bash
sudo cat -f /var/log/auth.log | grep "invalid user"
```

Perbarui repository package ubuntu:
```bash
sudo apt update
```

```bash
sudo apt install fail2ban -y
```

```bash
sudo cd /etc/fail2ban
```

```bash
sudo jail.conf jail.local
```

```bash
sudo nano jail.local
```

```jail.local
# ...
# [DEFAULT]
# bantime = 1h
# 

[sshd]
enabled = true
port = 2233
filter = sshd
logpath = /var/log/auth.log
bantime = 360m
findtime = 360m
maxretry = 3

# 
# See jail.conf(5) man page for more information

# ...

# 
# SSH servers
# 

#[sshd]

# To use more aggresive sshd mode set filter parameter "mode" in jail.local
# normal (default), ddos, extra or aggresive (combines all).
# See "test/file/logs/sshd or "filter.d/sshd.conf" for usage example details.
#mode = normal
#port = ssh
#logpath = %(sshd_log)s
#backend = %(sshd_backend)s

[dropbear]

# ...
```

```bash
sudo systemctl restart fail2ban
```

```bash
sudo systemctl enable fail2ban
```

```bash
sudo systemctl status fail2ban
```

```bash
fail2ban-client status sshd
```

```bash
watch fail2ban-client status sshd
```

```bash
iptables -t filter -nvL
```


## Nginx Config Website Laravel 

Config di bawah ini hanya contoh, Kaesa tolong cari tahu kegunaannya dan buatkan panduannya.
- [**laravel8.conf**](https://gist.github.com/LTroya/c6496075033c8b6e15fdaaf0d9584482#file-laravel8-conf) 
```conf
server {

    listen 80;
    listen [::]:80;

    server_name laravel8.io;
    root /var/www/learning/laravel8/public;
    index index.php index.html index.htm;

    gzip on;
    gzip_comp_level 2;
    gzip_http_version 1.0;
    gzip_proxied any;
    gzip_min_length 1100; gzip_buffers 16 8k;
    gzip_types text/plain text/html text/css application/x-javascript text/xml application/xml application/xml+rss text/javascript;

    # Disable for IE < 6 because there are some known problems
    gzip_disable "MSIE [1-6].(?!.*SV1)";

    # Add a vary header for downstream proxies to avoid sending cached gzipped files to IE6
    gzip_vary on;

    location / {
         try_files $uri $uri/ /index.php$is_args$args;
    }

    location ~ \.php$ {
        try_files $uri /index.php =404;

        proxy_set_header        X-Real-IP $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header        Host $http_host;
        proxy_set_header        X-Forwarded-Proto $scheme;

        fastcgi_pass app:9000;
        fastcgi_index index.php;
        fastcgi_buffers 16 16k;
        fastcgi_buffer_size 32k;
        fastcgi_param SCRIPT_FILENAME $request_filename;
        #fixes timeouts
        fastcgi_read_timeout 600;
        include fastcgi_params;
    }

    # Media: images, icons, video, audio, HTC
    location ~* \.(?:jpg|jpeg|gif|png|ico|cur|gz|svg|svgz|mp4|ogg|ogv|webm|htc)$ {
        expires -1;
        access_log off;
        add_header Cache-Control "public";
    }

    # CSS and Javascript
    location ~* \.(?:css|js)$ {
        expires -1;
        access_log off;
        add_header Cache-Control "public";
    }

    location ~ /\.ht {
        deny all;
    }

    location /.well-known/acme-challenge/ {
        root /var/www/letsencrypt/;
        log_not_found off;
    }

     error_log /var/log/nginx/credefi_error.log;
     access_log /var/log/nginx/credefi_access.log;
}
```