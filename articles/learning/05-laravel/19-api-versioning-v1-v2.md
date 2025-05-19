# Api Versioning, v1, v2

- `app\Providers\RouteServiceProvider.php`
```php
<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    public const HOME = '/';

    public function boot(): void
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });

        $this->routes(function () {
            Route::middleware('api')
                // ->prefix('api')
                // ->group(base_path('routes/api.php'));
                ->prefix('api/v1')
                ->group(base_path('routes/api_v1.php'));

			// Tambahkan versi api disini:
            Route::middleware('api')
                ->prefix('api/v2')
                ->group(base_path('routes/api_v2.php'));
                
            Route::middleware('web')
                ->group(base_path('routes/web.php'));
        });
    }
}
```

```bash
php artisan make:controller Api/V1/ProjectController
```
## Laravel 11

## Sumber
- Laravel 11: 
	- https://www.youtube.com/watch?v=Tl_BbMDg-2o
- https://medium.com/@laravelprotips/understanding-laravel-api-versioning-the-basics-of-v1-v2-db3fdd3067bc


```json
{
  "message": "List todo berhasil diambil",
  "data": [
    {
      "id": 1,
      "title": "Review kontrak klien",
      "description": "Periksa pasal pembayaran dan termin",
      "category": "urgent",
      "status": "pending_approval",
      "created_by": {
        "id": 3,
        "name": "John Doe",
        "role": "Level 3"
      },
      "approvals": [
        {
          "level": 4,
          "status": "pending",
          "approver": {
            "id": 5,
            "name": "Sarah Manager"
          }
        }
      ],
      "permissions": {
        "can_edit": true,
        "can_delete": true,
        "can_approve": false,
        "can_publish": false
      },
      "links": {
        "self": "/api/todos/1",
        "approve": "/api/todos/1/approve",
        "delete": "/api/todos/1"
      }
    },
    {
      "id": 2,
      "title": "Siapkan laporan bulanan",
      "description": "Kumpulkan data penjualan dan pemasukan",
      "category": "normal",
      "status": "approved",
      "created_by": {
        "id": 4,
        "name": "Jane Smith",
        "role": "Level 2"
      },
      "approvals": [
        {
          "level": 3,
          "status": "approved",
          "approver": {
            "id": 6,
            "name": "Mark Supervisor"
          }
        }
      ],
      "permissions": {
        "can_edit": false,
        "can_delete": false,
        "can_approve": true,
        "can_publish": true
      },
      "links": {
        "self": "/api/todos/2",
        "approve": "/api/todos/2/approve",
        "delete": "/api/todos/2"
      }
    }
  ],
  "meta": {
    "pagination": {
      "current_page": 1,
      "total_pages": 3,
      "per_page": 15,
      "total_items": 35
    },
    "permissions": {
      "can_create_todo": true
    }
  }
}
```

```json
{
  "message": "Terjadi kesalahan: Data tidak valid",
  "errors": {
    "title": [
	    "Field title wajib diisi."
	],
    "description": [
	    "Field description minimal 10 karakter."
	]
  }
}
```

```json
{
  "message": "Internal server error",
  "errors": null
}
```