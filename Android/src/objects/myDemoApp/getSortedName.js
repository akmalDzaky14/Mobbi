/**
 * Mendapatkan 2 name Item setelah fungsi sort dijalankan
 *
 * @param {Promise<WebdriverIO.Browser>} driver
 * @return {Promise<string>}
 */
async function getNames(driver) {
  const name1 = await driver
    .$('(//android.widget.TextView[@content-desc="store item text"])[1]')
    .getText();
  const name2 = await driver
    .$('(//android.widget.TextView[@content-desc="store item text"])[2]')
    .getText();
  return { name1, name2 };
}

module.exports = getNames;
