const puppeteer = require('puppeteer');
const commandLineArgs = require('command-line-args');

const optionDefinitions = [
    {name: 'vin', alias: 'v', type: String}
];

const screenArgs = commandLineArgs(optionDefinitions);

(async () => {
    const browser = await puppeteer.launch({
        headless: 'new',
        waitUntil: 'networkidle0'
    });
    const page = await browser.newPage();

    await page.goto('https://carbuy.ee');
    let carPlateValue = screenArgs.vin;

    // await new Promise(r => setTimeout(r, 5000));
     const response = await page.evaluate(async (carPlateValue) => {
        carPlateValue = carPlateValue.toUpperCase().trim();
        console.log('test')
        const requestUrl = `https://mnt.salesmodul.com/api/v1/data/${carPlateValue}`;

        const fetchResponse = await fetch(requestUrl)

        // Возвращаем результат запроса fetch
        return fetchResponse.json();
    }, carPlateValue);

    console.log(response);
    
    await browser.close();
})();
