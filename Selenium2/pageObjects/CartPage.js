const { By, WebDriver } = require("selenium-webdriver");
const Page = require("./Page");

class CartPage extends Page {
  /**
   * Membuat instance halaman inventaris.
   *
   * @param {WebDriver} driver Driver WebDriver yang digunakan untuk berinteraksi dengan halaman.
   */
  constructor(driver) {
    super(driver);
  }

  /** @type {By} */ pageTitleEl = By.className("subheader");

  /**
   * Mendapatkan judul halaman.
   *
   * @returns {Promise<string>}
   */
  async getPageTitle() {
    return await this.driver.findElement(this.pageTitleEl).getText();
  }

  /**
   * Menghapus item dari Cart
   *
   * @param {number} num - Indeks item yang akan dihapus
   * @returns {boolean | string} - `true` jika item berhasil dihapus, atau `string` berisi pesan kesalahan jika item tidak ada
   */
  async deleteItems(num) {
    let items = await this.driver.findElements(By.className("cart_item"));
    if (num < items.length) {
      await items[num].findElement(By.className("cart_button")).click();
      return true;
    }
    return "Pilihan tidak ada";
  }

  /**
   * Membuka halaman Checkout.
   *
   * @returns {Promise<void>}
   */
  async openChekoutPage() {
    await this.driver.findElement(By.className("checkout_button")).click();
  }
}

module.exports = CartPage;
