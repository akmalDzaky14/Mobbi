const { By, WebDriver } = require("selenium-webdriver");
const Page = require("./Page");

class InventoryPage extends Page {
  /**
   * Membuat instance halaman inventaris.
   *
   * @param {WebDriver} driver Driver WebDriver yang digunakan untuk berinteraksi dengan halaman.
   */
  constructor(driver) {
    super(driver);
  }

  /** @type {By} */ pageTitleEl = By.css(".product_label");

  /**
   * Membuka halaman Inventory.
   *
   * @returns {Promise<void>}
   */
  async openInventory() {
    await this.openUrl("/inventory.html");
  }

  /**
   * Mendapatkan judul halaman.
   *
   * @returns {Promise<string>}
   */
  async getPageTitle() {
    return await this.driver.findElement(this.pageTitleEl).getText();
  }

  /**
   * Memilih item untuk dimasukkan ke Cart
   *
   * @param {Array<number>} arr - Array berisi angka, panjang dan isi arr dari 0 samapi 5
   */
  async selectItems(arr) {
    let items = await this.driver.findElements(By.className("inventory_item"));
    if (arr.length < 5) {
      for (let x in arr) {
        if (arr[x] > 5) return "isi > 5";

        const a = arr[x];
        await items[a].findElement(By.css(".pricebar button")).click();
      }
      const cartNum = Number(
        await this.driver
          .findElement(By.className("shopping_cart_badge"))
          .getText()
      );
      return cartNum;
    }
    return "panjang > 5";
  }

  /**
   * Membuka halaman Cart.
   *
   * @returns {Promise<void>} - Promise yang mengembalikan void jika berhasil
   */
  async openCartPage() {
    await this.driver.findElement(By.className("shopping_cart_link")).click();
  }
}

module.exports = InventoryPage;
