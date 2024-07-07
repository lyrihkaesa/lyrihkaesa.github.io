## Membuat SSH dulu

```bash
cd C:\Users\kaesa/.ssh
```

```bash
ssh-keygen -t rsa -b 2048 -C "gitlab.com/lyrihkaesa"
```

```bash
ssh kaesa@ip-address-server
```

```bash
ssh kaesa@192.168.1.1
```

## Update dulu VPS Ubuntunya

```bash
sudo apt update -Y && sudo apt upgrade -Y
```

```bash
sudo apt update
```

```bash
sudo apt upgrade
```

## Check Firewall dengan `UFW`

ufw: uncomplicated firewall

```bash
sudo apt install ufw
```

```bash
sudo ufw app list
```

```bash
sudo ufw allow OpenSSH
```

```bash
sudo ufw status
```

```bash
sudo ufw enable
```

```bash
// Y for confirm
```

```bash
sudo ufw allow 'Nginx HTTP'
```

## Add new User Ubuntu

```bash
adduser lyrih
// enter password
```

```bash

```

## Install PHP

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
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh
```

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
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

## Install Composer

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
sudo nano charapon.conf
```

```conf
server {
    listen 80;
    listen [::]:80;
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

## Project Laravel

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
sudo chmod -R 775 /var/www/pondokmbodo/storage
```

```bash
sudo chown -R www-data:www-data /var/www/pondokmbodo/storage
```

```bash
php artisan icons:cache
```

## Install PostgreSQL

```bash
sudo apt update
```

```bash
sudo apt install postgresql postgresql-contrib
```

```bash
sudo systemctl start postgresql.service
```

```bash
sudo -i -u postgres
```

```bash
psql
```

```sql
CREATE USER pondokmbodo WITH PASSWORD 'inipasswordpondokmbodo';
```

```sql
CREATE DATABASE pondokmbodo OWNER pondokmbodo;
```

```sql
CREATE USER kaesa;

GRANT ALL PRIVILEGES ON DATABASE pondokmbodo TO kaesa;
```

```sql
exit
```

```sql
CREATE DATABASE pondokmbodonas OWNER pondokmbodo;
```

## Other

```bash
ls -la
```

admin@example.com

changeme

Default user: casaos
Default password: casaos
Default database: casaos
