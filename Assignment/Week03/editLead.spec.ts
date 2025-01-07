import test, { chromium, expect } from '@playwright/test'

test('Edit lead', async ({ page }) => {

    //launch browser and navigate to webpage
    await page.goto("http://leaftaps.com/opentaps/control/main")

    //Fetch credentials from environment variables
    const username = process.env.LeafTapsDemoUserName || ''
    const password = process.env.LeafTapsDemoPassword || ''

    //enter username, password and login as demo sales manager
    await page.locator("#username").fill(username)
    await page.locator("#password").fill(password)
    await page.locator(".decorativeSubmit").click()

    // Click CRM/SFA
    // await page.waitForSelector("//a[contains(text(),'CRM/SFA')]")
    await page.locator("//a[contains(text(),'CRM/SFA')]").click()

    // Click Leads 
    // await page.waitForSelector("//a[text()='Leads']")
    await page.locator("//a[text()='Leads']").click()

    // Click Find Leads 
    await page.locator("//a[text()='Find Leads']").click()

    // Enter the first name
    await page.locator("(//input[@name='firstName'])[3]").fill("fn")

    // Click Find Leads button 
    await page.locator("//button[text()='Find Leads']").click()

    // Click the first resulting Lead ID
    await page.locator("(//div[@class='x-grid3-cell-inner x-grid3-col-partyId'])[1]/child::a").click()

    //create lead details object
    let leadDetails = {
        companyName: "",
        annualRevenue: "100",
        department: "",
        description: ""

    }

    //call function to edit lead by passing lead details object and fetch the leadDetails
    leadDetails = await editLead(leadDetails)

    // Verify the edited fields
    let companyName = await page.locator("#viewLead_companyName_sp").innerText()
    await expect(companyName).toContain(leadDetails.companyName + "e")

    let annualRevenue = await page.locator("#viewLead_annualRevenue_sp").innerText()
    await expect(annualRevenue).toContain(leadDetails.annualRevenue)

    let department = await page.locator("#viewLead_departmentName_sp").innerText()
    await expect(department).toContain(leadDetails.department + "e")

    let description = await page.locator("#viewLead_description_sp").innerText()
    await expect(description).toContain(leadDetails.description + "e")

    // print the title of the page
    let title = await page.title()
    console.log("The title is: " + title)


    //Function to edit company details that accepts lead details object as paramenter
    async function editLead(leadDetails) {

        // Click Edit 
        await page.locator("//a[text()='Edit']").click()

        // Edit Company name
        leadDetails.companyName = await page.locator("#updateLeadForm_companyName").getAttribute("value")
        console.log("The company name is " + leadDetails.companyName)
        await page.locator("#updateLeadForm_companyName").fill(leadDetails.companyName + "e")

        // Edit Annual Revenue
        await page.locator("#updateLeadForm_annualRevenue").fill(leadDetails.annualRevenue)

        // Edit Department 
        leadDetails.department = await page.locator("#updateLeadForm_departmentName").getAttribute("value")
        await page.locator("#updateLeadForm_departmentName").fill(leadDetails.department + "e")

        // Enter Description 
        leadDetails.description = await page.locator("#updateLeadForm_description").innerText()
        console.log("The description in the function is" + leadDetails.description)
        await page.locator("#updateLeadForm_description").fill(leadDetails.description + "e")

        // Click Update 
        await page.locator("//input[@value='Update']").click()

        return leadDetails
    }

    //close browser
    page.close()
})