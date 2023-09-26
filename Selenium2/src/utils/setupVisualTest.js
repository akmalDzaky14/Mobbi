const chai = require("chai");
const { chaiImage } = require("chai-image");
const { existsSync, writeFileSync, readFileSync } = require("fs");
chai.use(chaiImage);

async function VCT(driver, PAGE_NAME, PAGE_URL) {
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

module.exports = VCT;
