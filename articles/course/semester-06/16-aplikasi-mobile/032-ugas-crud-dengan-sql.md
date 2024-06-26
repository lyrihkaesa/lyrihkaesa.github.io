# TUGAS CRUD dengan SQL

## Pertemuan Minggu ke-03 - 01

Tugas membuat CRUD dengan SQL Lite. Obat-obatan minimal 5 atribute.

Menyimpan obat-obatan.
## Pertemuan Minggu ke-03 part 02

Saya lupa ini membahas apa akan tetapi terdapat tugas individu.

## 📑 Tugas Individu

Buat aplikasi pendataan obat, desain table-nya dan buat video presentasi _on camera_, kirim _link_ hasil program ke KULINO ini!

### Aplikasi CRUD Obat

#### Layout

Kaesa menggunakan **View Binding**

View Binding adalah sebuah fitur yang memungkinkan kita untuk **binding (mengikat)** sebuah properti ke elemen view. Library ini secara otomatis akan memberi akses langsung ke semua view yang ada di dalam XML. Dengan demikian kita tidak perlu secara eksplisit melakukan binding ke elemen view menggunakan `findViewByID()` atau library lainnya.

Cara Mengaktifkan View Binding

Secara default View Binding tidak otomatis aktif. Untuk mengaktifkannya, Anda perlu menambahkan kode berikut pada `build.gradle` di level module `(Module:app)` yang akan menggunakan View Binding.

```gradle
android {
    ...
    buildFeatures {
        viewBinding true
    }
}
```

#### Code SQL

```sql
CREATE TABLE obat (
  id_obat INT PRIMARY KEY,
  nama_obat VARCHAR(50),
  jenis_obat VARCHAR(20),
  harga DECIMAL(10,2),
  jumlah INT,
  distributor VARCHAR(50)
);

INSERT INTO obat (id_obat, nama_obat, jenis_obat, harga, jumlah, distributor)
VALUES
  (1, 'Paracetamol', 'Tablet', 5000, 100, 'Apotek B'),
  (2, 'Amoxicillin', 'Kapsul', 15000, 50, 'Apotek C'),
  (3, 'Simvastatin', 'Tablet', 25000, 75, 'Apotek D'),
  (4, 'Omeprazole', 'Kapsul', 10000, 200, 'Apotek E'),
  (5, 'Metformin', 'Tablet', 8000, 150, 'Apotek F');
```
