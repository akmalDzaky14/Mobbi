const { WebDriver } = require("selenium-webdriver");
const { expect } = require("chai");
const setupDriver = require("../src/utils/setupDriver");
const LoginPage = require("../src/pageObjects/LoginPage");
const InventoryPage = require("../src/pageObjects/InventoryPage");
const CartPage = require("../src/pageObjects/CartPage");
const CheckoutPage = require("../src/pageObjects/CheckoutPage");
const OverViewPage = require("../src/pageObjects/OverviewPage");
describe.skip("Test Website saucedemo", () => {
  /** @type {WebDriver} */ let driver;
  /** @type {LoginPage} */ let loginPage;
  /** @type {InventoryPage} */ let inventoryPage;
  /** @type {CartPage} */ let cartPage;
  /** @type {CheckoutPage} */ let checkoutPage;
  /** @type {OverViewPage} */ let overViewPage;

  before(async function () {
    driver = await setupDriver();
    loginPage = new LoginPage(driver);
    inventoryPage = new InventoryPage(driver);
    cartPage = new CartPage(driver);
    checkoutPage = new CheckoutPage(driver);
    overViewPage = new OverViewPage(driver);
  });

  afterEach(async function () {
    await driver.sleep(500);
  });

  after(async function () {
    await driver.close();
  });

  it("[Negative] - Login dengan username salah", async () => {
    await loginPage.openPage();
    await loginPage.loginProcess("akmal", "secret_sauce");

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).to.include(
      "Username and password do not match any user"
    );
  });

  it("[Negative] - Login dengan password salah", async () => {
    await loginPage.openPage();
    await loginPage.loginProcess("standard_user", "akmal");

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).to.include(
      "Username and password do not match any user"
    );
  });

  it("Login dengan username dan password yang benar", async () => {
    await loginPage.openPage();
    await loginPage.loginProcess("standard_user", "secret_sauce");

    const productTitle = await inventoryPage.getPageTitle();
    expect(productTitle).to.be.equal("Products");
  });

  it("Pilih barang", async () => {
    const itemSelected = [0, 2, 3];
    // return angka/nilai di cart
    let result = await inventoryPage.selectItems(itemSelected);

    expect(result).to.be.a("number");
    expect(result).to.be.equal(itemSelected.length);
  });

  it("Pindah ke halaman Cart", async () => {
    await inventoryPage.openCartPage();

    const cartPageTitle = await cartPage.getPageTitle();
    expect(cartPageTitle).to.be.equal("Your Cart");
  });

  it("Hapus item dari Cart", async () => {
    const delItems = [0, 0];
    for (let i of delItems) {
      const del = await cartPage.deleteItems(delItems[i]);
      expect(del).to.be.equal(true);
    }
  });

  it("Pindah ke halaman Checkout", async () => {
    await cartPage.openChekoutPage();

    const checkoutPageTitle = await checkoutPage.getPageTitle();
    expect(checkoutPageTitle).to.be.equal("Checkout: Your Information");
  });

  it("[Negative] - Isi Form tanpa mengisi Nama depan", async () => {
    await checkoutPage.FormFillProcess("", "Dzaky", "44150");
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).to.include("First Name is required");

    await checkoutPage.clearForm();
  });

  it("[Negative] - Isi Form tanpa mengisi Nama belakang", async () => {
    await checkoutPage.FormFillProcess("Akmal", "", "44150");
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).to.include("Last Name is required");

    await checkoutPage.clearForm();
  });

  it("[Negative] - Isi Form tanpa mengisi Kode POS", async () => {
    await checkoutPage.FormFillProcess("Akmal", "Dzaky", "");
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).to.include("Postal Code is required");

    await checkoutPage.clearForm();
  });

  it("Isi Form dan Pindah ke halaman Overview", async () => {
    // Form tidak bisa di cek karena di halaman selanjutnya tidak ada informasi terkait form yg di isi
    await checkoutPage.FormFillProcess("Akmal", "Dzaky", "44150");

    const overviewPageTitle = await overViewPage.getPageTitle();
    expect(overviewPageTitle).to.be.equal("Checkout: Overview");
  });

  it("Finish dan logout", async () => {
    await overViewPage.clickFinishButton();
    await overViewPage.logoutFromWebsite();

    const url = await loginPage.getURL();
    expect(url).include("index.html");
  });
});
