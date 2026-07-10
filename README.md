# 📸 SnapCheck — Smart Attendance & Travel Journal
## 🚀 Fitur Utama

### 🟢 Level 1: Core Features
* **Dual Native Access:** Mengakses kamera fisik dan mengunci koordinat lokasi GPS secara bersamaan dengan satu klik tombol.
* **Aesthetic Circular Preview:** Foto hasil jepretan otomatis dipotong berbentuk lingkaran sempurna dengan garis tepi (*border*) aksen hijau emerald yang elegan.
* **Real-time Metrics:** Menampilkan data garis lintang (*Latitude*) dan garis bujur (*Longitude*) yang presisi langsung setelah pengambilan gambar berhasil.

### 🔵 Level 2: Advanced Upgrades
* **Google Maps Integration:** Menyediakan tombol dinamis untuk langsung membuka titik koordinat pengguna di aplikasi Google Maps eksternal menggunakan modul `Linking`.
* **Graceful Permission Handling:** Menangani penolakan izin akses kamera/lokasi secara anggun dengan dialog peringatan kustom (`Alert.alert`) serta tombol pintas menuju Menu Pengaturan (*Settings*) HP jika akses dinonaktifkan.
* **State Reset capability:** Fitur untuk menghapus data cache gambar dan lokasi dari memori sementara agar user dapat mengulang proses *check-in*.

---
## 📸 Pembuktian (*Screenshots*)

- [x] ( <img width="720" height="1600" alt="hasilsukses" src="https://github.com/user-attachments/assets/719efe23-e31b-44d1-88ac-365dab75e631" />
 )hasil foto/lokasi
- [x] ( <img width="720" height="1600" alt="dialogizin1" src="https://github.com/user-attachments/assets/299d917c-24d5-43dc-9dad-2e87cfe5829c" />
 ) dialog izin ( <img width="720" height="1600" alt="dialogizin2" src="https://github.com/user-attachments/assets/004bdaca-6271-4e77-b185-fa43a37e3c84" />
 )
- [x] penanganan penolakan ( <img width="720" height="1600" alt="penolakan" src="https://github.com/user-attachments/assets/e28cd89c-cc81-4d5c-81df-780c9c7b6ad9" />
 )

Cara menjalankan & tech stack + link Expo Snack
🛠️ 1. Tech Stack (Teknologi yang Digunakan)
Aplikasi ini dibangun menggunakan ekosistem modern React Native untuk memastikan fungsionalitas cross-platform:
-Framework Utama: React Native (Expo SDK)
-Akses Kamera: expo-image-picker (Digunakan untuk meluncurkan kamera fisik bawaan ponsel secara aman).
-Akses GPS/Lokasi: expo-location (Digunakan untuk melacak dan mengunci koordinat garis lintang dan bujur secara real-time).
-Interaksi Peta Eksternal: React Native Linking API (Membuka aplikasi Google Maps bawaan perangkat dengan melemparkan parameter koordinat dinamis).
-Bahasa Pemrograman: JavaScript (ES6+)
