# Tinker

```bash
php artisan tinker
```

Keluar dari tinker:
```bash
q 
# Goodbye.
```


## `spatie/laravel-web-tinker`

### Installation

Anda dapat menginstal paket melalui composer:
```bash
composer require spatie/laravel-web-tinker --dev
```

Selanjutnya, Anda harus mempublikasikan aset dari paket ini dengan menjalankan perintah ini.
```bash
php artisan web-tinker:install
```

Secara opsional, Anda dapat mempublikasikan file konfigurasi paket.
```bash
php artisan vendor:publish --provider="Spatie\WebTinker\WebTinkerServiceProvider" --tag="config"
```

Ini adalah konten yang akan dipublikasikan ke `config/web-tinker.php`

```php
return [

    /*
     * The web tinker page will be available on this path.
     */
    'path' => '/tinker',

    /*
     * Possible values are 'auto', 'light' and 'dark'.
     */
    'theme' => 'auto',

    /*
     * By default this package will only run in local development.
     * Do not change this, unless you know what your are doing.
     */
    'enabled' => env('APP_ENV') === 'local',

   /*
    * This class can modify the output returned by Tinker. You can replace this with
    * any class that implements \Spatie\WebTinker\OutputModifiers\OutputModifier.
    */
    'output_modifier' => \Spatie\WebTinker\OutputModifiers\PrefixDateTime::class,

    /*
    * These middleware will be assigned to every WebTinker route, giving you the chance
    * to add your own middlewares to this list or change any of the existing middleware.
    */
    'middleware' => [
        Illuminate\Cookie\Middleware\EncryptCookies::class,
        Illuminate\Session\Middleware\StartSession::class,
        Spatie\WebTinker\Http\Middleware\Authorize::class,
    ],

    /*
     * If you want to fine-tune PsySH configuration specify
     * configuration file name, relative to the root of your
     * application directory.
     */
    'config_file' => env('PSYSH_CONFIG', null),
];
```

### Penggunaan

Secara default paket ini hanya akan berjalan di lingkungan lokal (local environment). 

Kunjungi `/tinker` di  local environment aplikasi Anda untuk melihat tinker page.