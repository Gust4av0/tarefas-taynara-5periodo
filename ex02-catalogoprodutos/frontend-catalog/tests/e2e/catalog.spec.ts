import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Catálogo de Produtos - E2E', () => {
  test('deve carregar a página inicial e renderizar os produtos', async ({ page }) => {
    await page.goto('http://localhost:5173');
    
    await expect(page.locator('h1')).toContainText('Catálogo de Produtos');
    
    // Utilizando web-first assertions do Playwright (mais resiliente a atrasos de rede)
    const productCard = page.locator('.product-card').first();
    await expect(productCard).toBeVisible({ timeout: 5000 });
    
    const cards = await page.locator('.product-card').count();
    expect(cards).toBeGreaterThan(0);
  });

  test('não deve conter violações de acessibilidade (a11y) na página inicial', async ({ page }) => {
    await page.goto('http://localhost:5173');
    
    // Garante que os cards foram renderizados antes de rodar a auditoria
    const productCard = page.locator('.product-card').first();
    await expect(productCard).toBeVisible({ timeout: 5000 });
    
    // Aguarda estado ocioso da rede para garantir que imagens/css carregaram (evita falsos positivos do axe)
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    
    // Formatação amigável das violações para facilitar a leitura no console em caso de erro
    const violationsSummary = accessibilityScanResults.violations.map(v => ({
      id: v.id,
      impact: v.impact,
      description: v.description,
      elementsCount: v.nodes.length
    }));

    expect(violationsSummary).toEqual([]);
  });
});