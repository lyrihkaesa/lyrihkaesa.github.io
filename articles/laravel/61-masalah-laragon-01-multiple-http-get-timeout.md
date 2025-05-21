# Kenapa saat menggunakan `Http::get()` dua kali, selalu mendapatkan timeout?
- Diskusi form discord [PZN](https://discord.com/channels/769745495206920212/1278955054128173170).

Saat menggunakan `laragon v6.0.0` dan `nginx v1.24.0`, mendapatkan error jika memanggil facade `Http::get()` dua kali.

```php title="/route/web.php"
use Illuminate\Support\Facades\Http;

Route::get('/usr', function () {
    $apiUrl = "http://example.test";
    $token = "19c5b0ee-example-random-uuid-string";

    $users = Http::get("{$apiUrl}/api/v1/users", [
        'token' => $token
    ]);

    $user = Http::get("{$apiUrl}/api/v1/users/USR0001", [
        'token' => $token
    ]);
    
    dd($users, $user);

    return [
        'users' => $users["data"],
        'user' => $user["data"],
    ];
});
```

Error dimana `$apiUrl = "http://example.test"`, error saat memanggil `/api/v1/users/USR001`:
```txt
cURL error 28: Operation timed out after 30013 milliseconds with 0 bytes received (see https://curl.haxx.se/libcurl/c/libcurl-errors.html) for http://example.test/api/v1/users/USR0001?token=19c5b0ee-example-random-uuid-string
```

Error dimana `$apiUrl = "https://example.test"`, error saat memanggil `/api/v1/users`, ini karena menggunakan `https`:
```txt
cURL error 60: SSL certificate problem: self-signed certificate (see https://curl.haxx.se/libcurl/c/libcurl-errors.html) for https://example.test/api/v1/users?token=19c5b0ee-example-random-uuid-string
```

Tidak error jika menggunakan perintah berikut, pada API Server Local:
```bash
php artisan serve
```
Dimana apinya dijalankan pada `http://localhost:8000`, saat dipanggil `Http::get("http://localhost:8000/api/v1/users")` dan `Http::get("http://localhost:8000/api/v1/users/USR0001")`, tidak muncul error time out ataupun `ssl certificate` karena bukan `https`.

Lancar jaya, jika menggunakan `$apiUrl = "http://localhost:8000"`.

Jadi saya coba lagi, ingin bisa `https` dan menggunakan domain `.test` menggunakan [Laravel Herd](https://herd.laravel.com/windows) dan bekerja dengan baik, saat memanggil `Http::get("http://localhost:8000/api/v1/users")` dan `Http::get("http://localhost:8000/api/v1/users/USR0001")`.