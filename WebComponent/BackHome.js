const {By} = require('selenium-webdriver');

class DashboardPage {
    constructor(driver) {
        this.driver = driver;
        this.verifySuccess = By.xpath("//div[@class='status alert alert-success']");
        this.homeButton = By.xpath("//span[contains(.,'Home')]");
    }

    async verifySuccessMessage(){
        const success = await this.driver.findElement(this.verifySuccess).getText();
        return success;
    }
    async homeClick(){
        await this.driver.findElement(this.homeButton).click();
    }
}

module.exports = DashboardPage;