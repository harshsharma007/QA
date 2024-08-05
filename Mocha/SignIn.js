const { Builder, By, Key, until, WebDriver } = require('selenium-webdriver');
const mocha = require('mocha');

mocha.describe('Lennar Website Automation', function () {
  let driver;

  this.timeout(50000);

  mocha.before(async function () {
    driver = new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize();
  });

  mocha.it('Sign In', async function () {
    await driver.get('https://stage.lennar.com/');

    // Handle cookie consent if it's displayed
    try {
      const acceptButton = await driver.wait(until.elementLocated(By.id('onetrust-accept-btn-handler')), 10000);
      await acceptButton.click();
    } catch (error) {
      console.log(error)
    }

    // Explicitly wait for the header menu element
    const headerMenu = await driver.wait(until.elementLocated(By.css('[data-testid="header-menu"]')), 10000);
    await headerMenu.click();

    const create = await driver.wait(until.elementLocated(By.xpath("//*[text()='Sign in or create']")), 10000);
    await driver.executeScript('arguments[0].scrollIntoView()', create);
    await driver.wait(until.elementIsVisible(create), 10000);
    await create.click();

    await driver.wait(until.elementLocated(By.css('[data-testid="email"]')), 10000).sendKeys('xyz@gmail.com');

    const continueButton = await driver.wait(until.elementLocated(By.css('[data-testid="sign-submit-button"]')), 10000);
    await continueButton.click();
    
    const iframeElement = driver.findElement(By.id("iframeId"));
    driver.switchTo().frame(iframeElement);

    const password = driver.findElement(By.name('password'));
    await driver.executeScript('arguments[0].scrollIntoView()', password);
    await driver.wait(until.elementIsVisible(password), 10000);
    await driver.wait(until.elementIsEnabled(password), 10000);
    await password.sendKeys('Test@1234');

    const continueSignUpButton = await driver.wait(until.elementLocated(By.css('[data-testid="sign-submit-button"]')), 10000);
    await continueSignUpButton.click();

    const legal = driver.findElement(By.name('legal'));
    await driver.executeScript('arguments[0].scrollIntoView()', legal);
    await driver.wait(until.elementIsVisible(legal), 10000);
    await driver.wait(until.elementIsEnabled(legal), 10000);
    await driver.executeScript('arguments[0].click()', legal);

    const continueSignButton = await driver.wait(until.elementLocated(By.css('[data-testid="sign-submit-button"]')), 10000);
    await continueSignButton.click();    

    const stateDD = driver.findElement(By.id('react-select-state-input'));
    //await driver.executeScript('arguments[0].scrollIntoView()', stateDD);
    //await driver.wait(until.elementIsEnabled(stateDD), 10000);
    await driver.findElement(By.id("state")).click();
    //await driver.wait(until.elementIsVisible(stateDD), 10000);
    //await driver.wait(until.elementIsEnabled(stateDD), 10000);
    //await driver.executeScript('arguments[0].click()', stateDD);
    
    // //Locate and click the specific option, in this case, "Alabama"
    // const alabamaOption = driver.findElement(By.xpath('(//div[@class="select__option"])[1]//div[text()="Alabama"]'));
    // alabamaOption.click();
  });

  mocha.after(async function () {
    //await driver.quit();
  });
});
