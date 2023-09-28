/**
 * Fungsi sort item pada halaman Catalog, dengan pilihan [nameAsc, nameDesc, priceAsc, priceDesc]
 *
 * @param {Promise<WebdriverIO.Browser>} driver
 * @param {string} sortBy
 * @return {Promise<void>}
 */
async function sortCatalog(driver, sortBy) {
  await driver
    .$('//android.view.ViewGroup[@content-desc="sort button"]')
    .click();
  await driver.waitUntil(
    async () => {
      return (
        (await driver
          .$(
            "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView"
          )
          .getText()) === "Sort by:"
      );
    },
    {
      timeout: 5000,
      timeoutMsg: "expected popup to appeard within 5s",
    }
  );
  await driver.$(`~${sortBy}`).click();
  await driver.waitUntil(
    async () => {
      return (
        (await driver
          .$(
            "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView"
          )
          .getText()) === "Sort by:"
      );
    },
    {
      timeout: 5000,
      timeoutMsg: "expected popup to appeard within 5s",
    }
  );
}

module.exports = sortCatalog;
