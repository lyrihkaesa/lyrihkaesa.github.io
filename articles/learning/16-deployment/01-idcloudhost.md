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
sudo chmod -R 775 /var/www/pondokmbodo/storage
```

```bash
sudo chown -R www-data:www-data /var/www/pondokmbodo/storage
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