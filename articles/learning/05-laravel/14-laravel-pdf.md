# Laravel PDF

Package yang bisa membuat PDF:
- [spatie/laravel-pdf](https://github.com/spatie/laravel-pdf) with chromium browsershot. 
	- bisa menggunakan tailwindcss.
- [barryvdh/laravel-dompdf](https://github.com/barryvdh/laravel-dompdf) 
	- Harus menggunakan css murni.


## barryvdh/laravel-dompdf

```bash
composer require barryvdh/laravel-dompdf
```

Issue: public image dompdf not loaded (Laravel)
Solution: gunakan kode berikut pada attribute src
```blade
data:image/png;base64,{{ base64_encode(file_get_contents(public_path('your image path'))) }}
```