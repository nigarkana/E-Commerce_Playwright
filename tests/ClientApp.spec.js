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
    await page.locator("#userEmail").fill(email);
    await page.locator("[type = 'password']").fill("FDU@nigar12345");
    await page.locator("[name = 'login']").click();
    await page.waitForLoadState('networkidle');
    const titles = await page.locator(".card-body h5 b").allTextContents();
    console.log("Products name: ", titles);
    
    //select the product = ZARA COAT 3
    const count = await products.count();
    for (let i = 0; i < count; ++i){
        if (await products.nth(i).locator("b").textContent() === productName)
        {
            //Add to cart, playwright feature to locate "add to cart"
            await products.nth(i).locator("text =  Add To Cart").click();
            break;
        }
    }
    await page.locator("[routerlink *='cart']").click();
    //not css locator, it is playwright feature to locate element and wait for the load
    await page.locator("div li").first().waitFor();
    //locator based upon a tag
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    //locate the checkout, one approach to use the css for locator
    //await page.locator("button[type = 'button']").nth(1);
    await page.locator("text = Checkout").click();
    await page.locator("[placeholder = 'Select Country']").pressSequentially("Can",{delay: 100});
    const dropdown = await page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; i++)
    {
        const text = await dropdown.locator("button").nth(i).textContent();
        //if (text.trim()==='Canada') // using trim if there is a space before the text (Canada)
        if(text === ' Canada')
        {
          await dropdown.locator("button").nth(i).click();
          break;  
        }
    }

    //tested code
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(await page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log("Order Id is: ", orderId);
})