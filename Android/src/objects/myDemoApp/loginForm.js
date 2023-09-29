/**
 * Fungsi isi form login di aplikasi my demo app
 *
 * @param {Promise<WebdriverIO.Browser>} driver
 * @param {string} username
 * @param {string} password
 *
 * @returns {Promise<void>}
 */
async function loginFn(driver, username, password) {
  await driver.$("~Username input field").setValue(username);
  await driver.$("~Password input field").setValue(password);
  await driver.$("~Login button").click();
}
module.exports = loginFn;
