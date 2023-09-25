//
// const puppeteer = require('puppeteer');
//
// (async () => {
//     const browser = await puppeteer.launch({
//         headless: false,
//     });
//     const page = await browser.newPage();
//     await page.goto('https://carbuy.ee');
//     await page.waitForTimeout(2000)
//     await page.$eval();
//     // await page.screenshot({ path: 'example.png' });

// const textContent = await page.$eval('#myElement', (element) => element.textContent);
// console.log(textContent);
//     await browser.close();
// })();


// const puppeteer = require('puppeteer');
//
// (async () => {
//     const browser = await puppeteer.launch({headless:false});
//     const page = await browser.newPage();
//     await page.goto('https://carbuy.ee');
//
//     // Заполняем форму
//     await page.type('#car-plate', '685BGP'); // Вводим значение в поле car-plate
//
//     // Нажимаем кнопку "Начать запрос"
//     await page.click('#find-btn');
//
//     // Ждем загрузки результатов и извлекаем данные
//     await page.waitForSelector('.result-container'); // Дожидаемся появления контейнера с результатами
//     const data = await page.evaluate(() => {
//         const resultContainer = document.querySelector('.result-container');
//         const resultText = resultContainer.innerText;
//         return resultText;
//     });
//
//     console.log(data); // Выводим данные
//
//     await browser.close();
// })();



const puppeteer = require('puppeteer');
const axios = require('axios');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://carbuy.ee');

    // Заполняем форму
    // await page.type('#car-plate', '685BGP'); // Вводим значение в поле car-plate
     await page.screenshot({ path: 'exampleee.png' });

    // Нажимаем кнопку "Начать запрос"
    await page.click('#find-btn');

    // Ждем загрузки результатов
    await page.waitForSelector('.wpcf7-response-output'); // Дожидаемся появления контейнера с результатами

    // Получаем данные из API
    const apiUrl = 'https://mnt.salesmodul.com/api/v1/data/685BGP';
    const response = await axios.get(apiUrl);
    const data = response.data;

    console.log(data); // Выводим данные
    await page.waitForTimeout(1000000);

})();




const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Capture all responses
  page.on('response', async (response) => {
    const url = response.url();
    const status = response.status();
    const headers = response.headers();
    const content = await response.json(); // Capture the response content as a string

    console.log('URL:', url);
    console.log('Status:', status);
    console.log('Headers:', headers);
    console.log('Content:', content);
    console.log('--------------------------------------');
  });

  await page.goto('https://carbuy.ee');
  // await page.type('#car-plate', '685BGP'); // Enter the vehicle registration number value
  await page.click('#find-btn');

  await page.waitForTimeout(5000); // Wait for the responses to be captured (adjust the timeout value as needed)

  await browser.close();
})();