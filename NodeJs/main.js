/**
 * TUGAS
 * - buatlah sistem yang menerima user input berupa nilai mata kuliah
 * - ubahlah nilai tersebut dari angka menjadi huruf dari A sampai F
 * - user tidak boleh menginput angka dibawah 0 atau di atas 100
 */

const prompt = require("prompt-sync")();

const jawaban = Number(prompt("Nilai anda: "));

if (jawaban < 0 || jawaban > 100) {
  console.log("nilai harus 0 - 100");
  return;
}
if (jawaban < 60) {
  console.log("Nilai hasil konversi: F");
  return;
} else if (jawaban < 70) {
  console.log("Nilai hasil konversi: D");
  return;
} else if (jawaban < 80) {
  console.log("Nilai hasil konversi: C");
  return;
} else if (jawaban < 90) {
  console.log("Nilai hasil konversi: B");
  return;
} else if (jawaban <= 100) {
  console.log("Nilai hasil konversi: A");
  return;
}
