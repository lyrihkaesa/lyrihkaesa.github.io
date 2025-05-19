# Debugging Wireless

```bash
adb tcpip 5555 # membuka port 5555
```

```bash
adb connect <ip-android:port> # adb connect 192.168.1.9:5555 - jika ingin konek
```

```bash
adb devices # melihat semua device yang terkoneksi
```

```bash
adb kill-server # mematikan server, dan menghapus juga device yang terlah terkoneksi
```

Debugging Wireless atau dengan Wi-Fi dengan mudah dilakukan untuk `Android 11` untuk `Android 10` ke bawah harus terkoneksi dengan USB Debugging dulu baru bisa terkoneksi dengan Debugging Wireless.

Debugging Wireless untuk Android 11 paling mudah dengan menggunakan `QR Code` yang ada pada `Android Studio` bagian emulator.