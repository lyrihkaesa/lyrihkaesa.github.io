# Dependency Injection in Laravel Filament

Source: [https://medium.com/@cameron_germein/things-i-wish-someone-had-explained-to-me-dependency-injection-in-laravel-filament-what-does-5dae3bbf8f23]

Hal-hal yang saya harap seseorang dapat menjelaskan kepada saya: Injeksi Ketergantungan pada Filamen Laravel - Apa yang berhasil dan (lebih spesifiknya) tidak berhasil.

Sebagian seseorang yang baru mengenal Laravel dan Filament, satu bidang yang saya geluti adalah `Dependency Injection`. Ketika berhasil, tampaknya ajaib, tetapi ketika tidak berfungsi seperti yang Anda harapkan, sangat membuat frustrasi saat mencoba menentukan alasannya. Ini tidak membantu jika dokumentasi yang Anda baca tentang cara kerja `DI` di proyek Laravel mungkin tidak berlaku untuk proyek Filament.

Sumber frustrasi saya adalah satu tantangan sederhana - mencoba memasukkan/inject contoh Model saat ini. Masalah bagi saya muncul seperti ini: Saya dapat melihat bahwa Filament dengan baik hati mengaktifkan injection of Model instances ke dalam Closures sebagai parameters, yang di ketik seperti:

```php
Action::make("undo")
  ->button()
  ->requiresConfirmation()
  ->label("Undo")
  ->icon('heroicon-m-x-mark')
  ->color('danger')
  ->action(function (Environment $environment) {
    return $environment->executeUndo();
  });
```

Dalam konteks ini, nilai dari $environment adalah contoh saat ini dari Model Lingkungan. Ini berfungsi dengan sempurna. Jadi, Dependency Injection sepenuhnya dipahami! Yang saya butuhkan sekarang adalah untuk menggali lebih dalam sedikit, dan menemukan cara-cara keren lainnya untuk menggunakannya! Maka saya memulai perjalanan saya ke hasil pencarian Google, dan di antara dokumentasi Laravel, menemukan [Service Container](https://laravel.com/docs/10.x/container). Inilah tempat di mana semuanya mulai terurai.

## Kesalahan pertama: Berpikir bahwa Service Container SELALU digunakan untuk menyuntikkan dependensi

Ini telah menjadi sumber utama kebingungan saya. Asumsi saya berjalan seperti ini:

1. Filament dapat inject instance Model saat ini (ini benar)
2. Laravel injects dependencies melalui Service Container (ini juga benar)
3. Oleh karena itu, Filament harus menggunakan Service Container untuk resolve dan inject instance Model saat ini. (Ini benar-benar salah)

Asumsi yang sepenuhnya salah (tetapi pada saat itu tampak masuk akal) ini adalah apa yang telah membuat saya gila selama beberapa minggu terakhir. Saya bisa melihat Model secara otomatis resolved dan injected, dan saya pikir saya mengerti mekanisme yang terlibat, tetapi tidak peduli apa yang saya coba, saya tidak bisa membuatnya berfungsi di luar contoh-contoh tertentu dalam dokumentasi Filament.

## Kesalahan kedua: Berpikir bahwa Service Container dapat resolve Model instances

Pada saat itu, ini tampaknya sepenuhnya jelas (dengan lompatan logis yang salah di atas), tetapi kebenaran sederhana adalah ini: Service Container tidak dapat secara otomatis menyelesaikan contoh spesifik dari Model Anda, dalam keadaan, skenario, kondisi, atau situasi apa pun, sama sekali tidak. Untuk Service Container mengambil contoh spesifik dari Model, ANDA HARUS memberikan nilai identifikasi kepadanya (seperti ID Model).

Saya benar-benar telah membuang waktu berminggu-minggu untuk hal ini. Hal-hal yang saya coba tidak berhasil:

### Using the App Facade

```php
$environment = app(Environment::class); //This does not work, returns a blank Environment
```

Ini tidak akan pernah berhasil. Itu akan selalu mengembalikan contoh "kosong/blank" dari Model Anda. Bahkan jika Anda mencobanya dalam konteks yang sama persis dengan tempat kerja injeksi Filamen, itu tetap tidak akan berhasil.

```php
Action::make("undo")
->button()
->requiresConfirmation()
->label("Undo")
->icon('heroicon-m-x-mark')
->color('danger')
->action(function (Environment $environment) {
\Debugbar::alert($environment); //This works, shows the current Environment
\Debugbar::alert(app(Environment::class)); //This does not work, shows a blank Environment
return $environment->executeUndo();
});
```

### Using Constructor Injection

Inilah yang paling membuat saya patah. Ide bahwa Anda dapat inject dependencies melalui `__constructor()` dalam kelas-kelas Anda tampaknya menjadi... hal paling inti dari Laravel. Ada banyak contoh yang persis seperti ini ketika Anda mencari "Laravel Dependency Injection" di Google, tetapi ternyata tidak ada yang (ok, mungkin hanya beberapa) dari mereka yang mau menyebutkan bahwa ini tidak berkerja dengan Model instances.

```php
class Example
{
  public function __construct(
    public Environment $environment,
  ) {}

  public function getEnvironment()
  {
    \Debugbar::alert($this->environment); //This does not work, shows a blank Environment
    return $this->environment;
  }
}
```

### Any form of Service Container Bindings

Anda pikir Anda dapat mengatasinya dengan beberapa jenis Service class binding, injecting Model sebagai bagian dari definisinya? Tidak. Anda mungkin berpikir "tapi kita menggunakan fungsi anonim, dan menyertakan Model sebagai parameter? Ini berhasil di tempat lain dalam Filament!". Tidak bisa. Tidak berhasil.

```php
public function register(): void
{
  $this->app->bind(EnvironmentService::class, function (Environment $environment) {
    return new EnvironmentService($environment);
  });
}
$service = app(EnvironmentService::class); //Will return your Service class, but the $environment attribute will be a blank Environment
```

Jangan berpikir Anda bisa menjadi rumit dengan [Contextual Bindings](https://laravel.com/docs/10.x/container#contextual-binding) atau [Deferred Service Provider](https://laravel.com/docs/10.x/providers#deferred-providers). Terutama dengan yang terakhir, menunda injeksi sampai Anda benar-benar meminta kelas terikat, sepertinya itu bisa membantu, bukan? Tidak.

### Creating and evaluating my own Closures

Lalu saya berpikir, Filament tampaknya dapat memasukkan Model ke dalam Closures - jadi mari kita coba membuat closure di lokasi yang berbeda, dan melihat apakah closure tersebut dapat teratasi/resolve? Itu tidak. Bahkan ketika dipanggil bersebelahan, seperti pada contoh di bawah, itu tidak akan berhasil.

```php
class EnvironmentService
{
  use Filament\Support\Concerns\EvaluatesClosures;

  public function getEnvironment()
  {
    return $this->evaluate(fn (Environment $environment) => $environment);
  }
}

Action::make("action")
  ->action(function (Environment $environment) {
  \Debugbar::alert($environment); //This works, shows the current Environment
  $service = app(EnvironmentService::class);
  \Debugbar::alert($service->getEnvironment()); //Blank Environment
});
```

Saya menghabiskan waktu berjam-jam bermain-main dengan Closures, mencoba memahami mengapa mereka berhasil dalam beberapa skenario, tetapi tidak pada skenario lainnya. Saya terus memikirkan hal ini, karena pada intinya, saya entah bagaimana telah meyakinkan diri saya sendiri akan kesalahan berikutnya.

## Kesalahan ketiga: Berpikir bahwa `Route Model Binding` digunakan untuk menyelesaikan Model

Untuk memahami bagaimana `Service Container` dapat resolve Model instances (yang sebenarnya tidak), saya percaya (tanpa bukti dukungan yang nyata, selain "tidak ada yang memberi tahu saya sebaliknya"), bahwa mekanisme yang `Service Container` (dan oleh karena itu Filament) harus menggunakan untuk menyelesaikan Model adalah [Route Model Binding](https://laravel.com/docs/10.x/routing#route-model-binding).

Pada permukaannya, ini masuk akal — baik `Service Container`, maupun konsep `Route Model Binding` adalah bagian inti dari Laravel, dan haruslah menemukan Model saat ini _"dengan cara apa pun"_. `Route Model Binding/RMB` tampaknya menjadi tebakan yang masuk akal seperti yang lainnya.

Ternyata, saya hampir benar.

Tanpa terlalu teknis, `Route Model Binding` menggunakan `Service Container` untuk memberikan Model yang telah diselesaikan, tetapi `Service Container` tidak dapat menggunakan `Route Model Binding` untuk resolve Model. Ini adalah hubungan satu arah — dari RMB ke SC. Anda dapat membaca lebih lanjut tentang hal itu di sini.

Artinya adalah bahwa semua upaya saya untuk menarik Model yang diinstansiasi keluar dari `Service Container` sudah ditakdirkan gagal dari awal. Satu-satunya cara SC akan pernah menerima Model yang diinstansiasi adalah jika RMB mengirimkannya, dan karena Filament tidak menggunakan Controller... ini tidak akan pernah terjadi.

Hal lain yang saya salah tentang? Filament menggunakan `Route Model Binding`, hanya saja bukan `Route Model Binding` Laravel...

## Jadi, bagaimana sebenarnya cara kerjanya? (Ini adalah penjelasan TL;DR)

Kunci untuk memahami `Dependency Injection` di Filament adalah sebagai berikut:

1. Dependency Injection di Laravel dilakukan melalui dua komponen terpisah (untuk memahaminya): `Service Container`, dan `Route Model Binding`.
2. Di Filament, `Service Container` Laravel sepenuhnya tidak disentuh, dan beroperasi persis seperti yang dilakukan dalam Laravel reguler.
3. Di Filament, `Route Model Binding` Laravel sama sekali tidak digunakan.
4. Filament telah membuat mekanisme `Dependency Injection` yang sepenuhnya terpisah dan mandiri, yang digunakan untuk menyuntikkan Model (dan objek lain) ke dalam `Closures`. _Injection `Closure` ini unik untuk Filament_. Sebagai pemula dalam Laravel dan Filament, saya sama sekali tidak memiliki pemahaman tentang ini — saya hanya menganggapnya sebagai bagian inti dari Laravel!
5. `DI extension`Filament menggunakan [Livewire’s Route Model Binding](https://livewire.laravel.com/docs/components#using-route-model-binding), bukan `Route Model Binding` Laravel.
6. `DI extension`Filament akan melakukannya, jika tidak mampu menyelesaikan objek yang diminta secara mandiri, kembali ke `Service Container` dan mengembalikan apa pun yang dapat ditemukannya. Ini adalah satu-satunya hubungan antara kedua sistem tersebut.

"secara ketat bicara, ini bukanlah sesuatu yang unik untuk Filament, Anda [dapat melakukannya di Laravel](https://darkghosthunter.medium.com/laravel-dependency-injection-on-methods-and-closures-ac17c7d5e8d1), hanya saja tidak umum dalam gaya pengembangan.

## Tunggu, bagaimana Service Container bekerja?

Karena `Service Container` Laravel tidak memiliki keterkaitan apa pun (selain menjadi “pilihan terakhir” ketika DI Filament tidak cocok), Anda dapat menggunakannya persis seperti yang Anda lakukan dalam Laravel biasa, dan berfungsi dengan tepat sama. Tetapi ingatlah satu peringatan besar: Anda hanya dapat secara otomatis inject objects yang dapat Anda resolve dalam kode yang telah ditetapkan.

Ini masih sangat berguna, dan jika diperlukan, ada banyak cara untuk menginisialisasi Model tertentu. Sebagai contoh, jika Anda memiliki kelas Service yang perlu mengetahui tentang Model terkaitnya, Anda bisa menyuntikkannya melalui facade App, atau secara eksplisit mengambil Model dalam kode:

```php
class EnvironmentService
{
  public function __construct(
    public Environment $environment,
  ) {}

  public static function make($id)
  {
    return new Environment(Environment::findOrFail($id));
  }
}

$environment = EnvironmentService::make(34); //Will return the Environment model with ID 34.
$environment = app(EnvironmentService::class, ['environment' => 34]); //Same thing as above.
```

Saya yakin praktik terbaik yang diterima secara umum adalah menggunakan `app() facade` sebagai `factory` untuk kelas Anda, bahkan jika Anda harus memberikan ID-nya. Itu masih akan mengelola semua dependensi yang dapat diselesaikan, itu akan menyelesaikan Antarmuka ke dalam kelas-kelas konkret, Anda dapat menggunakannya untuk membangun objek kompleks dengan rantai dependensi - Anda tidak bisa memasukkan sebuah instance Model tanpa memasukkan ID tertentu.

## Tell me more about Filament’s custom Dependency Injection

Here is the short version.

- Filament’s Pages are full-page Livewire components, and as such, are able to resolve the current Model.
- When you define a Component on that page, that Model is passed on to it.
- Filament’s DI operates on these Components (that is, classes that extend from \Filament\Support\Components\Component).
- When you are calling methods on these Components, besides setting primitives, you can almost universally also pass in Closures
- These Closures are evaluated by the evaluate() method in the EvaluatesClosures trait.
- The evaluate() method then (short version) looks back up the chain to find the list of parameters it is able to resolve, and how to resolve them.
- For Models, it simply returns the Model that was set back when the Component was first created.
- The rest of the parameters are resolved on a case by case basis.
- If it can’t resolve the requested injection, it will go and ask the Service Container if it has anything. This is the only interface between the two DI systems.

This explains the “context” of Filament’s DI. It works on classes that extend from \Filament\Support\Components\Component. In order to find the exact list of parameters you can inject, it looks for the resolveDefaultClosureDependencyForEvaluationByName() and resolveDefaultClosureDependencyForEvaluationByType() methods, where you will find the code that defines precisely what can be injected, and where it will be injected from.

## What’s the Long Version?

Here it is, the detailed explanation of exactly how Filament’s DI works. It’s a bit long, but I’ll try and step through it as carefully as I can. For the sake of this explanation, I will be using a View Page for the Environment resource we’ve been using as an example so far, but the same mechanics apply to all the Pages.

## It starts with Livewire

If you look at [https://livewire.laravel.com/docs/components#full-page-components](https://livewire.laravel.com/docs/components#full-page-components), you will see there are three main conditions we need to meet for Route Model Binding:

1. You create a class that extends Livewire\Component
2. You create a Route defined that points to your new class
3. The new class has a property (and/or mount() method) whose Model and property name match the values from the Route

Then, if you visit the URL from your Route, with a valid ID in place, Livewire will boot the class, with the property of your Model already correctly instantiated.

## How is this done in Filament?

The above conditions are met through the following Filament components:

**ONE** — Creating a Page (for our example, a View record — [https://filamentphp.com/docs/3.x/panels/resources/viewing-records](https://filamentphp.com/docs/3.x/panels/resources/viewing-records)). The created class, ViewEnvironment, extends ViewRecord, which extends Page, so on and so on, until eventually you get down to Livewire\Component

```php
class ViewEnvironment extends ViewRecord
{
 protected static string $resource = EnvironmentResource::class;
}
```

**TWO** — To create the Route, you add your route to the getPages() method in your Resource, as per [https://filamentphp.com/docs/3.x/panels/resources/viewing-records#adding-a-view-page-to-an-existing-resource](https://filamentphp.com/docs/3.x/panels/resources/viewing-records#adding-a-view-page-to-an-existing-resource)

```php
public static function getPages(): array
{
 return [
'index' => Pages\ListEnvironments::route('/'),
'create' => Pages\CreateEnvironment::route('/create'),
'view' => Pages\ViewEnvironment::route('/{record}'),
'edit' => Pages\EditEnvironment::route('/{record}/edit'),
];
}
```

**THREE** — The class ViewRecord, which our class extends, defines the mount() method, and uses the Concerns\InteractsWithRecord trait, which is where the $record property is defined.

```php
class ViewRecord extends Page
{
 use Concerns\HasRelationManagers;
 use Concerns\InteractsWithRecord;
 use InteractsWithFormActions;

// - -

public function mount(int | string $record): void  {
    $this->record = $this->resolveRecord($record);
 $this->authorizeAccess();
 if (! $this->hasInfolist()) {
 $this->fillForm();
 }
 }
}
```

And that’s it — all you need to do, as a developer, is create a Page as per the instructions, and the magic begins!

## Getting the Record into the right places

From the Page, the Record is passed through into the Component during creation. In our example, we’re looking at an Infolist on our View Page. This is all done automatically, the Components are initialised during the mount() method of the Page, and .

```php
class ViewRecord extends Page
{
 // - -

protected function makeInfolist(): Infolist {
 return parent::makeInfolist()
 ->record($this->getRecord())
      ->columns($this->hasInlineLabels() ? 1 : 2)
 ->inlineLabel($this->hasInlineLabels());
 }
```

## Now to fetch this Record

From here, we go right down to the other end of the chain — where the Closure is actually defined, and asks for the Environment to be injected.

```php
public static function infolist(Infolist $infolist): Infolist
{
 return $infolist
 ->schema([
 Section::make('Overview')
 ->columns(4)
 ->heading(fn(Environment $environment) => $environment->name)
 ->schema([
// - -
])
 ]);
}
```

## Evaluating the Closure

When, at some later point, Filament needs to display the heading that we’ve set, it calls the evaluate() method to process it.

```php
trait HasHeading
{
 protected string | Htmlable | Closure | null $heading = null;

public function heading(string | Htmlable | Closure | null $heading = null): static {
 $this->heading = $heading;
 return $this;
 }

public function getHeading(): string | Htmlable | null {
 return $this->evaluate($this->heading);
 }
}
```

The evaluate() method is where a lot of the magic happens, but it’s relatively simple in concept — it is able to go and resolve a dependency based either on Name, or on Type. This is why injecting either Environment $environment or Environment $record both work.

Eventually, it gets to the point where it calls the two following methods: resolveDefaultClosureDependencyForEvaluationByName() and resolveDefaultClosureDependencyForEvaluationByType(). Their implementation in the Trait is only a placeholder — they are meant to be implemented further up the chain, in the case of our Infolist, the file is Filament\Infolists\ComponentContainer

## Implementing the Evaluations

For this example, **I’m hopping over to the implementation in Filament\Forms\Components\Component**, because it’s more interesting than the Infolist one.

```php
protected function resolveDefaultClosureDependencyForEvaluationByName(string $parameterName): array
{
  return match ($parameterName) {
 'context', 'operation' => [$this->getContainer()->getOperation()],
 'get' => [$this->getGetCallback()],
 'livewire' => [$this->getLivewire()],
 'model' => [$this->getModel()],
 'record' => [$this->getRecord()],
 'set' => [$this->getSetCallback()],
 'state' => [$this->getState()],
 default => parent::resolveDefaultClosureDependencyForEvaluationByName($parameterName),
 };
}
```

As you can see, this is the complete list of parameters you can inject on a form component! Much of this is documented [here](https://filamentphp.com/docs/3.x/forms/advanced#form-component-utility-injection), but by digging into the code itself, you can see a definitive list of what it is you can and cannot inject. For any class that lets you pass in Closures and resolve their dependencies, there will be an implementation of this (and the ByType) method. Go check them out!

Also note — if the parameter you’re trying to inject isn’t in the available list, Filament’s DI will go and ask the Service Container if it has anything. This is the only interaction between the two systems.

## The final piece of the puzzle

As you may have already seen in the code above… This is where the connection between Filament’s DI and Livewire’s Route Model Binding happens!

```php
'model' => [$this->getModel()],
'record' => [$this->getRecord()],
```

Filament’s DI isn’t so much *resolving* the Model instance, it’s just passing on the instance that was set when the Component was first created. And that’s all there is to it! You know have a pretty thorough understanding of exactly where and when you are able to use Filament’s DI, and more importantly, WHY!

## Why are there two different resolveDefault methods?

The reason there is both a resolveDefaultClosureDependencyForEvaluationBy**Name**() and resolveDefaultClosureDependencyForEvaluationBy**Type**() is the entire reason for Filament’s custom DI to even exist. It allows the injection of records either by name or by type

```php
->action(function (Environment $record) { //here the resolution is by name
 return $environment->executeUndo();
});
->action(function (Environment $environment) { //here the resolution is by type
 return $environment->executeUndo();
});
```

Both of the above examples work perfectly, but being able to resolve by Type is unique to Filament.

## Conclusion

I wrote this article because I felt that if I was having these problems coming to grips with Dependency Injection in Filament, then other people might be as well. I don’t pretend to be an amazing programmer, but some of the things I’ve discovered throughout this process haven’t felt particularly obvious to me. It wasn’t until I received the specific guidance on how some of the internals work from one of Filament’s core developers that things started clicking into place ([thanks Dennis](https://github.com/pxlrbt)!) Hopefully this helps someone else getting into Filament for the first time, or at the very least, saves them from making the same stupid mistakes I did!

And as it also turns out, Dan Harris, the creator of Filament, actually has a video that describes some of what I’ve covered above. I didn’t know about the existence of this until after I’d worked all the above out for myself, I’m sure it would have saved me a mountain of frustration.

[https://laracasts.com/series/build-advanced-components-for-filament/episodes/2](https://laracasts.com/series/build-advanced-components-for-filament/episodes/2)

Dan himself also mentioned: *“Filament’s DI ($this->evaluate()) is actually based on Laravel’s own DI feature (app()->call()) which does exactly the same thing to closure functions. the only reason Filament uses $this->evaluate() instead, is because we have a feature where we can inject parameters based on their type as well as their name. so Post $record does the same as Post $post as we tell the evaluation that Post types can be injected as well as $record. laravel cant do that with app()->call(). but what we are doing is basically identical to Laravel, its not really that magic.”*

I would counter that it certainly feels like magic to a developer seeing it for the first time, but once you take a peek inside and see behind the curtain, it might not be magic, but it certainly is elegant!
