const puppeteer = require('puppeteer');
const fs = require('fs');
const Handlebars = require('handlebars');


const getInvoice = async (username) => {
    // Data to inject into the template

    // Read the HTML template
    const templateHtml = fs.readFileSync('./template/invoice.html', 'utf8');
    const template = Handlebars.compile(templateHtml);
    const finalHtml = template({ username });

    // Launch a headless browser
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
     });
    const page = await browser.newPage();

    // Set the content of the page to the compiled HTML
    await page.setContent(finalHtml);

    // Convert the page to PDF
    const pdf = await page.pdf({ format: 'A4' });

    // Close the browser
    await browser.close();
    return pdf;
};

module.exports = { getInvoice }