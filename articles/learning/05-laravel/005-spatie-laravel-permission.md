# Spatie/laravel-permission

```bash
composer require spatie/laravel-permission
```

```bash
php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"
```

```bash
php artisan make:seeder RoleSeeder
```

```bash
php artisan make:seeder PermissionSeeder
```


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

