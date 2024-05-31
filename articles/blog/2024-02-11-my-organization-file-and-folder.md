# Mengorganisasi File dan Folder Saya

Karena kaesa `pelupa` maka harus rapi dalam mengorganisasi file dan folder alias tata letak penempatan file dan folder.

## Windows
### Local Disk (C:)
Default tempat sistem operasi Windows. Yang perlu ditambahkan mungkin `Games` dan `Program Portable`.

```tree
C:
├── Asobimo // toram launcher
├── Games // permainan simpan disini
├── Program File
├── Program File (x86)
├── Program Portable // menyimpan program portable
│   ├── embyserver
│   ├── FolderSize
│   ├── FoxidPDFEditorPro
│   ├── hwi // hardware info
│   ├── Pichon
│   ├── RevoUninstallerPro
│   ├── Tachidesk-Server
│   └── tportable // telegram portable
├── Users
├── Windows
└── ...
```

### Local Disk (D:)
Tempat menyimpan kebutuhan developing. Bisa diberi nama partisi `Dev` atau `Development` sesuaikan dengan kebutuhan.
- Tidak boleh ada penamaan menggunakan `spasi` untuk development karena bisa mengakibatkan error karena spasi. Disarankan menggunakan penamaan:
	- CapitalizeEachWord
	- kebab-case
	- kebab-case.with.dot

```tree
D: Dev
├── Archives
├── DevTools
│   ├── android
│   ├── flutter
│   └── jdk-21.0.1
├── Pictures
│   ├── Avatars
│   └── Screenshot
├── Projects
├── Toram Online
└── xampp // path aplikasi XAMPP
```

### Local Disk (E:)
Tempat menyimpan data selain kebutuhan development. Bisa diberi nama partisi `Data`.

```tree
E: Data
├── Kaesa Videos
│   ├── Guide
│   └── Music
│       ├── Artists
│       ├── Channels YouTube
│       ├── Epic or Instrumental
│       ├── Game and Anime
│       ├── Mix
│       └── Z-Lainnnya
└── Kaesa Z-Lainnnya
    ├── Accounts
    ├── Android
    └── Kuliah
```

### Local Disk (G:)
Digunakan shortcut `Google Drive`, G artinya google drive.

```tree
G: Google Drive
├── My Drive
└── Shared drives
```
## HDD Eksternal WD 4TB

### Partisi 01
Menyimpan data apa pun.

```tree
F: DATA
├── 01_Projects
├── 02_Areas
│   ├── Kuliah
│   └── Toram Online
├── 03_Resources
│   ├── Adobe
│   ├── Figma
│   └── Fonts Family
├── 04_Archives
│   ├── Compressed
│   ├── Documents
│   ├── Games
│   │   ├── Installer
│   │   ├── Portable
│   │   ├── Minecraft
│   │   ├── Steam
│   │   └── Epic // coming soon
│   ├── Musics
│   ├── Pictures
│   ├── Programs
│   └── Videos
├── Kaesa Apps Windows
│   ├── Program Portable
│   │   ├── Compressed
│   │   │   ├── Ratiborus KMS Tools 01.16.2019.rar
│   │   │   ├── FolderSize.rar
│   │   │   ├── FoxitPDFEditorPro.rar
│   │   │   ├── Pichon.rar
│   │   │   └── RevoUninstallerPro.rar
│   │   ├── Extracted
│   │   │   ├── RevoUninstallerPro-v4.0.0
│   │   │   │   ├── ...
│   │   │   │   ├── RevoUninstallerProPortable.exe
│   │   │   │   └── ...
│   │   │   └── ...
│   │   └── _Optionals
│   ├── Program Installer
│   │   ├── ...
│   │   └── _Optionals
│   └── _Lainnya
├── Kaesa _Lainnya
│   ├── Accounts
│   ├── Android
│   ├── Microsoft Products
│   │   ├── Operating System
│   │   ├── Office
│   │   └── Driver
│   ├── Mikrotik
│   └── Virtual Machine
└── README.md
```

Videos
- Musics (Harus selalu sync)
- Guides (Harus selalu sync)

### Partisi 02
Menyimpan Anime saja.

Contoh penamaan `folder`:
- `Anime Name Sxx (2020) <720p/1080p>`

Contoh penamaan `file`:
- `Anime Name SxxEyy <720p/1080p> <BD> <OVA/ONA/Special>`
- `Anime Name S01E01 720p BD`
- `Anime Name S01E01 720p BD OVA`
- `Anime Name S01E01 720p BD ONA`
- `Anime Name S01E01 720p BD Special`

## HDD Eksternal Enclosure Farhan 1TB
Hanya ada `satu partisi` saja yaitu `DATA`. Difungsikan untuk share data `Films`, `Games`, `Manga/Manhua/Manhwa`, dsb.

```tree
X: DATA
├── Areyon Datas
├── Farhan Datas
├── Kaesa Anime Unedited
├── Kaesa Films
├── Kaesa Games
│   ├── Installer
│   ├── Portable
│   └── README.txt
└── Tachidesk
    ├── downloads
    │   ├── Bato.to (ID)
    │   └── Komik Cast (ID)
    └── ...
```

### Kaesa Anime Unedited
- Hanya untuk penyimpanan anime sementara.

### Kaesa Games
- `Installer`
	Perlu menjalankan `setup wizard` alias install/pasang dulu baru main.
- `Portable`
	Tidak perlu melakukan `setup wizard` atau install/pemasangan aplikasi, langsung jalankan file game `.exe` bisa langsung main.

## Tachidesk
- Ada di `Laptop` partisi `Local Disk E:` juga.