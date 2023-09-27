const { expect } = require("chai");
const { remote } = require("webdriverio");
const options = require("../src/setOptions");

/** @type {Promise<WebdriverIO.Browser>} */ let driver;
async function clickLoginBtn() {
  return await driver.$('//*[@content-desc="button-LOGIN"]').click();
}
describe("Android Test", () => {
  before(async () => {
    driver = await remote(options);
    await driver.$("~Login").click();
  });

  after(async () => {
    (await driver).deleteSession();
  });

  describe("Negative Test", () => {
    afterEach(async function () {
      // Clear Login Form
      await driver.$("~input-password").setValue("");
      await driver.$("~input-email").setValue("");
    });

    it("Coba login tanpa email", async () => {
      await driver.$("~input-password").setValue("admin123");
      clickLoginBtn();
      await driver.pause(1500); //tunggu popup muncul
      const msg = await driver
        .$(
          '//*[@content-desc="Login-screen"]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[4]/android.widget.TextView[1]'
        )
        .getText();
      expect(msg).to.equal("Please enter a valid email address");
    });

    it("Coba login tanpa password", async () => {
      await driver.$("~input-email").setValue("akmal@gmail.com");
      clickLoginBtn();
      await driver.pause(1000); //tunggu popup muncul
      const msg = await driver
        .$(
          '//*[@content-desc="Login-screen"]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[4]/android.widget.TextView[2]'
        )
        .getText();
      expect(msg).to.equal("Please enter at least 8 characters");
    });
  });
  describe("Positive Test", () => {
    it("Coba login dengan email dan passowrd", async () => {
      await driver.$("~input-email").setValue("akmal@gmail.com");
      await driver.$("~input-password").setValue("admin123");
      clickLoginBtn();
      await driver.pause(3000); //tunggu popup muncul
      expect(await driver.$("id=android:id/message").getText()).to.equal(
        "You are logged in!"
      );
    });
  });
});
