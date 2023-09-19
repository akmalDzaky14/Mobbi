function validate(input) {
  if (input < 0) {
    return "Nilai harus lebih dari 0";
  } else if (input > 100) {
    return "Nilai harus kurang dari 100";
  } else if (isNaN(input) && input != undefined) {
    return "Nilai harus Angka";
  } else if (typeof input === "string") {
    return "Nilai tidak boleh spasi atau kosong";
  } else if (input === undefined) {
    return "Error! Tidak ada input!";
  } else {
    return true;
  }
}

module.exports = validate;
