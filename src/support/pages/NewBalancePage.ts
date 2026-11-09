import { Page, expect } from '@playwright/test';
import NewBalanceElements from '../elements/NewBalanceElements';
import BasePage from './BasePage';

export default class NewBalancePage extends BasePage {
  readonly newBalanceElements: NewBalanceElements;

  constructor(readonly page: Page) {
    super(page);
    this.page = page;
    this.newBalanceElements = new NewBalanceElements(page);
  }

  async buscarProduto(termo: string): Promise<void> {
    const campoBusca = this.newBalanceElements.getCampoBusca();
    await campoBusca.fill(termo);
    await campoBusca.press('Enter');
  }

  async validarResultadosBusca(termo: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`/s\\?q=${termo}`));
    await expect(this.newBalanceElements.getTituloPagina()).toHaveText(
      `Resultados para "${termo}"`
    );
    await expect(this.newBalanceElements.getContadorProdutos()).toBeVisible();
    await expect(
      this.newBalanceElements.getProdutosListados().first()
    ).toBeVisible();
  }

  async acessarCategoria(categoria: string): Promise<void> {
    await this.newBalanceElements.getMenuCategoria(categoria).click();
  }

  async validarPaginaCategoria(categoria: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`/${categoria}$`));
    await expect(this.page).toHaveTitle(new RegExp(categoria));
    await expect(this.newBalanceElements.getTituloPagina()).toContainText(
      categoria
    );
    await expect(this.newBalanceElements.getContadorProdutos()).toBeVisible();
  }

  async abrirPrimeiroProduto(): Promise<void> {
    await this.newBalanceElements.getProdutosListados().first().click();
    await expect(this.page).toHaveURL(/\/p\?skuId=/);
  }

  async adicionarProdutoNaSacola(): Promise<string> {
    const nomeProduto = (
      await this.newBalanceElements.getTituloPagina().innerText()
    ).trim();
    const tamanho = this.newBalanceElements.getTamanhosDisponiveis().first();
    await tamanho.click();
    await expect(tamanho).toHaveAttribute('aria-pressed', 'true');
    await this.newBalanceElements.getBotaoAdicionarSacola().click();
    return nomeProduto;
  }

  async validarProdutoNaSacola(nomeProduto: string): Promise<void> {
    const sacola = this.newBalanceElements.getSacola();
    await expect(sacola).toBeVisible();
    await expect(sacola).toContainText('Minha Sacola');
    await expect(sacola).toContainText(nomeProduto);
    await expect(this.newBalanceElements.getIconeCarrinho()).toHaveAttribute(
      'data-items',
      '1'
    );
  }
}
