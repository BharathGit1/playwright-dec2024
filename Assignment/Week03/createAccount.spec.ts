import test, { expect } from "@playwright/test";

test('Create Account', async ({ page }) => {
    // Navigate to salesforce website 
    await page.goto("https://login.salesforce.com/")

    // fetch username and password from environment variables
    const username = process.env.SalesforceUsername || ''
    const password = process.env.SalesforcePassword || ''

    // Enter username using getByLabel 
    await page.getByLabel("Username").fill(username)

    // Enter password using getByLabel 
    await page.getByLabel("Password").fill(password)

    // Click Login 
    page.locator("//input[@id='Login']").click()

    // Verify the title and url of the page using appropriate assertions 
    await expect(page).toHaveTitle("Home | Salesforce", { timeout: 15000 })
    await expect(page).toHaveURL("https://testleaf-da-dev-ed.develop.lightning.force.com/lightning/setup/SetupOneHome/home")

    // Click App Launcher using the class locator 
    await page.locator("//button[@class='slds-button slds-context-bar__button slds-icon-waffle_container slds-show']").click()

    // Click View All using getByText 
    await page.getByText("View All").click()

    // Enter ‘Service’ in the App Launcher Search box using getByPlaceHolder 
    await page.getByPlaceholder("Search apps or items...").fill("Service")

    // Click Service using index based XPath
    await page.locator("(//mark[text()='Service'])[1]").click()

    // Click Accounts using attribute based CSS selector
    await page.locator("a[title='Accounts']").click()

    // Click New using getByRole 
    await page.getByRole("button", { name: "New" }).click()

    // Enter Account name using attribute based CSS selector 
    await page.locator("input[name='Name']").fill("newAccount")

    // Click Save button using XPath 
    await page.locator("//button[text()='Save']").click()

    // Verify the toast message displayed
    let message = await page.locator("//span[@class='toastMessage slds-text-heading--small forceActionsText']").innerText()
    expect(message).toEqual("Account \"newAccount\" was created.")

    //close browser
    await page.close()
})