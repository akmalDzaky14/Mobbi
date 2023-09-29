/**
 * Fungsi isi form checkout aplikasi my demo app
 *
 * @param {Promise<WebdriverIO.Browser>} driver
 * @param {string} fullName
 * @param {string} address1
 * @param {string} [address2=""] - Tidak wajib di isi
 * @param {string} city
 * @param {string} [stateRegion=""] - Tidak wajib di isi
 * @param {number} zipCode
 * @param {string} country
 */
async function checkoutFn(
  driver,
  fullName,
  address1,
  address2 = "",
  city,
  stateRegion = "",
  zipCode,
  country
) {
  await driver.$("~Full Name* input field").setValue(fullName);
  await driver.$("~Address Line 1* input field").setValue(address1);
  await driver.$("~Address Line 2 input field").setValue(address2);
  await driver.$("~City* input field").setValue(city);
  await driver.$("~State/Region input field").setValue(stateRegion);
  await driver.$("~Zip Code* input field").setValue(zipCode);
  await driver.$("~Country* input field").setValue(country);

  await driver.$("~To Payment button").click();
}

module.exports = checkoutFn;
