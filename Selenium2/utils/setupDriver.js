const { Builder, Browser } = require("selenium-webdriver");
/**
 * Mengatur driver untuk browser Edge
 *
 * @return {Promise<WebDriver>} - Promise yang mengembalikan driver
 */
async function setupDriver() {
  const driver = await new Builder().forBrowser(Browser.EDGE).build();
  return driver;
}

module.exports = setupDriver;
