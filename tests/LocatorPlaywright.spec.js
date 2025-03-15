const { test, expect } = require("@playwright/test");

test ("Playwright Locator Handing", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    //await page.locator("form input[name='name']").fill("Mahid");
    await page.getByRole("textbox", 'name').nth(0).fill("Mahid");
    await page.getByRole("textbox", 'email').nth(1).fill("nigarkana@gmail.com");
    await page.getByPlaceholder("Password").fill("test123");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByLabel("Employed").click();
    await page.locator("input[name = 'bday']").fill("2013-11-24");
    await page.getByRole("button",{name:'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").click();
    await page.getByRole("link", {name:'Shop'}).click();
    await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button").click();
})