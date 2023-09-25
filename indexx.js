// const puppeteer = require('puppeteer');

// (async () => {
//     const browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();
    // await page.goto('https://carbuy.ee');
    // await page.type('#car-plate', '1'); // 
    // await page.click('#find-btn');
    
//     page.on('response', async (response) => {
//         const url = response.url();
//         const status = response.status();
//         const headers = response.headers();
//         // const content = await response.json(); // 
//         const request = await response.text(); //



//         console.log('URL:', url);
//         console.log('Status:', status);
//         console.log('Headers:', headers);
//         // console.log('Content:', JSON.stringify(content, null, 2)); //
//         // console.log('Content:', content); // 
//         console.log('Content:', request); // 
//         console.log('--------------------------------------');
//     });

//     await page.waitForTimeout(500000); // 

//     await browser.close();
// })();



// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch({headless:false});
//   const page = await browser.newPage();

//   // Перехватываем события запроса и ответа
//   await page.setRequestInterception(true);
//   page.on('request', (request) => {
//     if (request.resourceType() === 'xhr') {
//       console.log('XHR запрос:', request.url());
//     }
//     request.continue();
//   });
//   page.on('response', (response) => {
//     if (response.request().resourceType() === 'xhr') {
//       console.log('Ответ XHR:', response.url());
//       response.text().then((text) => {
//         console.log('Текст ответа:', text);
//       });
//     }
//   });
//   await page.goto('https://carbuy.ee');
//   await page.type('#car-plate', '885TKH'); // 
//   await page.click('#find-btn');


//   // Выполняем XHR-запрос на странице
// //   await page.evaluate(() => {
// //     return new Promise((resolve, reject) => {
// //       const xhr = new XMLHttpRequest();
// //       xhr.open('GET', 'YOUR_XHR_URL', true);
// //       xhr.onreadystatechange = function () {
// //         if (xhr.readyState === 4) {
// //           resolve(xhr.responseText);
// //         }
// //       };
// //       xhr.onerror = function () {
// //         reject(new Error('XHR запрос не удался'));
// //       };
// //       xhr.send();
// //     });
// //   });

// //   await browser.close();
// })();
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  await page.goto('https://carbuy.ee');
  const carPlateValue = '885TKH';
  const requestUrl = `https://carbuy.ee/api/v1/data/${carPlateValue}`;

  await page.goto(requestUrl);

  const response = await page.evaluate(() => {
    return {
      ok: document.querySelector('.response-ok') !== null,
      errorMessage: document.querySelector('.error-message')?.textContent || 'Sorry, your car plate number cannot be found.',
      plate: document.querySelector('.plate')?.textContent || '',
      manufacturer: document.querySelector('.manufacturer')?.textContent || '',
      model: document.querySelector('.model')?.textContent || '',
      year: document.querySelector('.year')?.textContent || '',
      engine: document.querySelector('.engine')?.textContent || '',
      transmission: document.querySelector('.transmission')?.textContent || '',
      inspection: document.querySelector('.inspection')?.textContent || ''
    };
  });

  if (response.ok === false) {
    const errorMessage = response.errorMessage;
    console.log(errorMessage);
    // Handle error case
  } else {
    const plate = response.plate;
    const manufacturer = response.manufacturer;
    const model = response.model;
    const year = response.year;
    const engine = response.engine;
    const transmission = response.transmission;
    const inspection = response.inspection;

    // Process the fetched data
    console.log('Plate:', plate);
    console.log('Manufacturer:', manufacturer);
    console.log('Model:', model);
    console.log('Year:', year);
    console.log('Engine:', engine);
    console.log('Transmission:', transmission);
    console.log('Inspection:', inspection);

    // Continue with your logic here
  }

})();