# Livewire v3

- https://livewire.laravel.com/

## Persyaratan (Prerequisites) 

Sebelum kita mulai, pastikan Anda telah mengistal hal ini: 
- Laravel versi `10` atau lebih baru 
- PHP versi `8.1` atau lebih baru

## Pemasangan (Installation)

```bash
composer require livewire/livewire
```

> **Pastikan `AlpineJS` belum dipasang**
> Jika aplikasi yang Anda gunakan sudah terinstal `AlpineJS`, Anda harus menghapusnya agar `Livewire` dapat berfungsi dengan baik; jika tidak, Alpine akan dimuat (load) dua kali dan Livewire tidak akan berfungsi. Misalnya, jika Anda memasang starter kit Laravel Breeze "Blade with Alpine", Anda harus **menghapus Alpine** dari `resources/js/app.js`.

## Membuat Livewire Component

Terdapat dua cara untuk membuat `Livewire` `Component` yaitu dengan perintah:
```bash
php artisan make:livewire
```
dan
```bash
php artisan livewire:make
```

### Contoh Membuat Livewire Component

```bash
php artisan make:livewire Home
```

Maka akan dibuatkan dua file:
- `app\Livewire\Home.php` - sebagai pengganti dari `Controller`
```php
<?php

namespace App\Livewire;

use Livewire\Component;

class Home extends Component
{
    public function render()
    {
        return view('livewire.home'); // Merujuk pada file `resources\views\livewire\home.blade.php`
    }
}

```

- `resources\views\livewire\home.blade.php` - view yang digunakan oleh `Livewire\Home.php`
```php
<div>
	Ini Home Page
</div>
```

Selanjutnya untuk mengeceknya anda bisa membuat `route` pada `routes/web.php`:
```php
<?php

# use App\Livewire\Home; # ❌ Jangan gunakan `use` Component Livewire, karena nanti akan banyak alias.
# use App\Livewire\Posts\Index as PostIndex; # ❌ Jangan gunakan `use` Component Livewire
# use App\Livewire\Users\Index as UserIndex; # ❌ Jangan gunakan `use` Component Livewire

use Illuminate\Support\Facades\Route;

# Route::get('/',Home::class)->name('home'); # ❌ Jangan gunakan `use`, karena nanti akan banyak alias.
Route::get('/',\App\Livewire\Home::class)->name('home'); # ✅ Best Partice
```

:::danger Error

Error saat pertama kali install tanpa ada `layout.app`.

```txt
Livewire page component layout view not found: [components.layouts.app]
```

Jadi jalankan kode ini untuk mengatasi error di atas:
```bash
php artisan livewire:layout
```

Nanti akan dibuatkan file `resources\views\components\layouts\app.blade.php`.
:::

Mengubah  `livewire` `layout` `app.blade.php` file:
- `resources\views\components\layouts\app.blade.php` menjadi `resources\views\layouts\app.blade.php`
```tree
resources
	- \views
		- \components 
			- \layouts
				- \app.blade.php # dipindahkan ⤵
		- \layouts
			- \app.blade.php # pindah ke sini 👀
```

Maka akan mendapatkan error yang sama yaitu:
```txt
Livewire page component layout view not found: [components.layouts.app]
```

Jadi Anda harus mengubah letak layout view pada `config/livewire.php` . Silahkan lanjut baca di bawah ini:

## Publishing the configuration file

Livewire adalah "zero-config", artinya Anda dapat menggunakannya dengan mengikuti konvensi, tanpa konfigurasi tambahan apa pun. Namun, jika diperlukan, Anda dapat Publishing the configuration file Livewire dengan menjalankan perintah Artisan berikut:

```bash
php artisan livewire:publish --config
```

Ini akan membuat file `livewire.php` baru di directory `config` aplikasi Laravel Anda, yaitu: `config/livewire.php`.

:::info Change Default Setting `layout`

```php
    /*
    |---------------------------------------------------------------------------
    | Layout
    |---------------------------------------------------------------------------
    | The view that will be used as the layout when rendering a single component
    | as an entire page via `Route::get('/post/create', CreatePost::class);`.
    | In this case, the view returned by CreatePost will render into $slot.
    |
    */

    // 'layout' => 'components.layouts.app', // Default Config Layout 👀
    'layout' => 'layouts.app', // Custom Path Layout ✅
```
:::

## Melihat Daftar Perintah Artisan Livewire

```bash
php artisan list livewire
```

## `__constructor()`  in livewire is `mount()`