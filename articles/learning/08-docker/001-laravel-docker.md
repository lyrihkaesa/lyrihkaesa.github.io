# Laravel Docker

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

## Image `php:8.3-fpm`

```txt
root@19832473a525:/var/www/html# php -m
[PHP Modules]
Core
ctype
curl
date
dom
fileinfo
filter
hash
iconv
json
libxml
mbstring
mysqlnd
openssl
pcre
PDO
pdo_sqlite
Phar
posix
random
readline
Reflection
session
SimpleXML
sodium
SPL
sqlite3
standard
tokenizer
xml
xmlreader
xmlwriter
zlib

[Zend Modules]
```


## [GAGAL] Percobaan `Dockerfile` 01 

```Dockerfile
# Menggunakan image resmi PHP-FPM
FROM php:8.3-fpm

# Menetapkan direktori kerja dalam container
WORKDIR /var/www/html

# Menginstal dependensi yang diperlukan
# mix
RUN apt-get update \
    && apt-get install -y build-essential zlib1g-dev default-mysql-client curl gnupg procps vim git unzip libzip-dev libpq-dev \
    && docker-php-ext-install zip pdo_mysql pdo_pgsql pgsql

# intl
RUN apt-get install -y libicu-dev \
    && docker-php-ext-configure intl \
    && docker-php-ext-install intl

# gd
RUN apt-get install -y libfreetype6-dev libjpeg62-turbo-dev libpng-dev && \
    docker-php-ext-configure gd --with-freetype=/usr/include/ --with-jpeg=/usr/include/ && \
    docker-php-ext-install gd

# Menginstal Composer secara manual
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Menginstal Node.js dan npm
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Menyalin file aplikasi Laravel ke dalam container
COPY . .

# Menjalankan Composer untuk menginstal dependensi Laravel
RUN composer install --no-dev --optimize-autoloader

# Menjalankan npm untuk menginstal dependensi frontend
RUN npm install && npm run build

# Menetapkan izin untuk direktori Laravel
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Mengekspos port yang digunakan oleh PHP-FPM
EXPOSE 9000

# Menjalankan PHP-FPM
CMD ["php-fpm"]

```



## Menjalankan Docker Compose

```bash
docker compose -p pondokmbodo up -d
```


## Menghentikan Docker Compose

```bash
docker compose down
```


