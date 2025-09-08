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


### Menganotasi Eloquent Builder Kustom untuk Peningkatan Tipe Data

Saat bekerja dengan model Eloquent di Laravel, menyesuaikan *query builder* dapat sangat meningkatkan keterbacaan dan fleksibilitas kode. Namun, menjaga keamanan tipe data dan menyediakan *autocompletion* yang akurat di IDE (seperti PHPStorm atau VSCode) bisa jadi menantang, terutama ketika berhadapan dengan *builder* kustom. Untungnya, anotasi **`@template-extends`** dapat membantu menyediakan analisis statis dan petunjuk tipe yang lebih baik untuk kode Anda. Dalam pembahasan ini, kita akan mendiskusikan cara menganotasi *Eloquent Builder* kustom dengan benar menggunakan *docstring* `@template-extends`.

#### Apa itu Eloquent Builder Kustom?

Dalam Laravel, *Eloquent query builder* adalah alat inti untuk berinteraksi dengan basis data melalui model Anda. Terkadang, Anda mungkin ingin memperluas fungsionalitasnya dengan membuat metode kustom yang berlaku untuk model tertentu. Misalnya, Anda mungkin memiliki model **`Customer`** dengan *builder* kustom yang menyertakan cakupan kueri atau filter tertentu.

Mari kita ambil contoh model **`Customer`** berikut:

```php
class Customer extends Model
{
    protected $table = 'customers';

    // Menghubungkan model ke builder kustom
    public function newEloquentBuilder($query): CustomerBuilder
    {
        return new CustomerBuilder($query);
    }
}
```

Sekarang, mari kita buat kelas **`CustomerBuilder`** kustom di mana Anda dapat menentukan metode kueri kustom:

```php
use Illuminate\Database\Eloquent\Builder;

class CustomerBuilder extends Builder
{
    public function active()
    {
        return $this->where('status', 'active');
    }

    public function hasRole(string $role)
    {
        return $this->where('role', $role);
    }
}
```

#### Masalah: Petunjuk Tipe dan Autocompletion yang Tepat

Saat menggunakan *builder* kustom ini, IDE Anda mungkin tidak dapat menyimpulkan tipe yang benar untuk **`CustomerBuilder`** dan akan kembali ke `Builder` yang generik. Ini menyebabkan kurangnya *autocompletion* untuk metode kustom seperti `active()` atau `hasRole()`. Selain itu, alat analisis statis (seperti **PHPStan** atau **Psalm**) mungkin kesulitan dengan inferensi tipe saat merangkai kueri Eloquent.

Untuk mengatasi ini, kita dapat menggunakan anotasi **`@template`** dan **`@extends`** dari PHP.

-----

### Peran `@template-extends`

Untuk meningkatkan inferensi tipe, kita menggunakan anotasi `@template` dan `@extends` untuk menentukan bahwa *builder* kustom kita memperluas `Builder` dasar tetapi terikat pada model **`Customer`**.

Berikut adalah cara Anda dapat menganotasi kelas **`CustomerBuilder`**:

```php
use Illuminate\Database\Eloquent\Builder;

/**
 * @template-extends Builder<Customer>
 */
class CustomerBuilder extends Builder
{
    /**
     * @return static
     */
    public function active()
    {
        return $this->where('status', 'active');
    }

    /**
     * @param string $role
     * @return static
     */
    public function hasRole(string $role)
    {
        return $this->where('role', $role);
    }
}
```

Dalam contoh ini:

  * **`@template-extends Builder<Customer>`** memberi tahu *static analyzer* bahwa *builder* ini beroperasi pada tipe model `Customer` dan memperjelas bahwa `CustomerBuilder` memperluas kelas `Builder` Laravel tetapi terikat pada model `Customer`.
  * **`@return static`** memastikan bahwa metode mengembalikan instance dari kelas yang sama, yang sangat penting untuk **rantai metode** (*method chaining*).

#### Menetapkan `@template-extends` pada Model

Setelah kita menganotasi *builder* kita, kita juga perlu memastikan model diberi petunjuk tipe dengan benar saat menggunakan *builder* ini. Berikut cara kita menganotasi model **`Customer`**:

```php
use Eloquent;

/**
 * @method static CustomerBuilder|static query()
 * @method CustomerBuilder newQuery()
 * @mixin Eloquent
 */
class Customer extends Model
{
    protected $table = 'customers';

    public function newEloquentBuilder($query): CustomerBuilder
    {
        return new CustomerBuilder($query);
    }
}
```

  * Anotasi **`@method static CustomerBuilder|static query()`** menginformasikan *static analyzer* bahwa ketika kita memanggil metode `query()`, kita harus mengharapkan `CustomerBuilder`.
  * Metode `newEloquentBuilder()` ditimpa (*overridden*) untuk mengembalikan *builder* kustom kita, membuat koneksi antara model dan *builder*.

-----

#### Mengapa Menggunakan `@template-extends Builder<Customer>`?

Menggunakan `@template-extends Builder<Customer>` memastikan bahwa:

  * **Dukungan IDE yang Lebih Baik:** IDE Anda sekarang dapat menyediakan *autocompletion* untuk metode seperti `active()` dan `hasRole()` saat Anda bekerja dengan `Customer::query()` atau `$customer->newQuery()`.
  * **Peningkatan Analisis Statis:** Alat seperti **PHPStan** atau **Psalm** dapat melakukan pemeriksaan tipe yang lebih baik, menangkap potensi bug lebih awal dalam proses pengembangan.
  * **Kode Lebih Bersih:** Dengan memberi petunjuk tipe yang benar pada *builder* Anda, Anda menghindari kebutuhan untuk secara manual *casting* atau menebak-nebak tipe dalam kode Anda, membuatnya lebih mudah untuk dikelola.