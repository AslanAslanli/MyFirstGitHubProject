import { test, expect } from "@playwright/test";

test.describe("Mouse Actions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.LC_PRACTICE_BASE_URL}`);
    await page.waitForTimeout(2000);
  });

  test("Left Click", async ({ page }) => {
    // page.locator("//a[text()='A/B Testing']").click();
    // await page.waitForTimeout(2000);

    await page.click("//a[text()='A/B Testing']");
    await page.waitForTimeout(2000);
  });

  test("Right Click", async ({ page }) => {
    await page.click("//a[text()='A/B Testing']", { button: "right" });
    await page.waitForTimeout(2000);
  });

  test("Hover over", async ({ page }) => {
    await page.click("//a[normalize-space()='Hovers']");
    await page.waitForTimeout(2000);

    //page.hover("//img[@alt='User Avatar']");
    let userProfiles = await page.locator("//img[@alt='User Avatar']").all();
    for (const eachProfile of userProfiles) {
      await eachProfile.hover();
      await page.waitForTimeout(2000);
    }

    // Option 2
    let userProfiles2 = page.locator("//img[@alt='User Avatar']");
    for (let i = 0; i < (await userProfiles2.count()); i++) {
      await userProfiles2.nth(i).hover();
      await page.waitForTimeout(2000);
    }
  });

  test("Drag and drop", async ({ page }) => {
    await page.click("//a[text()='Drag and Drop']");
    await page.waitForTimeout(2000);

    let elementToBeDragged = page.locator("#column-a");
    let elementToBeDropped = page.locator("#column-b");

    await page.dragAndDrop("#column-a", "#column-b");
    await page.waitForTimeout(5000);

    await elementToBeDragged.dragTo(elementToBeDropped);
    await page.waitForTimeout(3000);
  });

  test("Double click", async ({ page }) => {
    // const txtElement = page.locator("//span[.='Test Automation Practice']");
    // await page.dblclick("//h1");
    // await page.waitForTimeout(2000);

    await page.goto("https://qa-practice.netlify.app/double-click");
    await page.dblclick("#double-click-btn");
    await page.waitForTimeout(2000);

    await expect(page.locator("#double-click-result")).toHaveText(
      "Congrats, you double clicked!",
    );
  });

  test("Scroll", async ({ page }) => {
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(2000);

    // scroll function
    const element = page.getByText("New tab", { exact: true });
    await element.scrollIntoViewIfNeeded();
    await page.waitForTimeout(5000);
  });
});

test.describe("Keyboard Actions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://loopcamp.vercel.app/login.html");
    await page.waitForTimeout(2000);
  });

  test("Pressing Keys", {tag: "@keyboard"}, async ({ page }) => {
    const usernameInput = page.locator("#username");
    const passwordInput = page.locator("#password");

    await usernameInput.click();
    await page.keyboard.type("tomsmith");
    await page.keyboard.press("Tab");
    await page.keyboard.type("SuperSecretPassword");
    await page.keyboard.press("Tab");
    await page.waitForTimeout(2000);

    await page.keyboard.press("Enter");
    await page.waitForTimeout(5000);
  });



});
