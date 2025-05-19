# Prisma ORM

```bash
npm install prisma --save-dev
```


## Generate Model

```bash
npx prisma generate
```

## Model-first Migration

Digunakan saat membuat project baru. Dari Model lalu dibuatkan table ke database.

```bash
npx prisma migrate dev --create-only --name nama_migration
```

Perintah di atas digunakan untuk me review atau edit berkas `.sql` `DDL`  yang secara otomatis dibuat dari model pada folder `migration`.

Setelah selesai, Anda bisa menjalankan hasil `migration.sql` ke dalam database menggunakan perintah:

```bash
npx prisma migrate dev
```

## Prisma Studio

```bash
npx prisma studio
```

http://localhost:5555