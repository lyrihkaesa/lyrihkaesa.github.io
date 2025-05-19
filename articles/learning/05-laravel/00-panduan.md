# Panduan untuk Anda Belajar Laravel

Jika anda ingin tahu lebih dalam soal laravel, sebaiknya Anda belajar terlebih dahulu beberapa hal berikut:
- Belajar dahulu HTML, JavaScript, dan CSS.
- Belajar dulu HTTP.
- Belajar dulu Git dan GitHub.
- Belajar dahulu PHP.
- Lalu ke Laravel.
- Pelajari Juga Database.

## Perangkat Lunak yang digunakan Windows

- Pasang VCM (Version Control System) yaitu [git](https://git-scm.com/downloads).
- Pasang Text Editor atau IDE (Integrated Development Environment) seperti [Visual Studio Code](https://code.visualstudio.com/download).
- Pasang [Composer](https://getcomposer.org/download/). PHP Package Management.
- Pasang [Laravel Herd](https://herd.laravel.com/windows).
	- Nginx [Free]
	- PHP [Free]
	- NVM (NodeJS Version Manager) [Free]
	- Domain cantik untuk testing `.test` , contoh: `websitegua.test`. [Free]
	- SQLite [Free]
- Pasang [DBngin](https://dbngin.com/). Alternatif dari Laravel Herd Pro untuk manajemen versi database.  
  All-in-One Database Version Management Tool: `PostgreSQL`, `MySQL`, `MariaDB`, `Redis`.
- Pasang [Docker Desktop Windows WSL 2](https://docs.docker.com/desktop/install/windows-install/)
	- Saya sarankan gunakan WSL 2 (Windows Sub-System Linux).
- Pasang [Docker Minio](https://hub.docker.com/r/minio/minio). S3 Bucket.
- [Tidak Direkomendasikan] Pasang [Laragon v6.0.0 (GRATIS)](https://github.com/leokhoa/laragon/releases/download/6.0.0/laragon-wamp.exe).
	- Alternatif dari Laravel Herd Pro
	- [Tidak Direkomendasikan] Pasang Laragon v7.0.0 itu berbayar butuh license.
	- Database Version Management Tool: `PostgreSQL`, `MySQL`, `MariaDB`, `Redis`
	- [Tidak Direkomendasikan] Pasang ~~NVM (Node Version Manager)~~ gunakan `Laravel Herd`
	- [Tidak Direkomendasikan] Pasang ~~Nginx~~ gunakan `Laravel Herd`
  Saya ada masalah soal laragon, yaitu masalah ini: [Masalah Laragon Multiple Http Get Error Timeout](61-masalah-laragon-01-multiple-http-get-timeout.md)
- [Tidak Direkomendasikan] Pasang [~~XAMPP~~](https://www.apachefriends.org/download.html)
  Karena XAMPP memiliki masalah ganti versi PHP, jadi saya pindah ke Laragon atau Laravel Herd.
- [Tidak Direkomendasikan] Pasang [~~nvm-windows~~](https://github.com/coreybutler/nvm-windows/releases).
  Karena nvm (Node Version Manager) sudah ada pada `Laravel Herd` jadi tidak perlu memasang ini.

## Menambahkan Git Alias
Silahkan baca di sini: [Git Aliases](/learning/git/git-aliases)
## Debug Laravel

### Database Query Debug
- Dapat bekerja di `web.php` maupun `api.php`

Tambahkan kode di bawah ini pada method `boot` di file `app/Providers/AppServiceProvider.php` .
```php
DB::listen(fn ($e) => dump($e->toRawSql()));
```

```php
DB::listen(function ($q) {
            dump($q->sql);
        });
```

### Package `barryvdh/laravel-debugbar`
- [Github Laravel Debugbar](https://github.com/barryvdh/laravel-debugbar)
- Hanya bekerja untuk `web.php`, tidak bisa digunakan di `api.php`.
```bash
composer require barryvdh/laravel-debugbar --dev
```

```bash
php artisan vendor:publish --provider="Barryvdh\Debugbar\ServiceProvider"
```
### Laravel Telescope
- https://laravel.com/docs/10.x/telescope
- Dapat bekerja di `web.php` maupun `api.php`


## Optimize Query Database
`AppServiceProvider`

```php
public function boot(): void
{
	// Mencegah lezy loading query ke database saat local/develop
	// Tidak aktif saat production
	// Model::preventLazyLoading(!$this->app->isProduction());
	Model::shouldBeStrict(!app()->isProduction())
	Model::unguard();
	Date::use(CarbonImutable::class);
	DB::prohibitDesctructiveCommands(app()->isProduction());
}
```


## Coba Cari Tahu
- Laravel night watch
- herd-profile


## Mail

- mailtrap


## Catatan Simple

- Google SMTP Email Verivication Laravel https://learn.wpucourse.id/member/course/6lYng4f7LZViUlHZ580qd/4/3/
- 