/**
 * Memilih warna pada halaman Detail Product
 *
 * @param {Promise<WebdriverIO.Browser>} driver
 * @param {string} Colour - Plihan warna
 */
async function selectColour(driver, Colour) {
  await driver
    .$(
      `//android.view.ViewGroup[@content-desc="${Colour} circle"]/android.view.ViewGroup`
    )
    .click();
}

module.exports = selectColour;
