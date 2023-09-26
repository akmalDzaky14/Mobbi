const { By, WebDriver } = require("selenium-webdriver");
const Page = require("./Page");
const { elementIsVisible } = require("selenium-webdriver/lib/until");

class OverViewPage extends Page {
  /** @type {By} */ pageTitleEl = By.className("subheader");

  /**
   * Membuat instance halaman inventaris.
   *
   * @param {WebDriver} driver Driver WebDriver yang digunakan untuk berinteraksi dengan halaman.
   */
  constructor(driver) {
    super(driver);
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
   * Menekan tombol Finish
   *
   * @returns {Promise<void>}
   */
  async clickFinishButton() {
    await this.driver.findElement(By.className("cart_button")).click();
  }

  /**
   * Melakukan logout dari situs web
   *
   * @returns {Promise<void>} - Promise yang mengembalikan void jika logout berhasil
   */
  async logoutFromWebsite() {
    await this.driver.findElement(By.css(".bm-burger-button")).click();
    const logout = await this.driver.findElement(By.id("logout_sidebar_link"));
    await this.driver.wait(elementIsVisible(logout), 3000);
    await logout.click();
  }
}

module.exports = OverViewPage;
