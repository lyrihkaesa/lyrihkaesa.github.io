# `IDCloudHost` Deployment

## Install `CasaOS`

```bash
curl -fsSL https://get.casaos.io | sudo bash
```

- Masuk ke `CasaOs`. `http://your-ip-address:80`, misal: `http://100.100.100.100:80`
- Setelah itu, masukkan `username` dan `password`, `confirm-password`.
- Ubah port dari `80` menjadi `9090`. `http://your-ip-address:9090`, misal: `http://100.100.100.100:9090`

## Install `Nginx Proxy Manager`

> ⚠️ Warning!  
> This is a technical app, please make sure you know what you are doing.  
> Nginx Proxy Manager occupies ports 80 and 443 by default for built-in Nginx use. It occupies port 81 for the admin page.  
> Please change the CasaOS WebUI port to a port other than 80/81/443. And pay attention to whether the ports conflict with other apps. Otherwise, it may cause your CasaOS to run abnormally.

Default Administrator User

| Username            | Password   |
| ------------------- | ---------- |
| `admin@example.com` | `changeme` |

### Membuat `Proxy Host`

- Buat subdomain untuk `CasaOS`
	- **Details**
		- Domain Names: `casa.example.com`
		- Scheme: `http`
		- Forward Hostname / IP: `100.100.100.100` (your-ip-address)
		- Port: `9090` (Port `CasaOS` jika tidak diganti maka default-nya `80`)
	- **Custom locations** (Skip)
	- **SSL**
		- SSL Certificate: `Request a new SSL Certificate`
		- Force SSL: `true`
		- HTTP/2 Support: `true`
		- Email Address for Let's Encrypt: `youremail@gmail.com`
		- I Agree to the Let's Encrypt Terms of Service: `true`
	- **Advanced** (Skip)
- Buat subdomain untuk `Nginx Proxy Manager`
	- **Details**
		- Domain Names: `proxy.example.com`
		- Scheme: `http`
		- Forward Hostname / IP: `100.100.100.100` (your-ip-address)
		- Port: `81` (Sesuaikan dengan yang di docker)
	- **Custom locations** (Skip)
	- **SSL**
		- SSL Certificate: `Request a new SSL Certificate`
		- Force SSL: `true`
		- HTTP/2 Support: `true`
		- Email Address for Let's Encrypt: `youremail@gmail.com`
		- I Agree to the Let's Encrypt Terms of Service: `true`
	- **Advanced** (Skip)

## Install `PostgreSQL`

Default user: `casaos`  
Default password: `casaos`  
Default database: `casaos`

Login ke database `PostgreSQL` Client lalu jalankan perintah SQL di bawah:

```sql
CREATE USER pondokmbodo WITH PASSWORD 'contohpassword';

CREATE DATABASE pondokmbodo OWNER pondokmbodo;

CREATE USER kaesa;

GRANT ALL PRIVILEGES ON DATABASE pondokmbodo TO kaesa;
```

## Install `PHP`

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

## Install `nvm`

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

## Install `Composer`

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

## Install `nginx`

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

## Deploy Project `Laravel`

```bash
cd /var/www
```

```bash
sudo mkdir pondokmbodo #or
```

```bash
git clone -b dev https://github.com/lyrihkaesa/laravel-pondok-mbodo.git pondokmbodo
```

```bash
cd pondokmbodo
```

```bash
composer install
```

```bash
npm install
```

```bash
npm run build
```

```bash
cp .env.example .env
```

```bash
sudo nano .env
```

```bash
php artisan key:generate
```

```bash
php artisan storage:link
```

```bash
sudo chmod -R 775 /var/www/pondokmbodo/storage /var/www/pondokmbodo/bootstrap/cache
```

```bash
sudo chown -R www-data:www-data /var/www/pondokmbodo/storage /var/www/pondokmbodo/bootstrap/cache
```

```bash
php artisan optimize:clear && php artisan optimize
```

```bash
php artisan icons:cache
```

```bash
php artisan migrate:fresh --seed
```


## Tambahkan User ke Grup Docker

Jalankan perintah berikut untuk menambahkan user `kaesa` ke grup `docker`:

```bash
sudo usermod -aG docker kaesa
```

- `-aG`: Menambahkan user ke grup tanpa menghapusnya dari grup lain.
- `docker`: Nama grup yang ingin Anda tambahkan.
- `kaesa`: Nama user yang ingin Anda tambahkan ke grup.

Jangan lupa untuk logout dan login kembali. Setelah menambahkan user `kaesa` ke grup `docker`, Anda perlu logout dan login kembali untuk perubahan mengambil efek.

### Mengidentifikasi User dan Grup `kaesa`
```bash
id kaesa
```
Output-nya akan menunjukkan UID dan GID untuk user `kaesa`.

### Mengubah Pemilik File dan Direktori

Gunakan perintah `chown` untuk mengubah pemilik file dan direktori di project Anda menjadi user `kaesa`:
```
sudo chown -R kaesa:kaesa /var/www/pondokmbodo
```

Ini akan mengubah pemilik semua file dan direktori dalam project tersebut menjadi user `kaesa`.

### Memeriksa Perubahan

Setelah menjalankan perintah `chown`, Anda dapat memeriksa apakah perubahan sudah diterapkan dengan benar:

```
ls -l /var/www/pondokmbodo
```

Output-nya akan menunjukkan bahwa semua file dan directory sekarang dimiliki oleh user `kaesa`.

## Bash Container
Pastikan `id` dari user `www-data` sama antara `host` dengan container `php-fpm`.
- host `id kaesa`
	- `uid=1000(kaesa) gid=1000(kaesa) groups=1000(kaesa),4(adm),24(cdrom),27(sudo),30(dip),33(www-data),46(plugdev),110(lxd),999(docker)`
- host `id www-data`
	- `uid=33(www-data) gid=33(www-data) groups=33(www-data),1000(kaesa)`
- container *php_fpm* `id www-data`
	- `uid=1000(www-data) gid=1000(www-data) groups=1000(www-data)`

```
cd .docker
```

```
docker compose exec php-fpm /bin/bash 
```

```
docker compose exec nginx-server /bin/sh
```



## Mematikan Layanan Nginx

Untuk mematikan layanan Nginx dan menonaktifkan pengaturan otomatis pada startup, Anda dapat menggunakan beberapa perintah di terminal. Berikut adalah langkah-langkahnya:
### 1. Matikan Layanan Nginx

Jalankan perintah berikut untuk mematikan layanan Nginx:
```bash
sudo systemctl stop nginx
```

Perintah ini akan menghentikan layanan Nginx yang sedang berjalan.

### 2. Nonaktifkan Pengaturan Otomatis pada Startup

Untuk mencegah Nginx dari memulai secara otomatis setiap kali sistem reboot, jalankan perintah berikut:

```bash
sudo systemctl disable nginx
```

Dengan melakukan ini, Nginx tidak akan dijalankan secara otomatis saat sistem boot.

### 3. Verifikasi Status Nginx

Untuk memastikan bahwa Nginx telah dimatikan dan dinonaktifkan, Anda dapat memeriksa status layanan:

```bash
sudo systemctl status nginx
```

Pastikan statusnya menunjukkan bahwa layanan telah dimatikan (`inactive`) dan dinonaktifkan (`disabled`).

### 4. Opsional: Hapus Konfigurasi

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