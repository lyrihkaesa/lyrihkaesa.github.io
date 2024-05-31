# Personal Config

Pengaturan personal untuk proyek pengembangan dengan framework Laravel.

## Alias

:::tip Membuat Alias

```txt
C:\Users\kaesa\.bash_profile
```
_Ganti `kaesa` menjadi directory/folder user komputer Anda._

Isi dari file `.bash_profile` :
```bash
# generated by Git for Windows
test -f ~/.profile && . ~/.profile
test -f ~/.bashrc && . ~/.bashrc
```

Anda bisa membuat file `.bashrc` jika tidak tidak ada file tersebut.
```txt
C:\Users\kaesa\.bashrc
```

Pada file `.bashrc` silahkan ditambahkan alias berikut:
```bash
alias nd='npm run dev'
alias nb='npm run build'
alias cini='composer install && npm install'
alias artisan='php artisan'
alias migrate='php artisan migrate'
alias tinker='php artisan tinker'
alias mfs='php artisan migrate:fresh --seed'
alias ser='php artisan serv'
alias mrm='php artisan migrate:rollback && php artisan migrate'
alias am='php artisan migrate'
alias at='php artisan test'
alias arl='php artisan route:list'
```

:::

:::info Menampilkan Daftar Alias

```bash
alias
```

:::

:::danger Menghapus Alias

```
unalias nama_alias_anda
```

:::


```bash
php artisan make:model Facility -mfs
```

```bash
php artisan make:filament-resource Facility --generate
```

```bash
php artisan make:filament-relation-manager OrganizationResource facilities name
```