Cypress.Commands.add('comprar', (nomeLivro) => {
    //Pegando respostas de API
    cy.intercept('POST', '/?wc-ajax=add_to_cart').as('cartWait')
    cy.intercept('GET', '**/basket').as('basketWait')
    cy.intercept('GET', '**/checkout/order-received/**').as('checkoutWait')
  
    //Criando log Customizado para a função
    const log = Cypress.log({
      name: "comprar",
      displayName: "COMPRANDO",
      message: [`💰 COMPRANDO... | ${nomeLivro}`],
      // @ts-ignore
      autoEnd: false,
    })
  
    //Procrando Livro e clicando no botão de comprar
    cy.visit('https://practice.automationtesting.in/')
    cy.get('.sub_row_1-0-2', {log: false}).scrollIntoView({log: false}).contains(nomeLivro).as('produto')
    cy.get('@produto').then(($el) => {
      // Dentro do elemento encontrado, localize o botão
      const botaoComprar = $el.next()
      // Clique no botão
      cy.wrap(botaoComprar).click({log: false})
      cy.wait('@cartWait')
    })
    cy.get('#menu-icon').click({log: false})
    cy.get('.wpmenucart-contents').click({log: false})
    cy.wait('@basketWait')
    cy.get('form > .shop_table', {log: false}).should('have.length', 1)
    cy.get('.checkout-button').click({log: false})
  
    //Preenchendo Informações de compra
    cy.get('#billing_first_name', {log: false}).type('Nome')
    cy.get('#billing_last_name', {log: false}).type('Sobrenome')
    cy.get('#billing_email', {log: false}).type('joaopedro.resende04@gmail.com')
    cy.get('#billing_phone', {log: false}).type('124')
    cy.get('#billing_address_1', {log: false}).type('afdsafsad')
    cy.get('#billing_city', {log: false}).type('City')
    cy.get('#billing_postcode', {log: false}).type('123')
    cy.get('#place_order', {log: false}).scrollIntoView().click({log: false})
    cy.wait('@checkoutWait')
    cy.get('.woocommerce-thankyou-order-received', {log: false}).contains('Thank you.').then(() => {
      //Dando um fim no log, para mostrar que ele foi conclúido
      log.end()
    })
  })