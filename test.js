const assert = require('assert');

const searchItemsFromCurrentPage = () => {
  const tabletsCount = browser.elements(`//*[@id='s-results-list-atf']//*[@class='sx-price-whole']`).value.length;
  let names = [];

  for (let i = 1; i < tabletsCount; i++) {
    const price = browser.element(`(//*[@id='s-results-list-atf']//*[@class='sx-price-whole'])[${i}]`).getText();
    console.log(price);

    if (price < 70) {
      names.push(browser.element(`(//*[@id='s-results-list-atf']//*[contains(@class ,"s-access-title")])[${i}]`).getText());
    }
  }
  return names;
}


describe('Amazon Search Tablet under 70$', () => {
  describe('Find and print first 15 tablet names which cost less than 70$', () => {

    it('Search Tablet', () => {
      browser.url("/");
      browser.setValue('#twotabsearchtextbox', "tablet");
      browser.element("//*[@class = 'nav-input']").click();
      assert.equal('"tablet"', browser.element('//span[@class = "a-color-state a-text-bold"]').getText());
    });

    it('Filter tablets under 70$', () => {
      const necessaryTabletsName = [];

      while (necessaryTabletsName.length < 15) {
        necessaryTabletsName.push(...searchItemsFromCurrentPage());
        browser.element('//*[@id = "pagnNextString"]').click();
        console.log('Go to Next Page.................................................................');
      }

      necessaryTabletsName.map((tabletName, index) => {
        console.log(index, tabletName);
      });
    })
  })
})