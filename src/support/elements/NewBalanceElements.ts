import { Locator, Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class NewBalanceElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }

  getCampoBusca(): Locator {
    return this.page.locator('input[name="q"]');
  }

  getTituloPagina(): Locator {
    return this.page.locator('h1').first();
  }

  getContadorProdutos(): Locator {
    return this.page
      .locator('[data-fs-plp-product-count]')
      .filter({ visible: true })
      .first();
  }

  getMenuCategoria(categoria: string): Locator {
    return this.page
      .locator('header')
      .getByRole('link', { name: categoria, exact: true })
      .first();
  }

  getProdutosListados(): Locator {
    return this.page.locator('a[href*="/p?skuId="]');
  }

  getTamanhosDisponiveis(): Locator {
    return this.page.locator(
      '[data-testid="size-button"]:not([title*="Indisponível"])'
    );
  }

  getBotaoAdicionarSacola(): Locator {
    return this.page.getByTestId('add-to-bag-button');
  }

  getIconeCarrinho(): Locator {
    return this.page.getByTestId('cart-toggle').first();
  }

  getSacola(): Locator {
    return this.page.getByRole('dialog', { name: 'Carrinho' });
  }
}
