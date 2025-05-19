# `IDCloudHost` Deployment

## Install `CasaOS`

## Install `Nginx Proxy Manager`

## Install `PostgreSQL`

## Install `PHP`

## Install `nvm`

## Install `composer`

## Install `nginx`

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
- container _php_fpm_ `id www-data`
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
