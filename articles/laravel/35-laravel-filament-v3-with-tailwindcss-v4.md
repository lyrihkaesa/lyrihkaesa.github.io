Berikut adalah panduan dalam bahasa Indonesia untuk menggunakan Filament dengan Tailwind CSS versi 4, berdasarkan artikel dari Filament Themes. Panduan ini akan membantu Anda mengintegrasikan Tailwind CSS v4 dalam proyek Laravel 12 yang menggunakan Filament v3, yang secara default hanya mendukung Tailwind CSS v3.

---

## 🧩 Menggunakan Filament dengan Tailwind CSS v4

Laravel 12 hadir dengan Tailwind CSS v4 secara default, sementara Filament v3 masih bergantung pada Tailwind CSS v3. Untuk menggabungkan keduanya tanpa konflik, kita perlu menginstal kedua versi Tailwind CSS secara bersamaan dengan pendekatan alias.([Filament Themes](https://filamentthemes.com/guides/how-to-use-filament-with-tailwind-css-v4?utm_source=chatgpt.com "How to use Filament with Tailwind CSS v4"))

---

### 1. 🔧 Instal Tailwind CSS v4 dengan Alias

Pertama, instal Tailwind CSS v4 dengan nama alias `tailwindcss-v4` untuk menghindari konflik dengan versi sebelumnya:

```bash
npm install tailwindcss-v4@npm:tailwindcss@4 --save-dev
```

Setelah instalasi, `package.json` Anda akan menampilkan entri berikut:

```json
"devDependencies": {
  "tailwindcss-v4": "npm:tailwindcss@^4.1.4"
}
```

Pastikan untuk menyesuaikan impor CSS Anda sesuai dengan alias baru:

```css
@import 'tailwindcss';
@import 'tailwindcss-v4';
```

---

### 2. ⬇️ Instal Tailwind CSS v3

Selanjutnya, instal Tailwind CSS v3 untuk digunakan oleh Filament:

```bash
npm install tailwindcss@3 --save-dev
```

Sekarang, proyek Anda memiliki kedua versi Tailwind CSS:

- `tailwindcss` untuk Filament (v3)
    
- `tailwindcss-v4` untuk bagian lain dari aplikasi Anda
    

---

### 3. ⚙️ Konfigurasi Vite untuk Filament

Buat file konfigurasi Vite khusus untuk Filament dengan Tailwind CSS v3:([Filament Themes](https://filamentthemes.com/guides/how-to-use-filament-with-tailwind-css-v4?utm_source=chatgpt.com "How to use Filament with Tailwind CSS v4"))

```bash
touch vite.config.filament.js
```

Isi file tersebut dengan konfigurasi berikut:

```javascript
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/filament/admin/theme.css'],
      refresh: true,
    }),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
  build: {
    outDir: 'public/build/filament',
  },
});
```

Pastikan untuk menyesuaikan jalur `input` sesuai dengan lokasi file CSS tema Anda.

---

### 4. 🛠️ Perbarui Skrip Build

Untuk membangun kedua versi Tailwind CSS, perbarui skrip di `package.json`:([Filament Themes](https://filamentthemes.com/guides/how-to-use-filament-with-tailwind-css-v4?utm_source=chatgpt.com "How to use Filament with Tailwind CSS v4"))

```json
"scripts": {
  "build": "vite build && vite build --config vite.config.filament.js",
  "dev": "concurrently \"vite\" \"vite --config vite.config.filament.js\""
}
```

Pastikan Anda telah menginstal `concurrently` jika belum:

```bash
npm install concurrently --save-dev
```

---

### 5. 🎨 Buat Stylesheet Tema

Jika Anda menggunakan tema minimal dari Filament, jalankan:([Filament Themes](https://filamentthemes.com/guides/how-to-use-filament-with-tailwind-css-v4?utm_source=chatgpt.com "How to use Filament with Tailwind CSS v4"))

```bash
php artisan filament:install --minimal-theme
```

Untuk membuat tema kustom:([Filament Themes](https://filamentthemes.com/themes/stacked?utm_source=chatgpt.com "Filament Stacked Theme"))

```bash
php artisan make:filament-theme
```

Pastikan untuk menambahkan jalur stylesheet ke konfigurasi Vite seperti yang dijelaskan sebelumnya.

---

### 6. 🧹 Hapus Konfigurasi PostCSS Lama

Jika terdapat file `postcss.config.js`, hapus file tersebut karena konfigurasi PostCSS sudah ditangani dalam file Vite.([Filament Themes](https://filamentthemes.com/guides/how-to-use-filament-with-tailwind-css-v4?utm_source=chatgpt.com "How to use Filament with Tailwind CSS v4"))

---

### 7. 🚀 Bangun Aset

Setelah semua konfigurasi selesai, bangun aset Anda dengan:

```bash
npm run build
```

Ini akan membangun kedua versi Tailwind CSS untuk aplikasi Anda.
