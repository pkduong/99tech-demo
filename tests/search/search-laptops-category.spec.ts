import { test } from '../../pages/fixtures/test-fixture';
import { expect } from '@playwright/test';
import Env from '../../settings/.env/env.global';

test.describe('Product Search and Filtering Tests', () => {
  test('Search Products by Category - Laptops',
  { tag: ["@search", "@TC003", "@ui", "@regression"] },
  async ({ page, searchPage }) => {
    // Arrange
    const category = 'Laptops';
    const laptopProducts = [
      'Sony vaio i5',
      'Sony vaio i7'
    ];

    // Act & Assert
    await test.step("Step 1: Select Laptops category", async () => {
      await searchPage.selectCategory(category);
    });

    await test.step("Step 2: Wait for products to load after category change", async () => {
      await page.waitForTimeout(Env.WAITING_TIME);
    });

    await test.step("Verify that laptop products are displayed with names, prices, and descriptions", async () => {
      for (const product of laptopProducts) {
        const productLink = page.getByRole('link', { name: product, exact: true });
        await expect(productLink).toBeVisible();

        // Get the locator of the product card
        const productCard = page.locator('div.card-block').filter({ has: productLink });

        // Verify prices are displayed for products
        const prices = productCard.locator('h5');
        const pricesCount = await prices.count();
        expect.soft(pricesCount).toBeGreaterThan(0);

        // Verify descriptions are displayed
        const descriptions = productCard.locator('p#article');
        expect.soft(descriptions).not.toBeEmpty();
      }
    });
  });
});