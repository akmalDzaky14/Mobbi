const { WebDriver } = require("selenium-webdriver");

class Page {
  /**
   * Konfigurasi driver
   *
   * @param {WebDriver} driver - Driver untuk mengakses halaman */
  constructor(driver) {
    /** @type {WebDriver} */ this.driver = driver;
  }

  /**
   * Membuka URL halaman
   *
   * @param {string} [path="/"] - Path URL yang ingin dibuka
   * @returns {Promise<void>} - Promise yang mengembalikan void
   */
  async openUrl(path = "/") {
    this.driver.get("https://www.saucedemo.com/v1" + path);
  }
}

module.exports = Page;
