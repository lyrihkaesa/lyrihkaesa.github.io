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
