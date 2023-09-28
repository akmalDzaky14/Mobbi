/**
 * Mendapatkan 2 harga Item setelah fungsi sort dijalankan
 *
 * @param {Promise<WebdriverIO.Browser>} driver
 * @return {Promise<string>}
 */
async function getPrices(driver) {
  const price1 = await driver
    .$('(//android.widget.TextView[@content-desc="store item price"])[1]')
    .getText();
  const price2 = await driver
    .$('(//android.widget.TextView[@content-desc="store item price"])[2]')
    .getText();
  return { price1, price2 };
}

module.exports = getPrices;
