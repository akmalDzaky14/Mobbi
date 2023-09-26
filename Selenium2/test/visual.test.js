const setupDriver = require("../src/utils/setupDriver");
const VCT = require("../src/utils/setupVisualTest");
const { WebDriver } = require("selenium-webdriver");

describe("Visual Test Website", () => {
  /** @type {WebDriver} */ let driver;

  before(async function () {
    driver = await setupDriver();
  });

  after(async function () {
    await driver.close();
    console.log("Test Selesai");
  });

  it("Halaman chai-image", async () => {
    await VCT(
      driver,
      "past_Life_Returner",
      "https://reaperscans.com/comics/4450-past-life-returner"
    );
  });
});
