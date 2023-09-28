/**
 * Fungsi tunggu hingga ada perubahan pada header/judul aplikasi maksimal 5 detik
 *
 * @param {Promise<WebdriverIO.Browser>} driver
 * @param {string} indicator
 *
 * @returns {Promise<void>}
 */
async function waitTitleChangeFn(driver, indicator) {
  await driver.waitUntil(
    async () => {
      return (
        (await driver
          .$(
            '//android.view.ViewGroup[@content-desc="container header"]/android.widget.TextView'
          )
          .getText()) === indicator
      );
    },
    {
      timeout: 5000,
      timeoutMsg: "expected text to be different after 5s",
    }
  );
}

module.exports = waitTitleChangeFn;
