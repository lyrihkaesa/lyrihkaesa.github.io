# Laravel Eloquent

```bash
php artisan migrate:rollback // kembali ke migrasi satu step sebelumnya
```

```shell
php artisan migrate:rollback && php artisan migrate && php artisan db:seed --class=AcademicYearSeeder && php artisan db:seed --class=SchoolSeeder
```

```bash
php artisan migrate:rollback && php artisan migrate && php artisan db:seed --class=ProductSeeder
```
