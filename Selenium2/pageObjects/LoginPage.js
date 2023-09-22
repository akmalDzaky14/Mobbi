const { By, WebDriver } = require("selenium-webdriver");
const Page = require("./Page");

class LoginPage extends Page {
  /** @type {By} */ usernameEl = By.css("#user-name");
  /** @type {By} */ passwordEl = By.css("#password");
  /** @type {By} */ submitEl = By.css("#login-button");
  /** @type {By} */ errorEl = By.css('h3[data-test="error"]');

  /**
   * Membuat instance halaman login.
   *
   * @param {WebDriver} driver Driver WebDriver yang digunakan untuk berinteraksi dengan halaman.
   */
  constructor(driver) {
    super(driver);
  }

  /**
   * Membuka halaman login.
   *
   * @returns {Promise<void>}
   */
  async openPage() {
    await this.openUrl("/");
  }

  /**
   * Melakukan proses login.
   *
   * @param {string} username Nama pengguna.
   * @param {string} password Kata sandi.
   * @returns {Promise<void>}
   */
  async loginProcess(username, password) {
    await this.driver.findElement(this.usernameEl).sendKeys(username);
    await this.driver.findElement(this.passwordEl).sendKeys(password);
    await this.driver.findElement(this.submitEl).click();
  }

  /**
   * Mendapatkan pesan error yang ditampilkan pada halaman.
   *
   * @returns {Promise<string>}
   */
  async getErrorMessage() {
    return await this.driver.findElement(this.errorEl).getText();
  }

  /**
   * Mendapatkan URL dari halaman web saat ini
   *
   * @returns {Promise<string>} - Promise yang mengembalikan URL halaman web saat ini
   */
  async getURL() {
    const url = await this.driver.getCurrentUrl();
    return url;
  }
}

module.exports = LoginPage;
