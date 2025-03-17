const { test } = require('@playwright/test')
const { expect } = require('@playwright/test')

test ("End 2 End Testing of Client App", async({browser})=>{
   const context = await browser.newContext();
   const page = await context.newPage();
   const products = page.locator(".card-body");
   const productName = "ZARA COAT 3";
   const email = "nigarkana@gmail.com";
    //Navigate the URL
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("FDU@nigar12345");
    await page.getByRole("button", {name: 'login'}).click();
    await page.waitForLoadState('networkidle');
    const titles = await page.locator(".card-body h5 b").allTextContents();
    console.log("Products name: ", titles);
    await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button", {name:" Add To Cart"}).click();
    await page.getByRole("listitem").getByRole("button", {name:"Cart"}).click();
    //select the product = ZARA COAT 3
    //not css locator, it is playwright feature to locate element and wait for the load
    await page.locator("div li").first().waitFor();
    //locator based upon a tag
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    await page.getByRole("button",{name:"Checkout"}).click();
    await page.getByPlaceholder("Select Country").pressSequentially("Can");
    await page.getByRole("button",{name:"Canada"}).click();
    await page.getByText("PLACE ORDER").click();
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
})