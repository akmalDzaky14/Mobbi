/** Catatan
 * * TUGAS 1
 * 1. buatlah sistem yang menerima user input berupa nilai mata kuliah
 * 2. ubahlah nilai tersebut dari angka menjadi huruf dari A sampai F
 * 3. user tidak boleh menginput angka dibawah 0 atau di atas 100
 *
 * * TUGAS 2
 * 1. di dalam folder project tugas membuat konversi nilai yang telah kalian buat sebelumnya, silahkan install mocha dan chai
 * 2. buat unit test untuk menguji programnya berjalan sesuai dengan ekspektasi atau tidak
 * 3. sebelum membuat test, buat kodenya agar bisa di test (contoh: pisahkan logic yang isinya if dan prompt/while, hasil dari if nya di return)
 * 4. buat positve dan negative test nya, terutama di bagian ketika kosong, atau nilainya diluar batas, atau tipe datanya salah
 */

const convertNilai = require("./method/convertNilai");
const prompt = require("prompt-sync")();

const input = prompt("Nilai anda: ");
const hasil = convertNilai(input);
console.log(hasil);
