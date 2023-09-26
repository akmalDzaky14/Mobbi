const chai = require("chai");
const { chaiImage } = require("chai-image");
const { existsSync, writeFileSync, readFileSync } = require("fs");
const { WebDriver } = require("selenium-webdriver");
chai.use(chaiImage);

let driver;

/**
 * Instance Webdriver Selenium
 *
 * @param {WebDriver} driverParam
 */
function setDriver(driverParam) {
  driver = driverParam;
}

/**
 * Melakukan visual comparison test dengan membandingkan screenshot halaman saat ini
 * dengan baseline screenshot yang sudah ada sebelumnya.
 *
 * @param {string} PAGE_NAME - Nama halaman untuk penamaan file screenshot
 * @param {string} PAGE_URL - URL halaman yang akan di-screenshot
 *
 * @returns {Promise<void>}
 */
async function VCT(PAGE_NAME, PAGE_URL) {
  const baseScreenshotPath = `src/screenshots/base/${PAGE_NAME}.jpg`;
  const actualScreenshotPath = `src/screenshots/actual/${PAGE_NAME}.jpg`;
  /** Boolean */ const isBaseScreenshotExist = existsSync(baseScreenshotPath);

  await driver.get(PAGE_URL);

  const pageScreenshot = await driver.takeScreenshot();
  const pageScreenshotBuffer = Buffer.from(pageScreenshot, "base64");

  if (isBaseScreenshotExist) {
    const baseScreenshotBuffer = readFileSync(baseScreenshotPath);

    writeFileSync(actualScreenshotPath, pageScreenshotBuffer);

    chai.expect(pageScreenshotBuffer).to.matchImage(baseScreenshotBuffer);
  } else {
    writeFileSync(baseScreenshotPath, pageScreenshotBuffer);
  }
}

module.exports = { VCT, setDriver };
