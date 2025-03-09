const {test} = require('@playwright/test')
const {expect} = require('@playwright/test')

test('First Playwright test', async ({browser}) => {

    //storing username
    
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    const userName = page.locator('#username');
    const userPassword = page.locator("[type = 'password']");
    const signIn = page.locator('#signInBtn');
    const cardTitle = page.locator(".card-body a");

    await userName.fill('rahulshetty');
    await userPassword.fill('learning');
    await signIn.click();
    console.log(await page.locator("[style *='block']").textContent());
    await expect(page.locator("[style *='block']")).toContainText("Incorrect username/password.");

    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    //await userName.fill('rahulshetty');
    await page.locator('select.form-control').click();

    await page.waitForTimeout(3000);
    await signIn.click();
    await page.waitForTimeout(3000);


    //all the 4 content in the home page
    //await page.locator(".card-body a").first(). textContent();
    //console.log(await cardTitle.first().textContent());
    //console.log(await cardTitle.nth(1).textContent());
    // console.log(cardTitle.nth(2). textContent());
    // console.log(cardTitle.nth(3). textContent());

    //One way to load all the products using networkidle mode
    //await page.waitForLoadState('networkidle');
    //another way to load all the products using wait for
    await cardTitle.first().waitFor();
    const allTitles = await cardTitle.allTextContents();
    console.log(allTitles);
});

test ('UI Control', async({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator('#username').fill('rahulshettyacamedy');
    await page.locator("[name ='password']").fill('learning');
    await page.locator(".radiotextsty").last().click();
    console.log(page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#okayBtn").click();
    await page.locator(".radiotextsty").last().click();
    console.log(page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#okayBtn").click();
    const dropdown = await page.locator("select.form-control");
    await dropdown.selectOption("consult");

    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    //test the blinking sentence
    const documentLink = await page.locator("[href*='documents-request']");
    await expect(documentLink).toHaveAttribute("class","blinkingText");
    //await page.pause();//Playwright inspector will open
})

test.only ("Child window handling", async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink =  await page.locator("[href *='documents-request']");

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click(),
    ]);

    const text = await newPage.locator(".red").textContent();
    console.log(text);
});
