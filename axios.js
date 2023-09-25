const puppeteer = require('puppeteer');
const axios = require('axios');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://carbuy.ee');

    await page.type('#car-plate', '685BGP');
    await page.click('#find-btn');

    // Ждем загрузки результатов
    // await page.waitForSelector('.wpcf7-response-output'); // Дожидаемся появления контейнера с результатами
    // Получаем данные из API
    const apiUrl = 'https://mnt.salesmodul.com/api/v1/data/685BGP';
    const response = await axios.get(apiUrl);
    const data = response.data;
    const carData = {
        engine: data.engine,
        engineKw: data.engineKw,
        engineVolCm3: data.engineVolCm3,
        firstRegYear: data.firstRegYear,
        firstRegYearInEe: data.firstRegYearInEe,
        mark: data.mark,
        model: data.model,
        nextInspectionDate: data.nextInspectionDate,
        transmission: data.transmission
    };
    // Выводим сохраненные данные
    console.log(carData); // Выводим данные
    await page.waitForTimeout(1000000);
    await browser.close();
})();
