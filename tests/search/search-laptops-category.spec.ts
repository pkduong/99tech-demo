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
      { name: 'Sony vaio i5', price: '$790' },
      { name: 'MacBook air', price: '$700' }
    ];

    // Act & Assert
    await test.step("Step 1: Select Laptops category", async () => {
      await searchPage.selectCategory(category);
    });

    await test.step("Step 2: Wait for products to load after category change", async () => {
      await page.waitForTimeout(Env.WAITING_TIME);
    });

    await test.step("Verify that laptop products are displayed with correct names and prices", async () => {
      for (const product of laptopProducts) {
        const productLink = page.getByRole('link', { name: product.name, exact: true });
        await expect(productLink).toBeVisible();

        // Get the locator of the product card
        const productCard = page.locator('div.card-block').filter({ has: productLink });

        // Verify product name is displayed
        await expect.soft(productLink).toHaveText(product.name);

        // Verify price is displayed and matches expected price
        const priceElement = productCard.locator('h5');
        await expect.soft(priceElement).toContainText(product.price);
      }
    });
  });
});