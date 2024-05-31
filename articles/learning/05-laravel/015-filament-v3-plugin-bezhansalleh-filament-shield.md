# Plugin Filament Shield

- `bezhansalleh/filament-shield`

Plugin Filament Shield merupakan cara paling mudah dan intuitif untuk menambahkan manajemen akses ke Filament Admin Anda dengan fitur-fitur berikut:

- 🔥 Sumber daya (Resources)
- 🔥Halaman (Pages)
- 🔥Widgets
- 🔥Custom Permissions

> Untuk penggunaan Filament versi 2.x, gunakan branch 2.x.

> Sebelum versi `3.1.0`, Shield mendukung spatie/laravel-permission:`^5.0`, dan sekarang mendukung versi `^6.0`. Pergantian versi ini memiliki perubahan yang signifikan terkait migrasi. Jika Anda meng-upgrade dari versi sebelum `v3.1.0`, pastikan untuk menghapus file migrasi lama dan menerbitkan yang baru.

## Instalasi

1. Pasang plugin melalui composer:
```bash
composer require bezhansalleh/filament-shield
```

2. Tambahkan trait `Spatie\Permission\Traits\HasRoles` ke model `User` Anda:
```php
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasRoles;
    // ...
}
```

3. Publish file `config` kemudian atur konfigurasi Anda:
```bash
php artisan vendor:publish --tag=filament-shield-config
```

4. Daftarkan plugin untuk Panel Filament yang Anda inginkan:
```php
public function panel(Panel $panel): Panel
{
    return $panel
        ->plugins([
            \BezhanSalleh\FilamentShield\FilamentShieldPlugin::make(),
        ]);
}
```

5. Sekarang jalankan perintah berikut untuk install Shield:
```bash
php artisan shield:install
```

6. OPTIONAL: Translatable
```bash
php artisan vendor:publish --tag="filament-shield-translations"
```

Ikuti petunjuk dan nikmati!

## Filament Panel

Jika Anda ingin mengaktifkan `Shield` untuk lebih dari satu panel, Anda perlu mendaftarkan plugin untuk setiap panel seperti yang disebutkan di atas.

### Akses Panel

Shield dilengkapi dengan trait `HasPanelShield` yang menyediakan cara mudah untuk mengintegrasikan konvensi Shield dengan sistem akses panel Filament.

Trait `HasPanelShield` memberikan implementasi untuk method `canAccessPanel`, menentukan akses berdasarkan apakah pengguna memiliki role `super_admin` atau role `panel_user`. Ini juga menetapkan role `panel_user` kepada pengguna saat pembuatan dan penghapusan. Tentu saja `role-name` dapat diubah dari file konfigurasi plugin.

```php
use BezhanSalleh\FilamentShield\Traits\HasPanelShield;
use Filament\Models\Contracts\FilamentUser;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements FilamentUser
{
    use HasRoles;
    use HasPanelShield;
    // ...
}
```

### Resources

Secara umum, ada dua skenario yang ditangani Shield untuk resource `permission` Filament Anda.

#### Default

Secara default, Shield menangani `permission` yang telah ditentukan sebelumnya untuk `FilamentResource`. Jadi jika itu semua yang Anda butuh kan, Anda sudah siap. Jika Anda perlu menambahkan satu permission (misalnya `lock`) dan memiliki permission tersebut tersedia untuk semua `Resource` Anda, cukup tambahkan ke kunci `config` berikut:

```php
    'permission_prefixes' => [
        'resource' => [
            'view',
            'view_any',
            'create',
            'update',
            'restore',
            'restore_any',
            'replicate',
            'reorder',
            'delete',
            'delete_any',
            'force_delete',
            'force_delete_any',
            'lock' // add here
        ],
        ...
    ],
```

Sekarang Anda berpikir, **"bagaimana jika saya membutuhkan permission hanya tersedia untuk satu `Resource` saja?"** Jangan khawatir, di situlah **Custom Permission** masuk.

#### Custom Permission

Untuk mendefinisikan custom permission per `Resource`, `Resource` Anda harus menerapkan contract `HasShieldPermissions`. Contract ini memiliki method `getPermissionPrefixes()` yang mengembalikan `array` permission prefix untuk `Resource` Anda.

Misalnya, jika Anda memiliki `PostResource` dan ingin beberapa permission yang telah ditentukan sebelumnya, ditambah permission baru bernama `publish_posts` hanya tersedia untuk `PostResource` saja.

```php
class PostResource extends Resource implements HasShieldPermissions
{
    ...

    public static function getPermissionPrefixes(): array
    {
        return [
            'view',
            'view_any',
            'create',
            'update',
            'delete',
            'delete_any',
            'publish' // look here
        ];
    }

    ...
}
```

Di contoh di atas, method `getPermissionPrefixes()` mengembalikan `permission-prefixes` yang dibutuhkan `Shield` untuk generate permission.

Sekarang, untuk memberlakukan permission `publish_post`, buatlah method `publish()` di class `PostPolicy` Anda:

```php
class PostPolicy {
	...
	/**
     * Determine whether the user can publish posts.
     *
     * @param  \App\Models\User  $admin
     * @return \Illuminate\Auth\Access\Response|bool
     */
	public function publish(User $user)
	{
	    return $user->can('publish_post');
	}
}
```

Catatan:

- prefix-nya `publish` untuk resource untuk model `Post` maka permission name menjadi `pubish_post`.
- karena prefix-nya `publish` maka method pada `PostPolicy` juga harus sama dengan prefix-nya yaitu `publish` -> `public function publish(User $user)`

Untuk membuat `prefix translatable` (dapat diterjemahkan), publish terjemahan `Shield` dan tambahkan prefix di dalam `resource_permission_prefixes_labels` sebagai key dan terjemahan sebagai nilainya untuk bahasa yang Anda butuh kan.

```php
//lang/en/filament-shield.php
'resource_permission_prefixes_labels' => [
    'publish' => 'Publish'
],
//lang/id/filament-shield.php
'resource_permission_prefixes_labels' => [
    'publish' => 'Publikasi'
],
```

#### Configure Permission Identifier

Secara default, permission identifier (pengenal izin) dihasilkan sebagai berikut:

```php
Str::of($resource)
    ->afterLast('Resources\\')
    ->before('Resource')
    ->replace('\\', '')
    ->snake()
    ->replace('_', '::');
```

Jadi misalnya jika Anda memiliki `Resource` seperti `App\Filament\Resources\Shop\CategoryResource`, maka permission identifier-nya akan menjadi `shop::category` dan kemudian akan diberi prefix dengan prefix yang Anda tetapkan atau yang default dengan shield.

Jika Anda ingin mengubah perilaku default, Anda dapat memanggil static method `configurePermissionIdentifierUsing()` di dalam method `boot()` service provider, dimana Anda dapat menggunakan Closure untuk mengubah logika. Closure menerima class name `Resource` yang sepenuhnya disebutkan sebagai `$resource` yang memberi Anda kemampuan untuk mengakses property atau method apa pun yang didefinisikan dalam `Resource`.

Sebagai contoh, jika Anda ingin menggunakan nama model sebagai permission identifier, Anda dapat melakukannya seperti ini:

```php
use BezhanSalleh\FilamentShield\Facades\FilamentShield;

FilamentShield::configurePermissionIdentifierUsing(
    fn($resource) => str($resource::getModel())
        ->afterLast('\\')
        ->lower()
        ->toString()
);
```

> **Peringatan**
> Ingatlah bahwa memastikan keunikan permission identifier sekarang menjadi tanggung jawab Anda.

#### Custom Navigation Group

Secara default, terjemahan dalam bahasa Inggris me-render role dan permission di bawah 'Filament Shield'. Jika Anda ingin mengubah ini, pertama-tama publish [translations files](https://github.com/bezhanSalleh/filament-shield#translations) dan ubah lokalisasi relatif ke grup yang Anda inginkan, misalnya:

```php
// 'nav.group' => 'Filament Shield', // default
'nav.group' => 'User Management', // custom navigation group
```

terapkan ini untuk setiap bahasa yang memiliki grup.

### Pages

Jika Anda telah generate permission untuk `Pages`, Anda dapat mengubah navigasi halaman dari sidebar dan akses terbatas ke halaman tersebut. Anda dapat mengaturnya secara manual tetapi paket ini dilengkapi dengan trait `HasPageShield` untuk mempercepat proses ini. Yang harus Anda lakukan hanyalah menggunakan trait dalam pages Anda:

```php
<?php

namespace App\Filament\Pages;

use ...;
use BezhanSalleh\FilamentShield\Traits\HasPageShield;

class MyPage extends Page
{
    use HasPageShield;
    ...
}
```

`HasPageShield` menggunakan method `booted` untuk memeriksa user permission dan memastikan untuk menjalankan method page `booted` di parent page jika ada.

#### Pages Hooks

Namun jika Anda perlu melakukan beberapa method before (sebelum) dan after (setelah) method `booted` Anda dapat mendeklarasikan method hooks berikut di Filament Page Anda.

```php
<?php

namespace App\Filament\Pages;

use ...;
use BezhanSalleh\FilamentShield\Traits\HasPageShield;

class MyPage extends Page
{
    use HasPageShield;
    ...

    protected function beforeBooted : void() {
        ...
    }

    protected function afterBooted : void() {
        ...
    }

    /**
     * Hooks untuk melakukan tindakan sebelum redirect jika pengguna
     * tidak memiliki akses ke page.
     * */
    protected function beforeShieldRedirects : void() {
        ...
    }
}
```

#### Pages Redirect Path

`HasPageShield` menggunakan value `config('filament.path')` secara default untuk melakukan redirect shield. Jika Anda perlu overwrite redirect path, cukup tambahkan method berikut ke Page Anda:

```php
<?php

namespace App\Filament\Pages;

use ...;
use BezhanSalleh\FilamentShield\Traits\HasPageShield;

class MyPage extends Page
{
    use HasPageShield;
    ...

    protected function getShieldRedirectPath(): string {
        return '/'; // mengalihkan ke indeks root...
    }
}
```

#### Widget

Jika Anda telah generate permission untuk `Widget`, Anda dapat mengalihkan state mereka berdasarkan user permission. Anda dapat mengaturnya secara manual tetapi paket ini dilengkapi dengan trait `HasWidgetShield` untuk mempercepat proses ini. Yang harus Anda lakukan hanyalah menggunakan trait dalam widget Anda:

```php
<?php

namespace App\Filament\Widgets;

use ...;
use BezhanSalleh\FilamentShield\Traits\HasWidgetShield;

class IncomeWidget extends LineChartWidget
{
    use HasWidgetShield;
    ...
}
```

### Policies

#### Role Policy

Untuk memastikan akses `RoleResource` melalui `RolePolicy`, Anda perlu menambahkan hal berikut ke `AuthServiceProvider` Anda:

```php
//AuthServiceProvider.php
...
protected $policies = [
    'Spatie\Permission\Models\Role' => 'App\Policies\RolePolicy',
];
...
```

Anda dapat melewatinya jika Anda telah mengaktifkannya dari `config`:

```php
// config/filament-shield.php
...
'register_role_policy' => [
    'enabled' => true,
],
...
```

#### Policy Path

Jika policy Anda tidak berada dalam directory `Policies` default di `app_path()`, Anda dapat mengubah nama directory-nya dalam file `config`:

```php
// config/filament-shield.php
...
'generator' => [
    'option' => 'policies_and_permissions',
    'policy_directory' => 'Policies',
],
...
```

#### Custom folder structure for Models or Third-Party Plugins

Shield juga generate policies dan permission untuk plugin pihak ketiga dan `Model` dengan struktur folder kustom. Dan untuk memberlakukan policy yang dihasilkan, Anda perlu mendaftarkannya di `AuthServiceProvider` aplikasi Anda:

```
...
class AuthServiceProvider extends ServiceProvider
{
    ...
    protected $policies = [
        ...,
        'App\Models\Blog\Author' => 'App\Policies\Blog\AuthorPolicy',
        'Ramnzys\FilamentEmailLog\Models\Email' => 'App\Policies\EmailPolicy'

    ];
```

#### Users (Assigning Roles to Users)

Shield tidak dilengkapi dengan cara untuk memberikan role kepada user Anda secara langsung, namun Anda dapat dengan mudah memberikan role kepada user Anda menggunakan komponen `Select` atau `CheckboxList` dari `Forms` Filament. Di dalam form `Resource` user Anda, tambahkan salah satu komponen ini dan konfigurasikan sesuai kebutuhan Anda.

```php
// Using Select Component
Forms\Components\Select::make('roles')
    ->relationship('roles', 'name')
    ->multiple()
    ->preload()
    ->searchable()

// Using CheckboxList Component
Forms\Components\CheckboxList::make('roles')
    ->relationship('roles', 'name')
    ->searchable()
```

You can find out more about these components in the [Filament Docs](https://filamentphp.com/docs/3.x/forms/installation)

- [Select](https://filamentphp.com/docs/3.x/forms/fields/select)
- [CheckboxList](https://filamentphp.com/docs/3.x/forms/fields/checkbox-list)

#### Layout Customization

Anda dapat dengan mudah menyesuaikan `Grid`, `Section`, dan `CheckboxList`'s `columns()` dan `columnSpan()` tanpa publish `Resource`.

```php
use BezhanSalleh\FilamentShield\FilamentShieldPlugin;

public function panel(Panel $panel): Panel
{
        return $panel
            ...
            ...
            ->plugins([
                FilamentShieldPlugin::make()
                    ->gridColumns([
                        'default' => 1,
                        'sm' => 2,
                        'lg' => 3
                    ])
                    ->sectionColumnSpan(1)
                    ->checkboxListColumns([
                        'default' => 1,
                        'sm' => 2,
                        'lg' => 4,
                    ])
                    ->resourceCheckboxListColumns([
                        'default' => 1,
                        'sm' => 2,
                    ]),
            ]);
}
```

#### Translations

Publish terjemahan menggunakan:

```bash
php artisan vendor:publish --tag="filament-shield-translations"
```

## Available Filament Shield Commands

### `shield:doctor`

Menampilkan informasi berguna tentang Filament Shield.

```bash
php artisan shield:doctor
```

### `shield:install`

Atur Persyaratan Core Package dan Install Shield. Menerima flag berikut:

| flag      | keterangan                                                               |
| --------- | ------------------------------------------------------------------------ |
| `--fresh` | jalankan migrasi kembali                                                 |
| `--only`  | Hanya setup shield tanpa generating permission dan membuat `super-admin` |

```bash
php artisan shield:install
```

```bash
# jalankan migrasi kembali
php artisan shield:install --fresh
# Hanya setup shield tanpa generating permission dan membuat `super-admin`
php artisan shield:install --only
```

### `shield:generate`

Generate Permission dan/atau Policies untuk entitas Filament. Menerima flag berikut:
| flag | keterangan |
| ---------------------------- | -------------------------------------------------------------------------------------- |
| `--all` | Hasilkan permission/policy untuk semua entitas |
| `--option[=OPTION]` | Overwrite opsi config generator (`policies_and_permissions`,`policies`,`permissions`) |
| `--resource[=RESOURCE]` | Satu atau beberapa `Resource` dipisahkan dengan koma (,) |
| `--page[=PAGE]` | Satu atau beberapa page dipisahkan dengan koma (,) |
| `--widget[=WIDGET]` | Satu atau beberapa widget dipisahkan dengan koma (,) |
| `--exclude` | Kecualikan entitas yang diberikan selama generation |
| `--ignore-config-exclude` | Abaikan opsi `exclude` konfigurasi selama generation |
| `--ignore-existing-policies` | Jangan Overwrite policy yang sudah ada. |
| | |

### `shield:super-admin`

Buat pengguna dengan role `super_admin`.

| flag      | keterangan                                                                               |
| --------- | ---------------------------------------------------------------------------------------- |
| `--user=` | Mmenggunakan ID yang diberikan untuk menemukan pengguna yang akan dijadikan super admin. |

```bash
php artisan shield:super-admin
```

```bash
php artisan shield:super-admin --user=1
```

### `shield:publish`

Publish `RoleResource` Shield dan sesuaikan sesuai keinginan Anda.

```bash
php artisan shield:publish
```

### `shield:seeder`

Menerapkan dengan mudah dengan menyiapkan role dan permission Anda atau tambahkan custom seed Anda sendiri.

```bash
php artisan shield:seeder
```
