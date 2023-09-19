const inputVal = require("./InputValidation");
function convertNilai(nilai) {
  // validasi input sebelum konversi nilai
  let validate = inputVal(nilai);
  if (validate != true) {
    return validate;
  } else if (nilai < 60) {
    return "Nilai hasil konversi: F";
  } else if (nilai < 70) {
    return "Nilai hasil konversi: D";
  } else if (nilai < 80) {
    return "Nilai hasil konversi: C";
  } else if (nilai < 90) {
    return "Nilai hasil konversi: B";
  } else {
    return "Nilai hasil konversi: A";
  }
}

module.exports = convertNilai;
