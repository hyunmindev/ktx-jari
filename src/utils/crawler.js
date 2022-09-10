const puppeteer = require('puppeteer');

const url = 'https://www.letskorail.com/ebizprd/EbizPrdTicketpr21100W_pr21110.do';

const crawl = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  await page.$eval('#start', (el) => {
    el.value = '포항';
  });
  await page.$eval('#get', (el) => {
    el.value = '서울';
  });
  await page.$eval('#s_day', (el) => {
    el.value = '11';
  });
  await page.$eval('#s_hour', (el) => {
    el.value = '12';
  });

  await page.click('img[alt=조회하기]');

  await page.waitForNavigation({ waitUntil: 'networkidle0' });
  const table = await page.$$eval('#tableResult > tbody > tr', (nodes) => nodes.map((node) => {
    const isAvailable = node.children[4].children[0]?.getAttribute('alt') !== '좌석매진';
    const start = node.children[2].innerText.replace('\n', '');
    const end = node.children[3].innerText.replace('\n', '');
    return { start, end, isAvailable };
  }));
  await browser.close();
  return table;
};

module.exports = {
  crawl,
};
