/**
 * Fungsi untuk isi form di halaman payment aplikasi my demo app
 *
 * @param {Promise<WebdriverIO.Browser>} driver
 * @param {string} fullName
 * @param {string} cardNumber
 * @param {string} expDate
 * @param {string} securityCode
 */
async function paymentFn(driver, fullName, cardNumber, expDate, securityCode) {
  await driver.$("~Full Name* input field").setValue(fullName);
  await driver.$("~Card Number* input field").setValue(cardNumber);
  await driver.$("~Expiration Date* input field").setValue(expDate);
  await driver.$("~Security Code* input field").setValue(securityCode);

  await driver.$("~Review Order button").click();
}

module.exports = paymentFn;
