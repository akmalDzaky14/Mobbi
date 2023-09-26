const { By, WebDriver } = require("selenium-webdriver");
const Page = require("./Page");

class CheckoutPage extends Page {
  /** @type {By} */ pageTitleEl = By.className("subheader");

  /** @type {By} */ firstNameEl = By.id("first-name");
  /** @type {By} */ lastNameEl = By.id("last-name");
  /** @type {By} */ zipEl = By.id("postal-code");

  /** @type {By} */ continueEl = By.className("cart_button");
  /** @type {By} */ errorEl = By.css('h3[data-test="error"]');

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
   * Melakukan proses isi Form.
   *
   * @param {string} firstName Nama depan.
   * @param {string} lastName Nama belakang.
   * @param {string} zip Kode POS.
   * @returns {Promise<void>}
   */
  async FormFillProcess(firstName, lastName, zip) {
    await this.driver.findElement(this.firstNameEl).sendKeys(firstName);
    await this.driver.findElement(this.lastNameEl).sendKeys(lastName);
    await this.driver.findElement(this.zipEl).sendKeys(zip);

    await this.driver.findElement(this.continueEl).click();
  }

  /**
   * Membersihkan form checkout
   *
   * @returns {Promise<void>} - Promise yang mengembalikan void jika form berhasil dibersihkan
   */
  async clearForm() {
    await this.openUrl("/checkout-step-one.html");
  }

  /**
   * Mendapatkan pesan error yang ditampilkan pada halaman.
   *
   * @returns {Promise<string>} - Promise yang mengembalikan string jika berhasil
   */
  async getErrorMessage() {
    return await this.driver.findElement(this.errorEl).getText();
  }
}

module.exports = CheckoutPage;
