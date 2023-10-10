describe('Testando funções de compra', () => {
    it('Testes de compra', () => {
      cy.comprar('Thinking in HTML')
    })

    it.only('Testes de cupom', () => {
      cy.cupom('Selenium Ruby', 'krishnasakinala')
    })
})