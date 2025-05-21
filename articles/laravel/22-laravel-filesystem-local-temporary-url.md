# Laravel Filesystem local storage `temporaryUrl()`

## Above Laravel  [`v11.23`](https://github.com/laravel/framework/tree/v11.23.0)
- `config/filesystems.php`
```php
'local' => [
    'driver' => 'local',
    'root' => storage_path('app'),
    'serve' => true, # Change this to true if it's false in your case (add it line if it's not there)
    'throw' => false,
],
```
## Before Laravel  [`v11.23`](https://github.com/laravel/framework/tree/v11.23.0)

- `app\Providers\AppServiceProvider.php`
```php
 if (! ($this->app instanceof \Illuminate\Contracts\Foundation\CachesRoutes && $this->app->routesAreCached())) {
            \Illuminate\Support\Facades\Route::get('local/temp/{path}', function (string $path): \Symfony\Component\HttpFoundation\StreamedResponse {
                /** @var \Illuminate\Filesystem\FilesystemAdapter $disk */
                $disk = \Illuminate\Support\Facades\Storage::disk('local');

                return $disk->download($path);
            })
                ->where('path', '.*')
                ->name('local.temp')
                ->middleware(['web', 'signed']);
        }

        /** @var \Illuminate\Filesystem\FilesystemAdapter $disk */
        $disk = \Illuminate\Support\Facades\Storage::disk('local');
        $disk->buildTemporaryUrlsUsing(
            function (string $path, \DateTimeInterface $expiration, array $options = []) {
                return URL::temporarySignedRoute(
                    'local.temp',
                    $expiration,
                    array_merge($options, ['path' => $path])
                );
            }
        );
```
## Menggunakan Proxy Server seperti `Nginx Proxy Manager`
Jika menggunakan `Nginx Proxy Manager` atau proxy server perlu ubah:
- `app\Http\Middleware\TrustProxies.php`

```php
<?php

namespace App\Http\Middleware;

use Illuminate\Http\Middleware\TrustProxies as Middleware;
use Illuminate\Http\Request;

class TrustProxies extends Middleware
{
    /**
     * The trusted proxies for this application.
     *
     * @var array<int, string>|string|null
     */
    // protected $proxies; // Default
    protected $proxies = '*'; // All proxy allowed using willcard
    // Best partice using ip address proxy server like nginx proxy manager
    // protected $proxies = ['90.90.90.90', '127.0.0.1']; // example

    /**
     * The headers that should be used to detect proxies.
     *
     * @var int
     */
    protected $headers =
    Request::HEADER_X_FORWARDED_FOR |
        Request::HEADER_X_FORWARDED_HOST |
        Request::HEADER_X_FORWARDED_PORT |
        Request::HEADER_X_FORWARDED_PROTO |
        Request::HEADER_X_FORWARDED_AWS_ELB;
}

```


Cara menggunakan:
```php
echo \Illuminate\Support\Facades\Storage::temporaryUrl('private-folder/image-private-name.jpg', now()->addMinutes(30));
```

```php
echo \Illuminate\Support\Facades\Storage::disk('local')->temporaryUrl('private-folder/image-private-name.jpg', now()->addMinutes(30));
```

```php
/** @var \Illuminate\Filesystem\FilesystemAdapter $disk */
$disk = \Illuminate\Support\Facades\Storage::disk('local');

echo $disk->temporaryUrl('private-folder/image-private-name.jpg', now()->addMinutes(30));
```