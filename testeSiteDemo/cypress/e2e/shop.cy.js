describe(('Testando funcionalidades do shop'), () => {
    it('Confimando que estamos na página certa', () => {
        cy.visit('https://practice.automationtesting.in/')
        cy.get('#menu-icon').click()
        cy.get('#menu-item-40').click()
        cy.get('.orderby').should('exist')        
    })

    it('Testando se o Sort funciona', () => {
        cy.filtro()
    })

    it('Testando se as categorias funcionam', () => {
        cy.categoria()
    })
})