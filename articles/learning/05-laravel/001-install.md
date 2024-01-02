# Install Laravel

Sebelum membuat proyek Laravel pertama Anda, Anda harus memastikan bahwa mesin lokal (PC/Laptop) Anda telah memasang PHP dan [Composer](https://getcomposer.org/). Jika Anda mengembangkan di macOS, PHP dan Composer dapat dipasang dalam hitungan menit melalui [Laravel Herd](https://herd.laravel.com/). Selain itu, kami menyarankan untuk [memasang Node dan NPM](https://nodejs.org/).

Setelah Anda memasang PHP dan Composer, Anda dapat membuat proyek Laravel baru melalui perintah Composer `create-project`:

```bash
composer create-project laravel/laravel app-name
```

Contoh membuat proyek `laravel-pondok-mbodo`:

```bash
composer create-project laravel/laravel laravel-pondok-mbodo
```

Atau, Anda dapat membuat proyek Laravel baru dengan memasang installer Laravel secara global melalui Composer. Atau, jika Anda memasang PHP dan Composer melalui [Laravel Herd](https://herd.laravel.com/), installer Laravel sudah tersedia untuk Anda:

```bash
composer global require laravel/installer
```

```bash
laravel new example-app
```

Setelah proyek dibuat, mulai server pengembangan lokal Laravel menggunakan perintah `serve` Artisan CLI Laravel:

```bash
cd laravel-pondok-mbodo # cd: change directory (pindah folder)
```

```bash
php artisan serve
```

Setelah Anda memulai Artisan development server, aplikasi Anda akan dapat diakses di browser web Anda di [http://localhost:8000](http://localhost:8000). Selanjutnya, Anda siap untuk mulai mengambil langkah selanjutnya ke dalam ekosistem Laravel. Tentu saja, Anda mungkin juga ingin mengonfigurasi database.

## Environment Based Configuration (Konfigurasi Berbasis Lingkungan)

Karena banyak nilai opsi konfigurasi Laravel dapat bervariasi tergantung pada apakah aplikasi Anda berjalan di mesin lokal atau di server web produksi, banyak nilai konfigurasi penting yang ditentukan menggunakan file `.env` yang ada di root aplikasi Anda.

File `.env` Anda tidak boleh dikomit (committed) ke kontrol sumber aplikasi Anda, karena setiap pengembang/server yang menggunakan aplikasi Anda mungkin memerlukan konfigurasi lingkungan yang berbeda. Selain itu, hal ini akan menjadi risiko keamanan jika penyusup mendapatkan akses ke repositori kontrol sumber Anda, karena kredensial sensitif apa pun akan terekspos.

## Databases & Migrations

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_pondok_mbodo # nama database silahkan dibuat dulu
DB_USERNAME=root
DB_PASSWORD=
```

```bash
php artisan migrate
```

```bash
php artisan storage:link
```

## Membuat Model

```bash
php artisan make:model
```

