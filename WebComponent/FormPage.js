const {By} = require('selenium-webdriver');

class DashboardPage {
    constructor(driver) {
        this.driver = driver;
        this.contactUsButton = By.css("[href='/contact_us']");
        this.verifyContactUsHeader = By.xpath("//h2[.='Get In Touch']");
        this.fillName = By.xpath("//input[@name='name']");
        this.fillEmail = By.xpath("//input[@name='email']");
        this.fillSubject = By.xpath("//input[@name='subject']");
        this.fillMessage = By.xpath("//textarea[@id='message']");
        this.submit = By.css("[name='submit']");
    }

    async fillFormPage(){
        await this.driver.findElement(this.fillName).sendKeys('Test Name');
        await this.driver.findElement(this.fillEmail).sendKeys('test@gmail.com');
        await this.driver.findElement(this.fillSubject).sendKeys('Test Subject');
        await this.driver.findElement(this.fillMessage).sendKeys('Test Message');
    }
    async contactbutton() {
        await this.driver.findElement(this.contactUsButton).click();
    }
    async verifyContactUsPage(){
        const title = await this.driver.findElement(this.verifyContactUsHeader).getText();
        return title;
    }
    async submitButton(){
        await this.driver.findElement(this.submit).click();
    }
}

module.exports = DashboardPage;