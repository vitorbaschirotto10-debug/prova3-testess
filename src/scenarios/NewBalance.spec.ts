import { test } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';
import NewBalancePage from '../support/pages/NewBalancePage';

test.describe('New Balance E2E', () => {
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  let newBalancePage: NewBalancePage;
  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.newBalance')
    .retrieveData();

  test.beforeEach(async ({ page }) => {
    newBalancePage = new NewBalancePage(page);
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  });

  test('deve buscar por tenis e exibir resultados', async () => {
    await newBalancePage.buscarProduto('tenis');
    await newBalancePage.validarResultadosBusca('tenis');
  });

  test('deve navegar para a categoria Masculino pelo menu', async () => {
    await newBalancePage.acessarCategoria('Masculino');
    await newBalancePage.validarPaginaCategoria('Masculino');
  });

  test('deve adicionar um produto na sacola', async () => {
    await newBalancePage.buscarProduto('530');
    await newBalancePage.abrirPrimeiroProduto();
    const nomeProduto = await newBalancePage.adicionarProdutoNaSacola();
    await newBalancePage.validarProdutoNaSacola(nomeProduto);
  });
});
