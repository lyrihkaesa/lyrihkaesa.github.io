# Filament v3

## Requirements (Kebutuhan)

Filament memerlukan hal-hal berikut agar dapat berjalan:

- PHP 8.1+
- Laravel v10.0+
- Livewire v3.0+

:::tip Livewire v3 baru saja dirilis!
Tim Livewire telah melakukan pekerjaan yang sangat baik dalam membuatnya stabil, namun ini merupakan penulisan ulang lengkap dari Livewire v2. Anda mungkin mengalami isu, oleh karena itu kami merekomendasikan untuk menguji aplikasi Anda secara menyeluruh sebelum menggunakan Filament v3 secara produksi.
:::

Pasang Pembangun Panel Filament dengan menjalankan perintah-perintah berikut di directory proyek Laravel Anda:

```bash
composer require filament/filament:"^3.0-stable" -W php artisan
```

```bash
filament:install --panels
```

Hal ini akan membuat dan mendaftarkan [Laravel service provider](https://laravel.com/docs/providers) baru yang disebut `app/Providers/Filament/AdminPanelProvider.php`.

> Jika Anda mendapatkan kesalahan saat mengakses panel Anda, periksa bahwa penyedia layanan tersebut terdaftar di `config/app.php` Anda. Jika tidak, Anda sebaiknya menambahkannya secara manual ke dalam `providers` array.

## Membuat Resource

Simple Resource

```bash
php artisan make:filament-resource Student --simple
```

Resource Standard

```bash
php artisan make:filament-resource Student
```

## Publishing translations (Mempublikasikan penerjemah)

```bash
php artisan vendor:publish --tag=filament-panels-translations
```

`app.php`

```php
 /*
    |--------------------------------------------------------------------------
    | Application Locale Configuration
    |--------------------------------------------------------------------------
    |
    | The application locale determines the default locale that will be used
    | by the translation service provider. You are free to set this value
    | to any of the locales which will be supported by the application.
    |
    */
   
    // 'locale' => 'en', // Default
    'locale' => env('LOCALE', 'en'),
```

`.env`

```env
LOCALE='id' # create new this is not default env
```

```txt
Installing dependencies from lock file (including require-dev)
Verifying lock file contents can be installed on current platform.
Your lock file does not contain a compatible set of packages. Please run composer update.

  Problem 1
    - filament/support is locked to version v3.0.88 and an update of this package was not requested.
    - filament/support v3.0.88 requires ext-intl * -> it is missing from your system. Install or enable PHP's intl extension.
  Problem 2
    - filament/support v3.0.88 requires ext-intl * -> it is missing from your system. Install or enable PHP's intl extension.
    - filament/widgets v3.0.88 requires filament/support v3.0.88 -> satisfiable by filament/support[v3.0.88].
    - filament/widgets is locked to version v3.0.88 and an update of this package was not requested.

To enable extensions, verify that they are enabled in your .ini files:
    - D:\xampp\php\php.ini
You can also run `php --ini` in a terminal to see which files are used by PHP in CLI mode.
Alternatively, you can run Composer with `--ignore-platform-req=ext-intl` to temporarily ignore these required extensions.
```

![iniimage]](attachments/Pasted%20image%2020231126114202.png)

![ini image](attachments/Pasted%20image%2020231126114318.png)
