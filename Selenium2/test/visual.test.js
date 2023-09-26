/**
 * Test suite untuk melakukan visual testing
 * dengan membandingkan screenshot beberapa halaman web.
 */

const setupDriver = require("../src/utils/setupDriver");
const { VCT, setDriver } = require("../src/utils/setupVisualTest");
const { WebDriver } = require("selenium-webdriver");

describe("Visual Test Website", () => {
  /** @type {WebDriver} */ let driver;

  before(async function () {
    driver = await setupDriver();
    setDriver(driver);
  });

  afterEach(async function () {
    await driver.sleep(500);
  });

  after(async function () {
    await driver.close();
  });

  it("Halaman Tokopedia", async () => {
    await VCT(
      "Tokopedia",
      "https://www.tokopedia.com/help/article/syarat-dan-ketentuan-flash-sale-kejar-diskon-spesial-99"
    );
  });

  it("Halaman Sauce Demo", async () => {
    await VCT("saucedemo", "https://www.saucedemo.com/v1/");
  });

  it("Halaman onnoCenter", async () => {
    await VCT(
      "onnoCenter",
      "https://lms.onnocenter.or.id/wiki/index.php/Main_Page"
    );
  });

  it("Halaman npmjs", async () => {
    await VCT("npmjs", "https://docs.npmjs.com/");
  });

  it("Halaman knightlab", async () => {
    await VCT("knightlab", "https://knightlab.northwestern.edu/posts/");
  });
});
