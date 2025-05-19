# Pengenalan Git

Hanya catatan singkat.

## Remote Repository

Ketika kita membuat Git Project, secara default, Git tidak tahu tentang Remote Repository. Kita perlu memberi tahu ke git project local yang sudah kita buat tentang lokasi git remote repository.

### Menambahkan Remote Repository

Untuk menambah remote repository, kita bisa gunakan perintah:

```bash
git remote add name ssh-url
```

Salah satu kebiasaan di Git, biasanya memberi nama default untuk remote repository dengan nama `origin`.

```bash
git remote add origin https://github.com/lyrihkaesa/lyrihkaesa.github.io
```

| Key       | Value                                                |
| --------- | ---------------------------------------------------- |
| `name`    | `origin`                                             |
| `ssh-url` | `https://github.com/lyrihkaesa/lyrihkaesa.github.io` |

### Melihat Remote Repository

Untuk melihat remote repository yang ada di git project local, kita bisa gunakan perintah:

```bash
git remote
```

Untuk melihat `URL detail` remote repository, kita bisa gunakan perintah:

```bash
git remote get-url name
```

Contoh:

```bash
git remote get-url origin
```

| Key    | Value    |
| ------ | -------- |
| `name` | `origin` |

### Menghapus Remote Repository

Untuk menghapus remote repository, kita bisa gunakan perintah:

```bash
git remote rm name
```

Contoh:

```bash
git remote rm origin
```

| Key    | Value    |
| ------ | -------- |
| `name` | `origin` |

---

## Git Push

- Walaupun kita sudah menyimpan perubahan di Git Project di local, tapi tidak secara otomatis akan di sync dengan Remote Repository.
- Hal ini karena sejak awal Git di desain sebagai distributed version control, artinya kita bisa melakukan perubahan dimanapun dan kapanpun, tanpa harus terkoneksi ke Git Server.
- Oleh karena itu, jika kita ingin mengirim perubahan yang terjadi di Git Project di local kita, kita perlu mengirimnya secara manual ke Git Server.
- Untuk mengirim perubahan di local ke git server, kita bisa gunakan perintah yang bernama push.

### Push Branch

Untuk mengirim perubahan branch ke remote repository dengan nama branch sama:

```bash
git push remote_name local_branch
```

Contoh:

```bash
git push origin main
```

| Key            | Value    |
| -------------- | -------- |
| `remote_name`  | `origin` |
| `local_branch` | `main`   |

Untuk mengirim perubahan branch ke remote repository dengan nama branch yang berbeda, kita bisa gunakan perintah :

```bash
git push remote_name local_branch:remote_branch
```

Contoh:

```bash
git push origin main:master
```

| Key             | Value    |
| --------------- | -------- |
| `remote_name`   | `origin` |
| `local_branch`  | `main`   |
| `remote_branch` | `master` |

### Push Semua Branch

Jika kita ingin mengirim semua perubahan di semua branch ke remote repository, kita bisa gunakan perintah :

```bash
git push namabranch --all
```

Contoh:

```bash
git push origin --all
```

### Menghapus Remote Branch

Perintah `push` juga bisa digunakan untuk menghapus `branch` yang ada di `remote repository`, Kita bisa gunakan perintah:

```bash
git push --delete namaremote namabranch
```

Perlu diingat, menghapus `remote branch` bukan berarti menghapus `branch` di `local`, jadi jika kita ingin hapus di local, kita harus lakukan secara manual.

## Git Clone

- Apa yang harus dilakukan jika misal kita ingin download project Git yang ada di Server ke komputer baru?
- Hal ini dinamakan perintah `clone`
- Dengan perintah `clone`, kita bisa download project di remote repository ke local dan secara otomatis di download sebagai git project.

Untuk melakukan clone, kita bisa gunakan perintah:

```bash
git clone url_remote_repository
```

Contoh:

```bash
git clone https://github.com/lyrihkaesa/lyrihkaesa.github.io
```

Secara default, clone akan membuat project dengan nama folder sama dengan nama project remote repository. Jika kita ingin melakukan clone, dengan nama folder yang berbeda dengan nama project remote repository, kita bisa gunakan perintah :

```bash
git clone url_remote_repository folder_name
```

Contoh:

```bash
git clone https://github.com/lyrihkaesa/lyrihkaesa.github.io lyrihkaesa-web-protofolio
```

| Key                     | Value                                                |
| ----------------------- | ---------------------------------------------------- |
| `url_remote_repository` | `https://github.com/lyrihkaesa/lyrihkaesa.github.io` |
| `folder_name`           | `lyrihkaesa-web-protofolio`                          |

## Git Pull

```bash
git pull
```
