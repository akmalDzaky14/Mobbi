const inputVal = require("./InputValidation");
function convertNilai(nilai) {
  // validasi input sebelum konversi nilai
  let validate = inputVal(nilai);
  if (validate != true) return validate;
  if (nilai < 60) return "Nilai hasil konversi: F";
  if (nilai < 70) return "Nilai hasil konversi: D";
  if (nilai < 80) return "Nilai hasil konversi: C";
  if (nilai < 90) return "Nilai hasil konversi: B";
  if (nilai <= 100) return "Nilai hasil konversi: A";
}

module.exports = convertNilai;
