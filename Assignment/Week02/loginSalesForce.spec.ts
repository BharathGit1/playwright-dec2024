import test, { chromium } from "@playwright/test";

test('Log in to sales force', async () => {
    const browserInstance = await chromium.launch({ headless: false, channel: "chromium" })

    const broswerContext = await browserInstance.newContext()

    const page = await broswerContext.newPage()

    await page.goto("https://login.salesforce.com/")

    await page.fill('input[type="email"]', 'username');
    await page.fill('input[type="password"]', 'password');

    await page.click('input[name="Login"]');

    let title = await page.title()
    console.log("The title is: " + title)

    let url = await page.url()
    console.log("The url is: " + url)

    await page.waitForTimeout(10000);

    //await page.close()
})