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

  //-------------------------------------------------------------------

  //Testando as funções de cupons
  Cypress.Commands.add('cupom', (nomeLivro, cupom) => {
    //Criando log Customizado para a função
    const log = Cypress.log({
      name: "cupom",
      displayName: "CUPOM",
      message: [`🎟️ CUPOM... | ${cupom}`],
      // @ts-ignore
      autoEnd: false,
    })

    cy.intercept('POST', '/?wc-ajax=add_to_cart').as('cartWait')
    cy.intercept('GET', '**/basket').as('basketWait')
    cy.intercept('GET', '**/checkout/order-received/**').as('checkoutWait')
    cy.intercept('GET', '**/?wc-ajax=get_cart_totals').as('cupomWait')

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

    //Testando Caminho Certo
    cy.get('#menu-icon').click({log: false})
    cy.get('.wpmenucart-contents').click({log: false})
    cy.wait('@basketWait')
    cy.get('form > .shop_table', {log: false}).should('have.length', 1)
    cy.get('#coupon_code').type(cupom)
    cy.get('.coupon > .button').click()
    cy.wait('@cupomWait')
    cy.get('.woocommerce-message').should('have.text', 'Coupon code applied successfully.')
    cy.get('.order-total > td').should('have.text', `₹${(500 - 50) + 9}.00 `)
    cy.get('.woocommerce-remove-coupon').click()
    cy.get('.woocommerce-message').should('have.text', 'Coupon has been removed.')
    cy.get('.order-total > td').should('have.text', `₹${500 + 10}.00 `).then(() => {
      log.end()
    })

    const log2 = Cypress.log({
      name: "cupom",
      displayName: "CUPOM ERRADO",
      message: [`🎟️ CUPOM... | cupomErrado`],
      // @ts-ignore
      autoEnd: false,
    })

    //Testando caminho Errado
    cy.get('#coupon_code').type('cupomErrado')
    cy.get('.coupon > .button').click()
    cy.get('.woocommerce-error > li').should('have.text', 'Coupon "cupomerrado" does not exist!').then(() => {
      log2.end()
    })
  })