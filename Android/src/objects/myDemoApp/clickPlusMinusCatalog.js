/**
 * Menambah atau mengurangi qty di halaman Catalog
 *
 * @param {Promise<WebdriverIO.Browser>} driver
 * @param {string} type - Tipe pilihan [plus atau minus]
 * @param {number} num - Jumlah yang ingin di tambah
 *
 * @returns {Promise<void>}
 */
async function setQTY(driver, type, num) {
  let qty = Number(
    await driver
      .$(
        '//android.view.ViewGroup[@content-desc="counter amount"]/android.widget.TextView'
      )
      .getText()
  );
  switch (type) {
    case "plus":
      const target1 = num + qty;
      while (qty !== target1) {
        await driver.$("~counter plus button").click();
        qty++;
      }
      break;

    case "minus":
      const target2 = qty - num;
      while (qty !== target2) {
        await driver.$("~counter minus button").click();
        qty--;
        if (qty === 0) break;
      }
      break;
  }
}
module.exports = setQTY;
