const {Builder, By} = require('selenium-webdriver');

const DashboardPage = require ('./WebComponent/DashboardPage');
const FormPage = require ('./WebComponent/FormPage');
const BackHome = require ('./WebComponent/BackHome');

const path = require('path');

const assert = require('assert');
const fs = require('fs');
require('dotenv').config();

const browser = process.env.BROWSER;
const username = process.env.USERNAME;
const baseURL = process.env.BASE_URL;
const email = process.env.EMAIL;

const screenshotDir = './screenshots/';
if(!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {recursive: true});
}

describe('TestCase 6 [Contact Us Form]', function(){
    this.timeout(50000);
    let driver;

    switch (browser) {
        case 'chrome' :
        default :
            const chrome = require('selenium-webdriver/chrome');
            options = new chrome.Options();
            options.addArguments('--headless');
        break;
    }

    //Run setiap mulai test, satu kali saja paling awal
    before(async function () {
        //Run tanpa membuka chorome dengan menggunakan --headless
        driver = await new Builder().forBrowser(browser).setChromeOptions(options).build();
    });

    it('Verify HomePage', async function () {
        const dashboardPage = new DashboardPage(driver);
        await dashboardPage.navigate(baseURL);
        const isLogoDisplayed = await dashboardPage.verifyLogoHome();
        if (isLogoDisplayed) {
            console.log("Homepage is visible successfully.");
        } else {
            console.log("Homepage is not visible.");
        }
    });
    it('Verify Contact Us and Fill the form', async function () {
        const formPage = new FormPage(driver);
        await formPage.contactbutton();
        const titleHeader = await formPage.verifyContactUsPage();
        assert.strictEqual(titleHeader, 'GET IN TOUCH');
        await formPage.fillFormPage();
        // Upload File Berupa Gambar
        const filePath = path.resolve(__dirname, 'test.jpeg');
        const fileInput = await driver.findElement(By.css("[name='upload_file']"));
        await fileInput.sendKeys(filePath);
        console.log('File uploaded successfully');
        //Accept Alert pop-up
        await formPage.submitButton();
        const alert = await driver.switchTo().alert();
        await alert.accept();
        console.log('Pop-up alert is accepted');
    });
    it ('Back to Home', async function () {
        const backHome = new BackHome(driver);
        const success = await backHome.verifySuccessMessage();
        assert.strictEqual(success, 'Success! Your details have been submitted successfully.');
        await backHome.homeClick();
    });

    //Assertion atau validasi
    afterEach(async function () {
        const screenshot = await driver.takeScreenshot();
        const filepath = `${screenshotDir}${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`
        fs.writeFileSync(filepath, screenshot, 'base64');
        console.log('Screenshot succesfully saved');
    });
    
    after(async function () {
        await driver.quit()
    });
});