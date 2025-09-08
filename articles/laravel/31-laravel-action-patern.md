# Laravel Action Pattern: Arsitektur Ringkas dan Terstruktur untuk Aplikasi Modern

Action Pattern di Laravel adalah pola yang memisahkan setiap aksi tunggal ke dalam satu class terpisah. Pola ini sangat berguna dalam menjaga Single Responsibility Principle dan memudahkan pengujian, perawatan, serta integrasi di berbagai konteks seperti controller, command, hingga Filament Admin.

Pola **Action** adalah konsep untuk memisahkan logika bisnis ke dalam kelas tersendiri yang hanya melakukan satu tugas. Laravel tidak menyediakan perintah Artisan khusus seperti `make:action`, namun kita bisa membuat kelas action secara manual menggunakan `make:class`. Misalnya:

```bash
php artisan make:class Actions/CreatePostAction
```

Perintah di atas akan menghasilkan file `app/Actions/CreatePostAction.php` dengan namespace `App\Actions`. Dengan pola ini, setiap operasi aplikasi (misalnya membuat post, menghapus post, dll.) memiliki kelas khususnya sendiri. Laravel Action classes adalah _mini services_ yang memisahkan setiap aksi satu per satu (prinsip Single Responsibility) dan membuat kode lebih bersih. Pendekatan ini membuat controller dan model tetap ringkas dan terstruktur. 




Action biasanya terdiri dari:
- `Create` -> `CreatePostAction`
- `Update` -> `UpdatePostAction`
- `Delete` -> `DeletePostAction`
Custom Action:
- `Publish` -> `PublishPostAction`

---

## 📦 Struktur Folder dan File

Atur folder `app/Actions/` berdasarkan domain logika:

```tree
app/Actions/
├── Authentication/
│   └── LoginAction.php
├── Posts/
│   ├── CreatePostAction.php
│   ├── UpdatePostAction.php
│   ├── DeletePostAction.php
│   ├── PublishPostAction.php
│   └── ApprovePostAction.php
└── Users/
    └── UpdateUserProfileAction.php
```

Jika `Action` class tidak `extens` class apapun, sebaiknya tambahkan keyword `final` seperti:
```php
final class CreatePostAction
{
	// ...
	public function handle(array $data): Post
	{
		//
	}
}
```

Nama Method atau Function yang dipanggil pada Action class. Bebas memilih, yang terpenting konsistensi penamaan method/function.
- `handle()` Saya merekomendasikan ini, dan @nunomaduro juga merekomendasikan ini.
- `execute()`
- `__invoke()` ini salah satu  [magic method/function php](https://www.php.net/manual/en/language.oop5.magic.php#object.invoke) metode dipanggil saat skrip mencoba memanggil objek sebagai fungsi.  
```php
<?php
class CallableClass
{
    public function __invoke($x)
    {
        var_dump($x);
    }
}
$obj = new CallableClass;
$obj(5); // result: 5
var_dump(is_callable($obj)); // result: true
?>

```


---
## Contoh Implementasi CRUD

Berikut contoh kode kelas action untuk fitur CRUD _blog post_. Kita membuat `CreatePostAction`, `UpdatePostAction`, dan `DeletePostAction`. Masing-masing memiliki satu metode publik (`execute` atau `handle`) yang melakukan operasi database. Setiap operasi dikemas dalam transaksi database untuk integritas data.

- Create
```php
<?php

namespace App\Actions;

use App\Models\Post;
use Illuminate\Support\Facades\DB;

final class CreatePostAction
{
    /**
     * Buat post baru di DB.
     *
     * @param  array<string,mixed>  $data
     */
    public function handle(array $data): Post
    {
        return DB::transaction(function () use ($data) {
            return Post::create([
                'title'     => $data['title'],
                'content'   => $data['content'],
                'author_id' => $data['author_id'],
            ]);
        });
    }
}
```

- Update
```php
<?php

namespace App\Actions;

use App\Models\Post;
use Illuminate\Support\Facades\DB;

final class UpdatePostAction
{
    /**
     * Update data post.
     *
     * @param  Post  $post
     * @param  array<string,mixed>  $data
     */
    public function handle(Post $post, array $data): Post
    {
        return DB::transaction(function () use ($post, $data) {
            $post->update($data);
            return $post;
        });
    }
}
```

- Delete
```php
<?php

namespace App\Actions;

use App\Models\Post;
use Illuminate\Support\Facades\DB;

final class DeletePostAction
{
    /**
     * Hapus post.
     *
     * @param  Post  $post
     * @return void
     */
    public function handle(Post $post): void
    {
        DB::transaction(function () use ($post) {
            $post->delete();
        });
    }
}
```

Penjelasan:
- Setiap `Action` menggunakan namespace `App\Actions` dan disimpan di folder `app/Actions` sesuai struktur di atas.
- Metode utama dinamakan `handle()` (bisa juga `execute()`) yang menerima parameter diperlukan. Misalnya `UpdatePostAction` menerima objek `Post` dan array data.
- Semua operasi database dibungkus `DB::transaction(...)` agar jika terjadi kegagalan, perubahan dibatalkan otomatis.
- Hasil operasi (misal instance `Post`) dikembalikan agar controller dapat melanjutkan logika (misal menampilkan atau redirect).

---
## Memanggil Action di Controller

Pada controller, kita cukup memanggil kelas Action tersebut, misalnya melalui _dependency injection_. Contoh di bawah menggunakan injeksi langsung ke method controller (action kelas akan di-_resolve_ oleh container Laravel).

```php
<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Actions\CreatePostAction;
use App\Actions\UpdatePostAction;
use App\Actions\DeletePostAction;
use App\Models\Post;

class PostController extends Controller
{
    public function store(StorePostRequest $request, CreatePostAction $action): RedirectResponse
    {
        // Data sudah tervalidasi di StorePostRequest
        $post = $action->handle($request->validated());
        
        return to_route('posts.edit', $post);
    }

    public function update(UpdatePostRequest $request, Post $post, UpdatePostAction $action)
    {
        $post = $action->handle($post, $request->validated());
        
        return to_route('posts.show', $post);
    }

    public function destroy(Request $request, Post $post, DeletePostAction $action)
    {
	    $request->user()->can('delete', $post);
	    
        $action->handle($post);
        
        return to_route('posts.index');
    }
}
```

Penjelasan:
- Controller hanya menangani HTTP layer (menerima `Request`, melakukan redirect). Logika simpan/update/hapus didelegasikan ke kelas action.
- Perhatikan `StorePostRequest` dan `UpdatePostRequest` sudah melakukan validasi. Data bersih hasil validasi (`$request->validated()`) langsung diberikan ke action.
- Injeksi `CreatePostAction $action` dll. secara otomatis di-_resolve_ oleh Laravel. Cara lain, kita bisa instansiasi manual: `(new CreatePostAction())->handle(...)`. Namun, injeksi memudahkan pengujian dan membaca kode.

---
## Praktik Terbaik

- **Hindari penggunaan facade `auth()` di dalam Action:** Sebaiknya user atau data kontekstual lain disalurkan melalui parameter atau di-_inject_ lewat konstruktor. Dengan begitu action tidak tergantung pada state global dan lebih mudah diuji.
- **Validasi di FormRequest:** Seluruh logika validasi tetap dilakukan di _FormRequest_ (`StorePostRequest`, `UpdatePostRequest`, dll.), bukan di dalam action. Action hanya menerima data yang sudah terverifikasi.
- **Otorisasi di FormRequest:** Gunakan metode `authorize()` di `FormRequest` untuk memeriksa izin akses. Laravel menyediakan mekanisme ini agar otorisasi terpisah dari logika bisnis. Contohnya, kita bisa mengecek apakah user berhak melakukan aksi tertentu sebelum request diproses.
- **Gunakan transaksi database di dalam Action:** Seperti contoh di atas, jika operasi action melibatkan banyak perubahan DB, bungkus dengan `DB::transaction()` untuk menjaga konsistensi data.
- **Gunakan PHPDoc untuk hint tipe array:** Pada method action yang menerima array (misal `array $data`), sertakan komentar PHPDoc `@param array<string,mixed> $data` atau yang sesuai. Ini membantu IDE dan pembaca memahami struktur data yang diharapkan.

---
## Passing data `Auth User` pada Action

Jangan gunakan facade `auth()` didalam action, sebaiknya gunakan parameter saja supaya mudah di uji. Contoh:

- ❌ Menggunakan `auth()` facade pada action
```php
final class CreatePostAction
{
	public function handle(array $data): Post
	{
		$data['author_id'] = auth()->user()->id;
		
		return Post::create($data);
	}
}
```

```php
final class PostController
{
	public function create(CreatePostRequest $request, CreatePostAction $action): RedirectResponse
	{
		$action->handle($request->validated());
		
		return to_route('posts.index');
	}
}
```

- ✅ Passing user login dengan parameter

```php
final class CreatePostAction
{
	public function handle(User $user, array $data): Post
	{
		$data['author_id'] = $user->id;
		
		return Post::create($data);
	}
}
```

```php
final class PostController
{
	public function create(CreatePostRequest $request, CreatePostAction $action): RedirectResponse
	{
		$action->handle($request->user(), $request->validated());
		
		return to_route('posts.index');
	}
}
```

---

## Validation Rule pada Action

Didalam action jangan ada `validation rule`, sebaiknya anda gunakan `validation rule` pada `FormRequest` seperti `CreatePostRequest`. Tujuannya agar action dapat dipakai dimana saja tanpa validation rule misalnya di console command, dimana yang pakai command biasanya developer itu sendiri. dan `validation rule` biasanya ada di `Controller` untuk `web` dan `api`.

---

## Policy and Gate Authorization pada Action

Didalam action jangan ada policy atau gate, karena action itu sendiri bisa dijalankan sendiri tanpa pengecekan policy / gate, untuk meletakkan gate itu tugasnya `FormRequest` yang nantinya dipakai oleh `Controller` untuk `web` ataupun `api`. Jadi saat menjalankan action pada command itu tidak ada halangan dari gate.

Sebaiknya gunakan policy/gate pada fungsi `authorize()` pada `FormRequest` , alasannya agar fungsi `rule()` pada `FormRequest` tidak dijalankan jika policy/gatenya tidak valid. Jadi hemat resource, jadi jika sudah menggunakan FormRequest sebaiknya taruh policy/gate di method `authorize()` daripada anda validasi di controller lalu memanggil FormRequest -> $request->validated().

---

## Gunakan Database Transaction pada Action

Pada action kalau bisa gunakan database transaction supaya saat action tersebut dipanggil di action lain jika salah satu gagal maka bisa di rollback.

---

## Gunakan `PHPDoc` pada paramter `array $data` untuk type safety di Action

Jika anda tidak menggunakan pattern DTO atau Data Transfer Object  sebaiknya anda manfaatkan `PHPDoc` untuk membuat `larastan` atau `phpstan` tidak komplain dan membantu autosugestion IDE anda, biasnaya action saya ada paramter `array $data`, nah anda bisa mendefinisikan apa isi dari `array $data`  tersebut dengan `PHPDoc`.

---

## Intregasi Action Laravel dengan Filament Action (Depedency Injection)

Karena action yang dibuat tidak tergantung dengan policy / gate, validation rule, maka anda bisa memanfaatkan Action Laravel yang anda buat didalam Filament Resource ataupun Action.
Anda bisa overwrite method Pada Filament Resource dan Action seperti controller.

Disini saya akan membahas apa saja method yang perlu di overwrite atau di inject dengan Action Laravel yang anda buat. Jadi ini membahas Dependency Injection Action Laravel ke Filament Action.

Jika menggunakan Filament Admin, pola action dapat diintegrasikan di halaman resource. Misalnya pada halaman **CreateRecord** dan **EditRecord** di Filament: secara default Filament melakukan operasi _create/update_ model secara langsung. Kita dapat menyesuaikannya dengan mengganti proses penyimpanan menggunakan metode `handleRecordCreation()` atau `handleRecordUpdate()`.
### `CreateModelAction` -> `CreateRecord`

Anda bisa memodifikasi pada page yang extends `CreateRecord` , misal `CreatePost` atau jika anda ingin menggunakan modal, anda harus overwrite pada `CreateAction` filament menggunakan method `->using()`.

```php
use Filament\Resources\Pages\CreateRecord;

class CreatePost extends CreateRecord
{
    protected function handleRecordCreation(array $data, CreatePostAction $action): Post
    {
        // Panggil CreatePostAction alih-alih create langsung
        return $action->handle($data);
    }
}
```
### `UpdateModelAction` -> `EditRecord`

Anda bisa memodifikasi pada page yang extends `EditRecord` , misal `EditPost` atau jika anda ingin menggunakan modal, anda harus overwrite pada `CreateAction` filament menggunakan method `->using()`.

```php
use Filament\Resources\Pages\EditRecord;
use Illuminate\Database\Eloquent\Model;
use Filament\Notifications\Notification;

class EditPost extends EditRecord
{
    protected function handleRecordUpdate(Model $record, array $data, UpdatePostAction $action): Model
    {
        // Panggil UpdatePostAction
        return $action->handle($record, $data);
    }

    protected function getActions(): array
    {
        return [
            // Tombol aksi kustom, misal "Publish"
            \Filament\Pages\Actions\Action::make('publish')->action('publish'),
            \Filament\Pages\Actions\DeleteAction::make(),
        ];
    }

    // Method yang dijalankan ketika tombol Publish diklik
    public function publish(Model $record, PublishPostAction $action): void
    {
        $action->handle($record);
        
        Notification::make()
            ->success()
            ->body('Post berhasil dipublish.')
            ->send();
    }
}
```
### `DeleteModelAction` -> `DeleteAction::make()`

Karena Delete itu tidak ada Page Filament alias hanya menggunakan Action Filament biasa yang muncul confirmation popup anda bisa melakukan inject action menggunakan method `->using()`.

```php
namespace App\Filament\Resources;

use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Actions\DeleteAction;
use App\Actions\DeletePostAction;
use App\Models\Post;

class PostResource extends Resource
{
    protected static string $model = Post::class;

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                // ... kolom-kolom tabel ...
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make()
                    ->using(fn (Post $record, DeletePostAction $action) => $action->handle($record)),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    // ...
}
```
## `CustomModelAction` -> `Action::make('custom')`.

Jika anda ada membuat custom action pada filament misal publish post: `Action::make('publish')` maka anda bisa inject lewat method `->action()`, karena ini custom anda harus menambahkan policy/gate sendiri, menambahkan form jika diperlukan, didalam form terdapat field filament yang sudah ada validation rule.

Penjelasan:
- Filament menyediakan hook `handleRecordCreation()` dan `handleRecordUpdate()` untuk mengubah bagaimana data disimpan. Dengan menggunakannya, kita dapat memanggil kelas Action kita.
- Untuk **Delete**, Filament memiliki prebuilt `DeleteAction`. Kita bisa memanfaatkan metode `before()` dan `after()` pada `DeleteAction` untuk menjalankan logika tambahan (misal mencatat log).
- Tombol aksi kustom (misal _Publish_) dibuat dengan `Action::make(...)`. Sebagaimana contoh Filament, kita menambahkan `Action::make('impersonate')` atau `->action('impersonate')` di method `getActions()`. Pada contoh di atas, tombol _Publish_ memanggil method `publish()` yang selanjutnya memanggil `PublishPostAction`.

## Apa bedanya Action dengan Services.

Perbedaan utama antara **Action** dan **Service** adalah pada cakupan tanggung jawab. Pada service class biasanya kita mengelompokkan metode terkait model atau fungsionalitas tertentu menjadi satu kelas (misalnya `UserService` dengan beberapa metode). Sedangkan Action memisahkan setiap operasi menjadi satu kelas tersendiri dengan satu metode publik saja. Ringkasnya:
- **Service class:** satu kelas, banyak metode (misal `UserService` punya `create`, `update`, `delete`).
- **Action class:** satu metode per kelas (misal `CreateUserAction`, `UpdateUserAction`, dll.).

Model lama sering menampung banyak logika (misalnya metode `publish()` pada model), namun jika ada banyak aksi berbeda (arsip, duplikasi, publish, dll.) model akan menjadi besar. Dengan Action, setiap logika dipindahkan ke kelas dedicated, membuat model dan controller lebih bersih.

Bedanya itu action class hanya menjalankan satu method atau fungsi saja, sedangkan service class itu ada beberapa fungsi atau method seperti controller, saya biasanya gunakan service untuk mengumpulkan logika dari API pihak ketiga misal Google Client, mungkin saya buatkan `GoogleService`, `GoogleCalendarService`, `WhatsAppBotService`, dsb. Jadi untuk API pihak ketiga saya kumpulkan logika bisnisnya dengan service.

Jadi Action yang saya buat dapat melakukan CRUD dari database lewat eloquent model laravel, dan CRUD dari sumber API pihak ketiga lewat Service class.


## CQRS

