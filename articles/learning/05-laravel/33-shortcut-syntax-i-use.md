# Shortcut Syntax I Use


## `to_route()`

```php
final class PostController
{
	public function create(CreatePostRequest $request, CreatePostAction $action): RedirectResponse
	{
		$action->handle($request->validated());
		
		// ❌ before: 
		// return redirect()->route('posts.index'); 
		// ✅ after:
		return to_route('posts.index');
	}
}
```


## Gunakan `$request->user()` daripada `auth()->user()`

Jika bisa gunakan `$request->user()` daripada facade `auth()->user()` karena supaya elegant, pada `Controller` `web` ataupun `api`.



Biar cepat ajalah. Ini jawabannya.

Laravel 11 `auth()->user()` itu merah karena perubahan pada PHP DocBlocks di _function_ `auth()`-nya.

```php
    /**
     * Get the available auth instance.
     *
     * @param  string|null  $guard
     * @return ($guard is null ? \Illuminate\Contracts\Auth\Factory : \Illuminate\Contracts\Auth\StatefulGuard)
     */
    function auth($guard = null)
    {
        if (is_null($guard)) {
            return app(AuthFactory::class);
        }

        return app(AuthFactory::class)->guard($guard);
    }
```

Perubahannya dapat dilihat pada tautan berikut:
https://github.com/laravel/framework/commit/5d006a562c6a2bb6f73c77491ee59117a103217d#diff-6a2323fa8736e9d453a642748f40d503d69e17a5b9ea944a57e45b271870be75R155-R170

Jadi agar dia gak merah, kamu kasi aja nama _guard_-nya.
Contoh:
```php
$user = auth('web')->user();
```


ini semua _command_ yang aku jalankan setiap kali memperbaharui aplikasi Laravel yang terdapat pada server _production_:

```bash
cd www/my-project/
git pull

```

```bash
# If you have any changes in the database
# php artisan migrate

```

```bash
php artisan cache:clear
php artisan optimize:clear

composer install --optimize-autoloader --no-dev

```

```bash
# if you have any changes in the frontend
# npm ci
# npm run build

```

```bash
php artisan config:cache
php artisan event:cache
php artisan route:cache
php artisan view:cache
php artisan optimize

php artisan queue:restart

```