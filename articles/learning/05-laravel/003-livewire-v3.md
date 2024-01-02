# Livewire v3

```bash
composer require livewire/livewire
```

```bash
php artisan make:livewire
```

```bash
php artisan livewire:make
```

```bash
php artisan list livewire
```

:::danger Error

Error saat pertama kali install tanpa ada `layout.app`.

```txt
Livewire page component layout view not found: [components.layouts.app]
```

```bash
php artisan livewire:layout
```

:::

## Config

```bash
php artisan livewire:publish --config
```

:::info Change Default Setting

> Default

```php
    /*
    |---------------------------------------------------------------------------
    | Layout
    |---------------------------------------------------------------------------
    | The view that will be used as the layout when rendering a single component
    | as an entire page via `Route::get('/post/create', CreatePost::class);`.
    | In this case, the view returned by CreatePost will render into $slot.
    |
    */

    'layout' => 'components.layouts.app',
```

> Edited

```php
    /*
    |---------------------------------------------------------------------------
    | Layout
    |---------------------------------------------------------------------------
    | The view that will be used as the layout when rendering a single component
    | as an entire page via `Route::get('/post/create', CreatePost::class);`.
    | In this case, the view returned by CreatePost will render into $slot.
    |
    */

    'layout' => 'layouts.app',
```

:::
