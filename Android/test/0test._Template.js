const { expect } = require("chai");
const setDriver = require("../../src/utils/setDriver");
const YourDriverOptions = require("../src/driverOptions/YourDriverOptions");
const YourPage = require("../src/pageObjects/YourPage");

describe.skip("your test story", function () {
  /** @type {Promise<WebdriverIO.Browser>} */ let driver;
  /** @type {YourPage} */ let yourPage;

  before(async function () {
    driver = await setDriver(YourDriverOptions);
    yourPage = new YourPage(driver);
  });

  it("your test case", async function () {
    const res = await yourPage.openPage();
    expect(res).to.be.true;
  });

  after(async function () {
    await driver.deleteSession();
  });
});
