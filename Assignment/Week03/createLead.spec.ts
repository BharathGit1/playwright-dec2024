import test, { chromium, expect } from '@playwright/test'

test('Create lead', async ({ page }) => {

    //launch browser and navigate to webpage
    await page.goto("http://leaftaps.com/opentaps/control/main")

    //Fetch credentials from environment variables
    const username = process.env.LeafTapsDemoUserName || ''
    const password = process.env.LeafTapsDemoPassword || ''

    //enter username, password and login as demo sales manager
    await page.locator("#username").fill(username)
    await page.locator("#password").fill(password)
    await page.locator(".decorativeSubmit").click()

    //wait for CRM/SFA link to be available and click
    await page.waitForSelector("//a[contains(text(),'CRM/SFA')]")
    await page.locator("//a[contains(text(),'CRM/SFA')]").click()

    //wait for Leads link to be available and click
    await page.waitForSelector("//a[text()='Leads']")
    await page.locator("//a[text()='Leads']").click()

    //click create lead link
    await page.locator("//a[text()='Create Lead']").click()

    //object with lead details
    let leadDetails = {
        companyName: "cn",
        firstName: 'fn',
        lastName: 'ln',
        salutation: "M",
        title: "t",
        annualRevenue: "1",
        department: "d",
        phoneNumber: "987654321"

    }

    //Call the function to create lead with leadDetails object as parameter
    createLead(leadDetails)

    // Verify the company name, first name, last name and the status
    let companyName = await page.locator("#viewLead_companyName_sp").innerText()
    await expect(companyName).toContain(leadDetails.companyName)

    let firstName = await page.locator("#viewLead_firstName_sp").innerText()
    await expect(firstName).toEqual(leadDetails.firstName)

    let lastName = await page.locator("#viewLead_lastName_sp").innerText()
    await expect(lastName).toEqual(leadDetails.lastName)

    let status = await page.locator("#viewLead_statusId_sp").innerText()
    await expect(status).toEqual("Assigned")

    // Get the page title
    let title = await page.title()
    console.log("The title is: " + title)

    //Function to create lead by passing lead details object as paramenter
    async function createLead(leadDetails) {
        // Fill the Company Name
        let number = 2;
        await page.locator("(//input[@name='companyName'])[2]").fill(leadDetails.companyName)
        // Fill the First Name
        await page.locator("(//input[@name='firstName'])[3]").fill(leadDetails.firstName)
        // Fill the Last Name
        await page.locator("(//input[@name='lastName'])[3]").fill(leadDetails.lastName)
        // Fill the Salutation
        await page.locator("//input[@name='personalTitle']").fill(leadDetails.salutation)
        // Fill the Title
        await page.locator("//input[@name='generalProfTitle']").fill(leadDetails.title)
        // Fill the Annual Revenue
        await page.locator("//input[@name='annualRevenue']").fill(leadDetails.annualRevenue)
        // Fill the Department
        await page.locator("//input[@name='departmentName']").fill(leadDetails.department)
        // Fill the Phone number
        await page.locator("(//input[@name='primaryPhoneNumber'])[4]").fill(leadDetails.phoneNumber)
        // Click Create Lead button
        await page.locator("//input[@value='Create Lead']").click()
    }

    //close browser
    page.close()
})