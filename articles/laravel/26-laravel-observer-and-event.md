# Laravel Observer & Event — Panduan Praktis untuk Junior Dev

Tujuan artikel ini sederhana: bikin kamu paham **apa itu Observer & Event di Laravel**, **kapan jangan dipakai**, **kapan justru tepat dipakai**, plus **alternatif yang lebih aman** untuk tim yang tumbuh. Kita fokus ke Laravel 12.x.

---

## 1) Definisi Singkat (tanpa bunga-bunga)

* **Model Events**: “hook” yang ditembak Laravel saat model di-*creating*, *created*, *updating*, *updated*, *deleting*, dll. Bisa kamu map lewat properti `dispatchesEvents` atau pakai **Observer** (kelas yang ngumpulin handler event per model). ([laravel.com][1])
* **Observer**: Satu kelas berisi metode seperti `creating(User $u)`, `updated(User $u)`, dst — otomatis dipanggil saat event model terjadi. Tujuannya “otomatisasi” perilaku model. ([laravel.com][1])
* **Events & Listeners**: Pola *publish-subscribe* di Laravel. Kamu **dispatch** event (mis. `UserRegistered`) lalu **listener** menanganinya. Event-nya sendiri **bukan** yang di-*queue*; yang bisa di-*queue* adalah **listener** (pakai `ShouldQueue`). ([laravel.com][2])

> Intinya: Observer = event khusus Eloquent model. Event/Listener = event aplikasi yang lebih umum.

---

## 2) Sisi Gelap (yang sering bikin tim capek)

1. **Efek samping tersembunyi**
   `User::save()` kelihatan polos, tapi di balik layar bisa “mengirim email”, “sinkron ke Stripe”, “ubah invoice”, dll. Developer baru sulit menebak *side effect*-nya → beban kognitif naik. (Ini kritik utama Luke Kuzmish.) ([cosmastech][3])

2. **Tes jadi rapuh & lambat**
   Banyak test yang menyentuh `User::create()` mendadak ikut mengeksekusi observer/listener. Harus *fake* queue/event/notification di banyak tempat → tetesan kecil jadi banjir. ([cosmastech][3])

3. **Operasi massal tidak memicu event**
   `User::insert($rows)` atau `User::query()->update([...])` **tidak** menembakkan event model. Hubungan/relasi `->update([...])` juga tidak. Kalau logika penting kamu taruh di observer, *bulk ops* bisa “lewat semua rambu”. ([laravel.com][1])

4. **Ordering & reliabilitas** (untuk Event/Listener)
   Listener yang di-*queue* dieksekusi oleh worker terpisah — **urutan tidak dijamin**. Kalau butuh urutan pasti, gunakan **job chaining** alih-alih berharap pada urutan listener. ([laravel.com][4], [laraveldaily.com][5])

5. **Exception merusak request**
   Listener sinkron yang lempar exception bisa menjatuhkan response. Pertanyaan: memang mau request gagal kalau email gagal kirim? Banyak kasus: tidak. (Dorong ke queue.) ([laravel.com][2])

---

## 3) Prinsip Dasar Pemakaian

> **Jangan gunakan Observer & Event ketika:**
>
> * Logika bisnisnya **inti & kompleks** (mis. update user yang harus menyentuh banyak aggregate/layanan eksternal). Taruh di **Action/Service** yang eksplisit, bukan di hook tersembunyi. ([cosmastech][3])
> * Kamu butuh **urutan terjamin** antar langkah. Pakai **Jobs** + **Bus::chain()** / **batches**. ([laravel.com][4], [laraveldaily.com][5])
> * Kamu sering melakukan **bulk insert/update**. Event model **tidak** akan tembak; pindahkan logika ke layer lain atau proses ulang secara eksplisit. ([laravel.com][1])
> * Tim besar, *context switching* tinggi, dan kamu ingin **mengurangi beban kognitif** & *flaky tests*. ([cosmastech][3])

> **Gunakan Observer & Event saat:**
>
> * Kebutuhan **ringan, lokal, dan deterministik** pada model: set `uuid` di `creating`, *auto*-slug, *touch timestamp*, audit sederhana. (Murah dan idempotent.) ([laravel.com][1])
> * **Notifikasi/asinkron ringan** yang **boleh gagal sementara**: kirim email sambutan setelah `UserRegistered`, catat aktivitas, kirim metric. Pastikan **listener di-queue** (`ShouldQueue`). ([laravel.com][2])
> * **Plugin/ekstensi** antar domain yang *loose coupling* (integrasi opsional).
> * **Broadcasting** ke frontend (Live updates), di mana event memang media komunikasi (mis. Reverb/Pusher/Ably). ([laravel.com][6])

---

## 4) Alternatif yang Lebih Aman (dan terukur)

### a) Action / Command Pattern (direkomendasikan)

Kumpulkan orkestrasi bisnis di satu kelas **eksplisit**.

```php
// app/Actions/UpdateUserAction.php
namespace App\Actions;

use App\Models\User;
use App\Jobs\SyncStripeCustomer;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Bus;

class UpdateUserAction
{
    public function __invoke(User $user, array $data): User
    {
        return DB::transaction(function () use ($user, $data) {
            $user->fill($data)->save();

            // Kerjakan efek samping DI SINI, eksplisit & teruji:
            Bus::chain([
                new SyncStripeCustomer($user->id),
                // job lain yang butuh urutan…
            ])->dispatch();

            return $user->refresh();
        });
    }
}
```

Kenapa ini lebih baik buat tim? **Terlihat jelas** dari atas ke bawah; mudah dites unit; tidak menyergap test lain dengan side effect tersembunyi. (Ini inti saran di artikel Luke.) ([cosmastech][3])

### b) Jobs, Chaining, & Batches

* Pindahkan kerja berat/IO (email, API, ekspor) ke **queued jobs**.
* Butuh urutan? **`Bus::chain([...])`**. Butuh paralel + agregasi? **batches**.
* Monitoring? **Laravel Horizon**. ([laravel.com][4], [laraveldaily.com][5])

### c) Scheduling

Pekerjaan berkala → **Task Scheduler** (mis. re-sync nightly) daripada event. ([laravel.com][7])

---

## 5) Best Practice (ceklist cepat)

**Kebersihan Kode & DX**

* Satu model => maksimal 1–2 *cheap* observer rule. Hindari logika berat.
* Nama event semantik domain (`UserRegistered`, `InvoiceFinalized`) — bukan event teknis (`UserSaved`). ([laravel.com][2])
* Dokumentasikan side effect di tempat pemanggilan (atau di Action), bukan di kepala orang.

**Testing**

* **Default** di test: `Event::fake()`, `Notification::fake()`, `Queue::fake()`; lalu assert yang memang diharapkan *ter-dispatch*. ([laravel.com][2])
* Untuk Factory: gunakan `createQuietly()` jika tujuan test bukan memicu observer. (Ingat: mungkin ada cabang logic yang ingin tetap diuji.) ([laravel.com][1])
* Uji **Action** secara langsung, bukan hanya efek samping via controller.

**Kinerja & Konsistensi**

* Jangan gantungkan integritas bisnis pada observer kalau kamu rutin memakai **bulk ops**. Event tidak akan menembak. (Solusi: proses eksplisit setelah bulk, atau action khusus.) ([laravel.com][1])
* Listener berat **wajib** `ShouldQueue`. Simpan *request lifecycle* tetap cepat. ([laravel.com][2])

**Keandalan**

* Urutan penting? **Jangan** andalkan urutan listener. Pakai **chaining**. ([laraveldaily.com][5])
* Integrasi rapuh (API pihak ketiga)? Taruh di job dengan **retry/backoff**, bukan di observer sinkron. ([laravel.com][4])

---

## 6) Contoh Minimal

### Observer “ringan” (boleh)

```php
// app/Observers/UserObserver.php
namespace App\Observers;

use App\Models\User;
use Illuminate\Support\Str;

class UserObserver
{
    public function creating(User $user): void
    {
        $user->uuid ??= (string) Str::uuid(); // murah & idempotent
    }
}
```

Daftarkan di `AppServiceProvider`:

```php
use App\Models\User;
use App\Observers\UserObserver;

public function boot(): void
{
    User::observe(UserObserver::class);
}
```

Catatan: **mass update/insert tidak memicu ini**. ([laravel.com][1])

### Event/Listener untuk email sambutan

```php
// App\Events\UserRegistered.php
class UserRegistered {
    use Illuminate\Foundation\Events\Dispatchable;
    public function __construct(public int $userId) {}
}

// App\Listeners\SendWelcomeEmail.php
class SendWelcomeEmail implements Illuminate\Contracts\Queue\ShouldQueue {
    public function handle(UserRegistered $event) { /* Mail::to(...)->send(...) */ }
}
```

**Listener** di-*queue*, event-nya tidak. ([laravel.com][2])

---

## 7) Pola Keputusan (versi kilat)

1. Perlu **urutan pasti** atau **transaksi**? → **Action + Job Chaining**, tidak pakai listener. ([laravel.com][4], [laraveldaily.com][5])
2. Efek samping **ringan & lokal** ke model? → **Observer** oke. ([laravel.com][1])
3. Efek samping **asinkron non-kritis** (notifikasi, log) → **Event + queued listener**. ([laravel.com][2])
4. Operasi **massal**? → Jangan andalkan observer/event model. Jalankan proses eksplisit setelahnya. ([laravel.com][1])

---

## 8) Sumber Resmi & Rujukan

* **Laravel 12.x Eloquent (Observers, Muting Events, dispatchesEvents)** — referensi utama untuk perilaku event model & catatan *mass update tidak memicu event*. ([laravel.com][1])
* **Laravel 12.x Events** — cara kerja listener & *queuing*. ([laravel.com][2])
* **Laravel 12.x Queues** — jobs, retry, chaining/batching. ([laravel.com][4])
* **Laravel 12.x Scheduling** — tugas berkala. ([laravel.com][7])
* **Laravel Horizon** — monitoring queue. ([laravel.com][8])
* **Artikel**: *The Pitfalls of Events and Laravel Observers in Large Teams* (Luke Kuzmish) — kritik tajam untuk skala tim besar. ([cosmastech][3])

---

## Penutup

Observer & Event **bukan musuh**, tapi **bukan palu serbaguna**. Untuk junior dev: **mulai dari Action yang eksplisit**, lempar kerja berat ke **Jobs**, pakai **Observer/Event hanya untuk kasus ringan**. Kamu akan dapat kode yang lebih bisa ditebak, tes yang lebih stabil, dan tim yang tidak terseret efek samping tak terlihat.

[1]: https://laravel.com/docs/12.x/eloquent?utm_source=chatgpt.com "Eloquent: Getting Started - The PHP Framework For Web Artisans"
[2]: https://laravel.com/docs/12.x/events?utm_source=chatgpt.com "Events - Laravel 12.x - The PHP Framework For Web Artisans"
[3]: https://cosmastech.com/2024/08/18/laravel-observers-and-models.html?utm_source=chatgpt.com "The Pitfalls of Events and Laravel Observers in Large Teams"
[4]: https://laravel.com/docs/12.x/queues?utm_source=chatgpt.com "Queues - Laravel 12.x - The PHP Framework For Web Artisans"
[5]: https://laraveldaily.com/lesson/queues-laravel/jobs-batch-chain-1?utm_source=chatgpt.com "Jobs into Groups: Batching and Chaining - Laravel Daily"
[6]: https://laravel.com/docs/12.x/broadcasting?utm_source=chatgpt.com "Broadcasting - Laravel 12.x - The PHP Framework For Web Artisans"
[7]: https://laravel.com/docs/12.x/scheduling?utm_source=chatgpt.com "Task Scheduling - Laravel 12.x - The PHP Framework For Web ..."
[8]: https://laravel.com/docs/12.x/horizon?utm_source=chatgpt.com "Laravel Horizon - Laravel 12.x - The PHP Framework For Web Artisans"

- Video About Observer and Event
	- https://www.youtube.com/watch?v=fqr5aT8oo3w
	- https://www.youtube.com/watch?v=-ezOz6vPLoo
	- https://www.youtube.com/watch?v=dby2y7R8Rjk