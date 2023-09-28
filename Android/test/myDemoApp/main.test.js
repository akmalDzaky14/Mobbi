const { expect } = require("chai");
const setDriver = require("../../src/utils/setDriver");
const options = require("../../src/driverOptions/myDemoApp");
const clickItem = require("../../src/objects/myDemoApp/clickCatalogItem");
const clickMenu = require("../../src/objects/myDemoApp/clickMenu");
const sortCatalog = require("../../src/objects/myDemoApp/sortFn");
const getNames = require("../../src/objects/myDemoApp/getSortedName");
const getPrices = require("../../src/objects/myDemoApp/getSortedPrices");
const waitTitleChangeFn = require("../../src/objects/myDemoApp/waitTitleChange");
const selectColour = require("../../src/objects/myDemoApp/clickItemColour");
const selectStar = require("../../src/objects/myDemoApp/clickCatalogStar");
const setQTY = require("../../src/objects/myDemoApp/clickPlusMinusCatalog");

describe("Test Aplikasi 2 - My Demo App", function () {
  /** @type {Promise<WebdriverIO.Browser>} */ let driver;

  before(async function () {
    driver = await setDriver(options);
  });
  after(async function () {
    await driver.closeApp();
  });

  describe("Test Sort Item", () => {
    it("By Name Descending", async function () {
      sortCatalog(driver, "nameDesc");

      await driver.pause(2000);
      const { name1, name2 } = await getNames(driver);

      expect(name1).to.satisfy((x) => x > name2);
    });

    it("By Name Ascending", async function () {
      sortCatalog(driver, "nameAsc");

      await driver.pause(2000);
      const { name1, name2 } = await getNames(driver);

      expect(name1).to.satisfy((x) => x < name2);
    });

    it("By Price Ascending", async function () {
      sortCatalog(driver, "priceAsc");

      await driver.pause(2000);
      const { price1, price2 } = await getPrices(driver);

      expect(price1).to.satisfy((num) => num < price2);
    });

    it("By Price Descending", async function () {
      sortCatalog(driver, "priceDesc");

      await driver.pause(2000);
      const { price1, price2 } = await getPrices(driver);

      expect(price1).to.satisfy((num) => num > price2);
    });
  });

  describe.only("Test Detail Product", () => {
    it("Select Catalog Item", async () => {
      await clickItem(driver, 1);
      await waitTitleChangeFn(driver, "Sauce Labs Backpack");
      const title = await driver
        .$(
          '//android.view.ViewGroup[@content-desc="container header"]/android.widget.TextView'
        )
        .getText();
      expect(title).to.equal("Sauce Labs Backpack");
    });

    it("Select Color Circle", async () => {
      // Tidak bisa divalidasi kecuali visual
      await selectColour(driver, "black");
      await selectColour(driver, "blue");
      await selectColour(driver, "gray");
      await selectColour(driver, "red");
    });

    it("Slect Rating", async () => {
      await selectStar(driver, 4);
      await selectStar(driver, 1);
      await selectStar(driver, 5);
    });

    it("Plus and Minus Button", async () => {
      await setQTY(driver, "plus", 5);
      await setQTY(driver, "minus", 4);
    });

    it("Check if button is active when QTY is 0", async () => {
      await setQTY(driver, "minus", 2);
      const status = await driver.$("~Add To Cart button").isEnabled();
      expect(status).is.equal(false);
    });

    it("Open Cart Page when Item is 0", async () => {
      await driver.$("~cart badge").click();
      waitTitleChangeFn(driver, "No Items");
      // waitTitleChangeFn(driver, "My Cart");
      const Tittle = await driver
        .$(
          '//android.view.ViewGroup[@content-desc="container header"]/android.widget.TextView'
        )
        .getText();
      expect(Tittle).to.equal("No Items");
      await driver.back();
    });

    it("Add Item to Cart", async () => {
      await setQTY(driver, "plus", 3);
      await driver.$("~Add To Cart button").click();
      await driver.pause(2000);
      const cartNum = await driver
        .$(
          '//android.view.ViewGroup[@content-desc="cart badge"]/android.widget.TextView'
        )
        .getText();
      expect(cartNum).to.equal("3");
    });

    it("Open Cart Page", async () => {
      await driver.$("~cart badge").click();
      // waitTitleChangeFn(driver, "No Items");
      waitTitleChangeFn(driver, "My Cart");
      const Tittle = await driver
        .$(
          '//android.view.ViewGroup[@content-desc="container header"]/android.widget.TextView'
        )
        .getText();
      expect(Tittle).to.equal("My Cart");
      await clickMenu(driver, "catalog");
      await driver.pause(2000);
    });
  });
});
