# Laravel Session


---
## `flash()` sementara (hilang saat: refresh, ganti halaman)
```php
session()->flash(key: 'success', value: 'Data berhasil dibuat!');
```

### `redirect()->with()` shortcut `flash()`
```php
redirect('/')->with(key: 'success', value: 'Data berhasil dibuat!');
```

---
## `put()` tidak mudah hilang
```php
session()->put(key: 'success', value: 'Data berhasil dibuat!');
```
