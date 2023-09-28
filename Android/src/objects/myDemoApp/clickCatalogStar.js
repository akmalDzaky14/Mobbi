/**
 * Memilih rating di halaman Detail Page
 *
 * @param {Promise<WebdriverIO.Browser>} driver
 * @param {number} number - Nilai Rating dari 1 - 5
 */
async function selectStar(driver, number) {
  await driver
    .$(`//android.view.ViewGroup[@content-desc="review star ${number}"]`)
    .click();
  await driver.waitUntil(
    async () => {
      return (
        (await driver
          .$(
            "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView"
          )
          .getText()) === "Thank you for submitting your review!"
      );
    },
    {
      timeout: 3000,
      timeoutMsg: "Popup supposed to be appeard",
    }
  );

  await driver
    .$('//android.view.ViewGroup[@content-desc="Close Modal button"]')
    .click();
}

module.exports = selectStar;
