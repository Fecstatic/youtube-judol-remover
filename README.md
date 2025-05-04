# JUDOL REMOVER
Project ini adalah open source. Feel free kalau teman-teman mau berkontribusi ^_^. Daftar kata-kata terlarang bisa ditambahkan pada file `block.json`, pastikan kata-kata yang ditambahkan tidak terlalu generik dan cukup efektif menyasar komentar judol.

**Website**: [Judol Remover](https://judol-remover.fecstatic.com)

**Another Interesting Project**: [Fecstatic](https://fecstatic.com)

[![YouTube](https://img.icons8.com/ios-filled/24/000000/youtube-play.png) YouTube](https://www.youtube.com/@fecstatic)

[![Instagram](https://img.icons8.com/ios-filled/24/000000/instagram-new.png) Instagram](https://www.instagram.com/frxldi)


## Langkah-Langkah:

1. Buat project baru di [Google Cloud Console](https://console.cloud.google.com).
2. Klik tab di sebelah kiri dan pilih **API & Services**.
3. Cari [**YouTube Data API v3**](https://console.cloud.google.com/apis/library/youtube.googleapis.com), pilih, lalu klik **Enable**.
4. Klik tab sebelah kiri dan pilih [**Client - Google Auth Platform**](https://console.cloud.google.com/auth/clients).
5. Klik **Get Started** dan isi seluruh form yang tersedia.
6. Klik **Create OAuth Client**.
7. Isi nama dan informasi lainnya sesuai kebutuhan.
8. Klik **Add URIs** pada bagian **Authorized Redirect URI**.
9. Masukkan URL berikut: https://judol-remover.fecstatic.com/api/auth/callback
10. Klik **Save** untuk menyimpan konfigurasi.
11. Klik tab **Audience**.
12. Klik **Add Users**.
13. Masukkan email yang sesuai dengan akun Google yang ingin digunakan.
14. Buka website [Judol Remover](https://judol-remover.fecstatic.com).
15. Klik **Get Started**, lalu masukkan **Client Secret** dan **Client ID** dari langkah ke-10 tadi.
16. Klik **Lanjutkan** meskipun aplikasi belum terverifikasi.
17. Pilih **Izinkan semua** saat diminta izin akses.
18. Klik **Lanjutkan** untuk melanjutkan proses.
19. Anda akan otomatis diarahkan (redirect) ke dashboard aplikasi.
20. Pilih video yang ingin dihapus komentar "judol"-nya, lalu klik **Delete**.

---

> **Catatan:** Pastikan akun Google yang digunakan sudah ditambahkan pada langkah 13 agar proses otorisasi berjalan lancar.

## Self-host:

- Ganti .env.example menjadi .env
- Sesuaikan BASE_URL sesuai alamat website nantinya. Apabila berjalan di localhost masa cukup isi http://localhost:3000

### Menjalankan Website:
#### Localhost langsung:
1. Clone repository ini `git clone https://github.com/Fecstatic/youtube-judol-remover.git`
2. Install NodeJS https://nodejs.org/id/download (Disarankan Versi 22)
3. Install Yarn `npm install --global yarn`
4. Ketik `yarn install` pada terminal
5. Ketik `yarn dev` pada terminal
6. Buka http://localhost:3000 pada browser

#### Localhost Docker:
1. Pastikan sudah menginstall docker
2. Build docker dari Dockerfile yang ada
3. Buka http://localhost:3000 pada browser

#### VPS:
1. Gunakan Dockerfile sebagai entrypoint.
2. Gunakan port 3000 dan deploy seperti aplikasi pada umumnya
3. Buka alamat sesuai domain yang diatur

## Tech Stack:
- Yarn
- NextJS 15 Canary App Router
- YouTube API