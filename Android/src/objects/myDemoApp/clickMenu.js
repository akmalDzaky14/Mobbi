/**
 * Membuka Menu dan memilih item jika disediakan
 *
 * @param {Promise<WebdriverIO.Browser>} driver
 * @param {string} [menuItem] - Item menu yang akan dipilih
 * @returns {Promise<void>}
 */
async function clickMenu(driver, menuItem) {
  await driver.$('//android.view.ViewGroup[@content-desc="open menu"]').click();
  if (menuItem) {
    await driver
      .$(`//android.view.ViewGroup[@content-desc="menu item ${menuItem}"]`)
      .click();
  }
}

module.exports = clickMenu;
