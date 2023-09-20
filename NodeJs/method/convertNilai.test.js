const { expect } = require("chai");
const convertNilai = require("./convertNilai");

describe("Test Konversi Nilai", () => {
  describe("Test Positive", () => {
    it("harus mengembalikan nilai A jika nilai 90 - 100", () => {
      expect(convertNilai(90)).to.equal("Nilai hasil konversi: A");
    });
    it("harus mengembalikan nilai B jika nilai 80 - 89", () => {
      expect(convertNilai(85)).to.equal("Nilai hasil konversi: B");
    });
    it("harus mengembalikan nilai C jika nilai 70 - 79", () => {
      expect(convertNilai(72)).to.equal("Nilai hasil konversi: C");
    });
    it("harus mengembalikan nilai D jika nilai 60 - 69", () => {
      expect(convertNilai(67)).to.equal("Nilai hasil konversi: D");
    });
    it("harus mengembalikan nilai F jika nilai 0 - 59", () => {
      expect(convertNilai(50)).to.equal("Nilai hasil konversi: F");
    });
  });

  describe("Test Negative", () => {
    it("harus mengembalikan pesan kesalahan jika nilai kurang dari 0", () => {
      expect(convertNilai(-1)).to.equal("Nilai harus lebih dari 0");
    });
    it("harus mengembalikan pesan kesalahan jika nilai lebih dari 100", () => {
      expect(convertNilai(101)).to.equal("Nilai harus kurang dari 100");
    });
    it("harus mengembalikan pesan kesalahan jika nilai bukan angka", () => {
      expect(convertNilai("asd")).to.equal("Nilai harus Angka");
    });
    it("harus mengembalikan pesan kesalahan jika hanya memanggil method", () => {
      expect(convertNilai()).to.equal("Error! Tidak ada input!");
    });
    it("harus mengembalikan pesan kesalahan jika nilai kosong", () => {
      expect(convertNilai("")).to.equal("Nilai tidak boleh spasi atau kosong");
    });
    it("harus mengembalikan pesan kesalahan jika nilai spasi", () => {
      expect(convertNilai(" ")).to.equal("Nilai tidak boleh spasi atau kosong");
    });
  });
});
