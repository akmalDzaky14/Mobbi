const { Builder, By, Browser } = require("selenium-webdriver");

// Auto run tanpa memanggil method dengan (async () => {//code})();
(async () => {
  const driver = await new Builder().forBrowser(Browser.EDGE).build();

  try {
    await driver.get("https://www.saucedemo.com/v1/");
    await driver.findElement(By.id("user-name")).sendKeys("standard_user");
    await driver.findElement(By.id("password")).sendKeys("secret_sauce");
    await driver.findElement(By.id("login-button")).click();

    await driver.sleep(1000);
    let items = await driver.findElements(By.className("inventory_item"));
    await items[0].findElement(By.css(".pricebar button")).click();
    await driver.sleep(1000);
    await items[4].findElement(By.css(".pricebar button")).click();
    await driver.sleep(1000);
    await items[3].findElement(By.css(".pricebar button")).click();
    await driver.sleep(1000);
    await driver.findElement(By.className("shopping_cart_link")).click();
    await driver.sleep(1000);
    let carts = await driver.findElements(By.className("cart_item"));
    await carts[0].findElement(By.className("cart_button")).click();
    await driver.sleep(3000);
    await driver.findElement(By.className("checkout_button")).click();
    await driver.sleep(1000);
    await driver.findElement(By.id("first-name")).sendKeys("Akmal");
    await driver.sleep(500);
    await driver.findElement(By.id("last-name")).sendKeys("Dzaky");
    await driver.sleep(500);
    await driver.findElement(By.id("postal-code")).sendKeys("44151");
    await driver.sleep(500);
    await driver.findElement(By.className("cart_button")).click();
    await driver.sleep(2000);
    await driver.findElement(By.className("cart_button")).click();
    await driver.sleep(2000);
    await driver.findElement(By.css(".bm-burger-button")).click();
    await driver.sleep(1000);
    const logout = await driver.findElement(By.id("logout_sidebar_link"));
    await driver.wait(until.elementIsVisible(logout), 3000);
    await driver.sleep(500);
    await logout.click();
  } finally {
    await driver.quit();
  }
})();
