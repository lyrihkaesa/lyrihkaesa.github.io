# Spatie/laravel-permission

Daftar istilah:
- roles = peranan
- permission = perizinan
- user = pengguna
- policies/policy = kebijakan

## Introduction (Pendahuluan)

_Package_ ini mengizinkan Anda untuk memanajemen user permissions dan roles di database.

Setelah terinstal, Anda dapat melakukan hal-hal seperti ini:

```php
// Menambahkan permissions ke user
$user->givePermissionTo('edit articles');

// Menambahkan permissions menggunakan roles
$user->assignRole('writer');

$roleWriter->givePermissionTo('edit articles');
```

Jika Anda menggunakan `multiple guards` dalam Laravel, Spatie Permission dapat menangani kasus tersebut dengan baik. Setiap guard akan memiliki seperangkat permissions dan roles sendiri.
Baca lebih lanjut tentang ini pada section [using multiple guards].

Karena semua permissions akan terdaftar pada _gate_ (pintu gerbang) Laravel, Anda dapat memeriksa apakah seseorang user memiliki permissions dengan menggunakan _default function_ `can` pada Laravel:

```php
$user->can('edit articles');
```

dan menggunakan _directive Blade_:

```php
@can('edit articles')
// Konten yang hanya ditampilkan jika _user_ memiliki `permissions` untuk mengedit artikel
// ...
@endcan
```

## Prerequisites (Persyaratan)

### Laravel Version

_Package_ ini dapat digunakan dengan Laravel versi 6 atau yang lebih tinggi. Anda dapat memeriksa halaman "[Installing on Laravel]" untuk mengetahui versi _Package_ yang kompatibel dengan berbagai versi Laravel. Dengan demikian, Anda dapat memastikan bahwa Anda menggunakan versi _Package_ yang sesuai dengan versi Laravel yang Anda gunakan.

### User Model / Contract / Interface

_Package_ ini menggunakan lapisan `Gate Laravel` untuk menyediakan kemampuan _Authorization_ (otorisasi). Lapisan _Gate/authorization_ memerlukan model `User` Anda untuk implement contract `Illuminate\Contracts\Auth\Access\Authorizable`. Jika tidak, method `can()` dan `authorize()` tidak akan berfungsi dalam _controllers, policies, templates,_ dll.

Dalam instruksi [Instalasi], Anda akan melihat bahwa trait `HasRoles` harus ditambahkan ke model `User` untuk _enable_ (mengaktifkan) fitur-fitur _Package_ ini.

Dengan demikian, model `User` dasar biasanya akan memiliki persyaratan minimum berikut:

```php
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasRoles;
    // ...
}
```

### TIDAK BOLEH memiliki property `role` atau `roles`, maupun method `roles()`

Model `User` Anda **TIDAK BOLEH** memiliki _property_ `role` atau `roles` (atau field dalam database dengan nama tersebut), atau _method_ `roles()`. Hal ini akan mengganggu _property_ dan _method_ yang ditambahkan oleh trait `HasRoles` yang disediakan oleh _package_ ini, sehingga menyebabkan hasil yang tidak diharapkan saat _method package_ ini digunakan untuk memeriksa _roles_ dan _permissions_.

### TIDAK BOLEH memiliki property `permission` atau `permissions`, maupun method `permission()`

Model `User` Anda tidak boleh memiliki _property_ `permission` atau `permissions` (atau field dalam database dengan nama tersebut), atau _method_ `permissions()`. Hal ini akan mengganggu _property_ dan _method_ yang ditambahkan oleh trait `HasPermissions` yang disediakan oleh _package_ ini (yang _invoked_ (dipanggil) melalui trait `HasRoles`).

```php
// vendor\spatie\laravel-permission\src\Traits\HasRoles.php
namespace Spatie\Permission\Traits;

// code lain disembunyikan

trait HasRoles
{
    use HasPermissions;    
    // code lain disembunyikan
}
```

### Config file

_Package_ ini akan _publishes_ file `config/permission.php`. Jika Anda sudah memiliki file dengan nama tersebut, Anda harus mengganti nama atau menghapusnya, karena akan conflict (bentrok) dengan _package_ ini. Anda dapat secara opsional menggabungkan nilai-nilai Anda sendiri dengan yang diperlukan oleh _package_ ini, selama kunci-kunci yang diharapkan oleh _package_ ini ada. Lihat file sumber untuk lebih detail.

### Schema Limitation in MySQL

Pada MySQL 8.0 membatasi _index keys_ menjadi 1000 _characters_. _package_ ini _publishes_ (menerbitkan) _migration_ yang menggabungkan beberapa _columns_ dalam _single index_ (satu index). Dengan `utf8mb4`, persyaratan `4-bytes-per-character` dari `mb4` berarti _max length_ (panjang maksimum) _columns_ dalam _hybrid index_ hanya dapat menjadi 125 _characters_.

Oleh karena itu, dalam `AppServiceProvider` Anda perlu mengatur `Schema::defaultStringLength(125)`. [Lihat petunjuk pada Dokumentasi Laravel](https://laravel.com/docs/migrations#index-lengths-mysql-mariadb).

Anda mungkin dapat mengabaikan pengaturan `defaultStringLength(125)` dengan mengedit _migration_ dan menentukan 125 char di 4 _field_. Ada 2 contoh potongan kode di mana Anda dapat secara eksplisit mengatur 125 char:

```php
$table->string('name');       // For MySQL 8.0 use string('name', 125);
$table->string('guard_name'); // For MySQL 8.0 use string('guard_name', 125);
```

### Catatan untuk aplikasi yang menggunakan UUID/ULID/GUID

_Package_ ini mengharapkan `primary key` dari model `User` Anda untuk menjadi auto-incrementing `int` (yang bertambah secara otomatis). Jika tidak, Anda mungkin perlu memodifikasi _migration_ `create_permission_tables` dan/atau mengubah konfigurasi default. Lihat [https://spatie.be/docs/laravel-permission/advanced-usage/uuid](https://spatie.be/docs/laravel-permission/advanced-usage/uuid) untuk informasi lebih lanjut.

### Database foreign-key relationship support

_Package_ ini menggunakan `relationship foreign-key` pada database dengan `cascading deletes` untuk menerapkan integritas database. Hal ini mencegah situasi ketidaksesuaian data jika records database dimanipulasi di luar _package_ ini. Jika database engine Anda tidak mendukung relationship foreign-key, maka Anda harus mengubah file _migration_ sesuai dengan kebutuhan.

_Package_ ini melakukan `detaching` terpisah dari `pivot records` saat penghapusan dilakukan menggunakan _method_ yang disediakan oleh _package_ ini. Jadi, jika database Anda tidak mendukung foreign key, selama Anda hanya menggunakan panggilan _method_ yang disediakan oleh _package_ ini untuk mengelola records terkait, seharusnya tidak ada masalah integritas data.

## Installation in Laravel

### Laravel Version Compatibility

Lihat pada [Laravel Version Compatibility](https://spatie.be/docs/laravel-permission/v6/installation-laravel#content-laravel-version-compatibility)

### Installing

Ini adalah instruksi untuk install _package_ Spatie Laravel Permission. Beberapa hal yang perlu diperhatikan sebelum instalasi adalah:

- Pastikan untuk memeriksa [Prerequisites] page untuk pertimbangan penting mengenai model `User` Anda!
- _Package_ ini akan _**publishes**_ file `config/permission.php`. Jika Anda sudah memiliki file dengan nama tersebut, Anda harus mengubah nama atau menghapusnya.

Langkah-langkah untuk install _package_ ini adalah sebagai berikut:
1. **Install _package_ melalui Composer** dengan perintah:
```bash
composer require spatie/laravel-permission
```
2. Optional: _package_ ini akan mendaftarkan service provider secara otomatis. Atau Anda dapat menambahkan service provider secara manual di file `config/app.php`:
```php
'providers' => [
	// ...     
	Spatie\Permission\PermissionServiceProvider::class, 
];
```
3. **_Publish [migration](https://github.com/spatie/laravel-permission/blob/main/database/migrations/create_permission_tables.php.stub)_** dan [_config file_](https://github.com/spatie/laravel-permission/blob/main/config/permission.php) `config/permission.php` dengan perintah:
```bash
php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"
```

> **SEBELUM MENJALANKAN _migration_**

- **Jika Anda menggunakan UUID**, lihat bagian Advanced pada dokumen tentang langkah-langkah UUID sebelum melanjutkan. Hal ini menjelaskan beberapa perubahan yang mungkin ingin Anda buat pada _migration_ dan _config file_ sebelum melanjutkan.
- **Jika Anda akan menggunakan fitur TEAMS**, Anda harus memperbarui [_config file_](https://github.com/spatie/laravel-permission/blob/main/config/permission.php) `config/permission.php`:
	- Anda harus mengatur `'teams' => true`,
    - dan (opsional) Anda dapat mengatur nama `team_foreign_key` di _config file_ jika Anda ingin menggunakan foreign key kustom di database Anda untuk tim.
- **Jika Anda menggunakan MySQL 8**, lihat file _migration_ untuk catatan tentang MySQL 8 untuk mengatur/membatasi panjang `index key`, dan edit sesuai kebutuhan. Jika Anda mendapatkan `ERROR: 1071 Specified key was too long` maka Anda perlu melakukan ini.

4. **Bersihkan cache konfigurasi Anda**. _Package_ ini memerlukan akses ke pengaturan konfigurasi `permission` agar dapat menjalankan _migration_. Jika Anda telah mem-cache konfigurasi secara lokal, bersihkan cache konfigurasi Anda dengan salah satu dari perintah berikut:
```bash
php artisan optimize:clear
```
atau
```bash
php artisan config:clear
```

5. **Jalankan _migration_**: Setelah konfigurasi telah dipublikasikan dan dikonfigurasi, Anda dapat membuat tabel untuk _package_ ini dengan menjalankan _migration_, dengan perintah:
```bash
php artisan migrate
```

 6. **Tambahkan trait yang diperlukan ke model `User` Anda**:
```php
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasRoles;
    // ...
}
```

7. Anda dapat mulai menggunakan fitur-fitur _package_ ini dengan membaca bagian Basic Usage pada dokumentasinya.

### Default config file contents

Anda dapat melihat isi `config file` default di:
[https://github.com/spatie/laravel-permission/blob/main/config/permission.php](https://github.com/spatie/laravel-permission/blob/main/config/permission.php)

### Membuat Seeder

```bash
php artisan make:seeder RoleSeeder
```

```bash
php artisan make:seeder PermissionSeeder
```

## Basic Usage (Penggunaan Dasar)

Ini adalah petunjuk dasar penggunaan Spatie Laravel Permission. Berikut adalah penjelasan dari setiap langkah:

### Add The Trait
**Menambahkan Trait**: Pertama, Anda perlu menambahkan trait `Spatie\Permission\Traits\HasRoles` ke model `User` Anda. Dengan menambahkan trait ini, model `User` akan memiliki kemampuan untuk memiliki `roles` dan `permissions`.
```php
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasRoles;
    // ...
}
```

### Create A Permission
**Membuat `permissions`**: _Package_ ini memungkinkan _user_ untuk berelasi dengan `permissions` dan `roles`. Setiap `role` berelasi dengan beberapa `permissions`. `Role` dan `Permission` adalah model Eloquent biasa. Mereka _require_ `name` dan dapat dibuat seperti ini:
```php
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

$role = Role::create(['name' => 'writer']);
$permission = Permission::create(['name' => 'edit articles']);
```

### Assign A Permission To A Role
**Menetapkan `permission` ke `role`**: `permission` dapat ditetapkan (assign) ke `role` menggunakan salah satu dari _method_ berikut:
```php
$role->givePermissionTo($permission); // peran diberi izin untuk ...
$permission->assignRole($role); // ijin ini ditetapkan ke peran ...
```

### Sync Permissions To A Role
**Menyinkronkan `permission` ke `role`**: Beberapa `permissions` dapat disinkronkan ke `role` menggunakan salah satu dari _method_ berikut:
```php
$role->syncPermissions($permissions);
$permission->syncRoles($roles);
```

### Remove Permission From A Role
**Menghapus `permission` dari `role`**: `permission` dapat dihapus dari `role` menggunakan salah satu dari _method_ berikut:
```php
$role->revokePermissionTo($permission);
$permission->removeRole($role);
``` 

## Guard Name
**Nama Penjaga**: Jika Anda menggunakan beberapa penjaga (guards), maka atribut `guard_name` juga harus diatur. Anda dapat membaca tentang ini di bagian [using multiple guards](https://spatie.be/docs/laravel-permission/v6/basic-usage/multiple-guards) dari readme.

### Get Permissions For A User
**Mendapatkan `permissions` untuk `User`**: Trait `HasRoles` menambahkan relasi Eloquent ke model Anda, yang dapat diakses secara langsung atau digunakan sebagai _query_ dasar.
```php
// get a list of all permissions directly assigned to the user
$permissionNames = $user->getPermissionNames(); // collection of name strings
$permissions = $user->permissions; // collection of permission objects

// get all permissions for the user, either directly, or from roles, or from both
$permissions = $user->getDirectPermissions();
$permissions = $user->getPermissionsViaRoles();
$permissions = $user->getAllPermissions();

// get the names of the user's roles
$roles = $user->getRoleNames(); // Returns a collection
```

### Scopes
**Cakupan**: Trait `HasRoles` juga menambahkan cakupan `role` dan `withoutRole` ke model Anda untuk membatasi _query_ ke `roles` atau `permissions` tertentu.
```php
$writerUsers = User::role('writer')->get(); // Returns only users with the role 'writer'
$nonEditorUsers = User::withoutRole('editor')->get(); // Returns only users without the role 'editor'
```

Cakupan `role` dan `withoutRole` dapat menerima `string`, object `\Spatie\Permission\Models\Role`, atau object `\Illuminate\Support\Collection`.

Trait yang sama juga menambahkan cakupan hanya untuk get users yang memiliki atau tidak memiliki `permissions` tertentu.
```php
$users = User::permission('edit articles')->get(); // Returns only users with the permission 'edit articles' (inherited or directly)
$usersWhoCannotEditArticles = User::withoutPermission('edit articles')->get(); // Returns all users without the permission 'edit articles' (inherited or directly)
```

The scope can accept a string, a `\Spatie\Permission\Models\Permission` object or an `\Illuminate\Support\Collection` object.

### Eloquent Calls
**Panggilan Eloquent**: Karena model `Role` dan `Permission` extended dari model Eloquent, Eloquent Calls dasar juga dapat digunakan.
```php
$all_users_with_all_their_roles = User::with('roles')->get();
$all_users_with_all_their_direct_permissions = User::with('permissions')->get();
$all_roles_in_database = Role::all()->pluck('name');
$users_without_any_roles = User::doesntHave('roles')->get();
$all_roles_except_a_and_b = Role::whereNotIn('name', ['role A', 'role B'])->get();
```
### Counting Users Having A Role
**Menghitung `User` yang Memiliki `roles`**: Salah satu cara untuk menghitung semua _user_ yang memiliki suatu `roles` adalah dengan menyaring collection semua _user_ dengan `roles` mereka:
```php
$superAdminCount = User::with('roles')->get()->filter(
    fn ($user) => $user->roles->where('name', 'Super Admin')->toArray()
)->count();
```


## Best-Practice

### Roles vs Permissions

Ini adalah panduan praktik terbaik untuk memahami perbedaan antara Peran (Roles) dan Izin (Permissions):

- **Peran (Roles)**:
    - `Role` adalah sekelompok `Permission` yang diberikan kepada `User`.
    - Mereka digunakan untuk "mengelompokkan" `User` berdasarkan "set `Permission`" tertentu.
    - Ini memberikan gambaran umum tentang apa yang dapat dilakukan oleh sekelompok `User` tertentu.
- **Izin (Permissions)**:
    - `Permission` adalah hak akses yang spesifik untuk fitur atau tindakan (action) tertentu.
    - `Permission` **sebaiknya** ditetapkan ke `Role`, **"bukan langsung"** ke `User`.
    - Semakin terperinci dan deskriptif `name` `Permission` (izin seperti `view document` dan `edit document` ), semakin mudah mengontrol akses dalam aplikasi.
- **Pengguna (Users)**:
    - `User` **sebaiknya jangan diberikan** `Permission` secara langsung.
    - Lebih baik jika `User` mewarisi `Permission` melalui `Role` yang ditetapkan kepada mereka.
- **Penggunaan `@can` atau `can()` Directive**:
    - **Selalu gunakan directive blade `@can` dan `can()`  bawaan Laravel**, dengan begitu Anda dapat memeriksa `User Permission` di seluruh aplikasi.
    - Ini memungkinkan layer `Gate` Laravel untuk menangani sebagian besar pekerjaan beratnya.
    - Menguji `Permission` secara langsung dengan `@can` dan `can()` lebih aman daripada menguji `Role` langsung dengan `$user->hasRole('Role')`.
    - **Lebih Aman untuk Menggunakan Permission Daripada Role**:
	    - Lebih aman jika tampilan (Views) Anda memeriksa _permission_ khusus seperti `@can('view member addresses')` atau `@can('edit document')`, bukan menguji langsung _role user_ dengan `$user->hasRole('Editor')`.
	    - Ini karena memeriksa _permission_ memberi tingkat kontrol yang lebih spesifik.
	- **Kontrol Tampilan Konten vs Tombol Edit/Hapus**:
		- Dengan menggunakan _permission_ terpisah seperti "`view document`" dan "`edit document`", Anda dapat lebih mudah mengontrol bagaimana konten ditampilkan dan tombol edit/hapus diperlihatkan.
	    - Misalnya, jika sebuah user memiliki _permission_ "view document" tetapi tidak "edit document", Anda dapat menampilkan konten dokumen tersebut tetapi tidak menampilkan tombol untuk mengedit atau menghapus dokumen tersebut.
	- **_Role_ Penulis**:
	    - Dalam contoh tersebut, _role_ "Penulis" (Writer) akan diberikan kedua _permission_ "view" dan "edit".
	    - Ini berarti _user_ yang memiliki _role_ "Penulis" akan memiliki kemampuan untuk melihat dan mengedit dokumen.
	- **User Mendapatkan _role_ Penulis**:
	    - Kemudian, _user_ akan diberikan _role_ "Penulis" (Writer), yang berarti mereka akan mewarisi _permission_ "view" dan "edit" yang terkait dengan _role_ tersebut.
	    - Dengan cara ini, Anda dapat mengatur _permission_ dengan lebih fleksibel, di mana _user_ dapat diberikan _role_ yang sesuai dengan tugas atau tanggung jawab mereka dalam aplikasi.
- **Ringkasan**:
    - **users** memiliki `Roles`.
    - **roles** memiliki `Permissions`.
    - Aplikasi selalu memeriksa izin (sebanyak mungkin), bukan `roles`.
    - **views** check `permission-names`
    - **policies** (kebijakan) check `permission-names`
    - **model policies** check `permission-names`
    - **controller methods** check `permission-names`
    - **middleware** check `permission-names`, atau kadang-kadang `role-names`
    - **routes** check `permission-names`, atau mungkin `role-names` jika Anda perlu membuat kode seperti itu.

Terkadang kelompok aturan `route` tertentu mungkin lebih masuk akal untuk mengelompokkannya berdasarkan `role`, namun tetap saja, jika memungkinkan, biaya overhead yang digunakan akan lebih sedikit jika Anda dapat memeriksa `permission` tertentu.
## Membuat Policy Role dan Permission

### Role

```bash
php artisan make:policy RolePolicy --model=Role
```

```php title="app\Policies\RolePolicy.php"
<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;
use Spatie\Permission\Models\Role;

class RolePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->isSuperAdmin();
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Role $role): bool
    {
        return $user->isSuperAdmin();
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->isSuperAdmin();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Role $role): bool
    {
        return $user->isSuperAdmin();
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Role $role): bool
    {
        return $user->isSuperAdmin();
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Role $role): bool
    {
        return $user->isSuperAdmin();
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Role $role): bool
    {
        return $user->isSuperAdmin();
    }
}

```

---
## Permission

```bash
php artisan make:policy PermissionPolicy --model=Permission
```

```php title="app\Policies\PermissionPolicy.php"
<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;
use Spatie\Permission\Models\Permission;

class PermissionPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->isSuperAdmin();
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Permission $permission): bool
    {
        return $user->isSuperAdmin();
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->isSuperAdmin();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Permission $permission): bool
    {
        return $user->isSuperAdmin();
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Permission $permission): bool
    {
        return $user->isSuperAdmin();
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Permission $permission): bool
    {
        return $user->isSuperAdmin();
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Permission $permission): bool
    {
        return $user->isSuperAdmin();
    }
}
```

---
### AuthServiceProvider

Tambahkan pengaturan `$policies` pada `AuthServiceProvider.php` supaya terhubung antara `RolePolicy.php` dengan model yang ada pada spatie `Role.php`.

```php title="app\Providers\AuthServiceProvider.php"
<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        \Spatie\Permission\Models\Role::class => \App\Policies\RolePolicy::class,
        \Spatie\Permission\Models\Permission::class => \App\Policies\PermissionPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
	    // Harus ada trait HasSuperAdmin pada model User.php (package terpisah)
        Gate::before(function (User $user, string $ability) {
            return $user->isSuperAdmin() ? true : null;
        });
        
        // Melakukan logging perintah query ke database
        // storage\logs\laravel.log
        DB::listen(function ($query) {
            Log::info("Query : {$query->sql}");
        });
    }
}
```

