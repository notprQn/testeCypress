//Testando se todos os filtros estão funcionando corretamente
Cypress.Commands.add('filtro', () => {
    //Criando log Customizado para a função
    const log = Cypress.log({
        name: "filtro",
        displayName: "FILTRANDO",
        message: [`📌 FILTRANDO...`],
        // @ts-ignore
        autoEnd: false,
      })  

    cy.visit('https://practice.automationtesting.in/')
    cy.get('#menu-icon').click()
    cy.get('#menu-item-40').click()
    cy.get('.orderby').should('exist')
    //Pegando o primeiro item de cada tipo de filtro
    cy.get('.products').eq(0).contains('Android Quick Start Guide')
    cy.get('.orderby').select('Sort by popularity')
    cy.get('.products').eq(0).contains('Selenium Ruby')
    cy.get('.orderby').select('Sort by average rating')
    cy.get('.products').eq(0).contains('Selenium Ruby')
    cy.get('.orderby').select('Sort by newness')
    cy.get('.products').eq(0).contains('HTML5 WebApp Develpment')
    cy.get('.orderby').select('Sort by price: low to high')
    cy.get('.products').eq(0).contains('JS Data Structures and Algorithm')
    cy.get('.orderby').select('Sort by price: high to low')
    cy.get('.products').eq(0).contains('Selenium Ruby').then(() => {
        //Acabando o log 'Filtrando'
        log.end()
    })
})

//Testando se todos as categorias estão funcionando corretamente
Cypress.Commands.add('categoria', () => {
    const log = Cypress.log({
        name: "filtro",
        displayName: "CATEGORIAS",
        message: [`🗂️ CATEGORIAS...`],
        // @ts-ignore
        autoEnd: false,
      })

    //Visitando e entrando na página de 'shop'
    cy.visit('https://practice.automationtesting.in/')
    cy.get('#menu-icon').click()
    cy.get('#menu-item-40').click()
    cy.get('.orderby').should('exist')

    //Testando o tamanho de cada categoria
    //Usar o 'find' por que, ele seleciona somente dentro do elemento do 'get'
    cy.get('.cat-item-24 > a').click()
    cy.get('#content').find('li').should('have.length', 1)
    cy.get('.cat-item-19 > a').click()
    cy.get('#content').find('li').should('have.length', 3)
    cy.get('.cat-item-21 > a').click()
    cy.get('.products').find('li').should('have.length', 3)
    cy.get('.cat-item-17 > a').click()
    cy.get('.products').find('li').should('have.length', 1).then(() => {
        log.end()
    })
})