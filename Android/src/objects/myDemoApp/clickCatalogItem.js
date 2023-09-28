/**
 * Fungsi click item yg ada di catalog untuk aplikasi Mobile myDemoApp
 *
 * @param {Promise<WebdriverIO.Browser>} driver - Driver webdriverIO
 * @param {number} itemNumber - nomor item dari 1 - 6
 *
 * @returns {Promise<void>}
 */
async function clickItem(driver, itemNumber) {
  await driver
    .$(
      `(//android.view.ViewGroup[@content-desc="store item"])[${itemNumber}]/android.view.ViewGroup[1]`
    )
    .click();
}
module.exports = clickItem;
