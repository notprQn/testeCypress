//Criando teste de registro de conta
Cypress.Commands.add('register', (email) => {
    //Pegando respostas de API
    cy.intercept('GET', '**/my-account').as('regWait')
  
    //Criando log Customizado para a função
    const log = Cypress.log({
      name: "register",
      displayName: "REGISTER",
      message: [`🔐 Registrando... | ${email}`],
      // @ts-ignore
      autoEnd: false,
    })
  
    //Testando caminhos corretos e incorretos
    cy.fixture('contasRegister').then((data) => {
      cy.visit('https://practice.automationtesting.in/')
      cy.get('#menu-icon').click()
      cy.get('#menu-item-50').click()
      cy.wait('@regWait')
  
      //Testando todos os usuarios no contasRegister.json
      data.forEach((userdata) => {
        cy.get('#reg_email').clear().type(userdata.email)
        cy.get('#reg_password').type(userdata.password)
        cy.get('.woocomerce-FormRow > .woocommerce-Button').click()
        //Caminho Certo
        if(userdata.email == "email@email.com" && userdata.password == ".04122003.PlmJooj"){
          cy.get('.woocommerce-MyAccount-content > :nth-child(2)').contains('From your account dashboard')
          cy.get('.woocommerce-MyAccount-navigation-link--customer-logout > a').click()
          //Caminho Incorreto
        } else {
          cy.get('.woocommerce-error').should('exist')
        }
      })
    }).then(() => {
      //Dando um fim no log, para mostrar que ele foi conclúido
      log.end()
    })
  })
  
  //--------------------------------------------------------------------------------------
  //Criando teste de login
  Cypress.Commands.add('login', (email) => {
    //Pegando respostas de API
    cy.intercept('GET', '**/my-account').as('loginWait')
    
    //Criando log Customizado para a função
    const log = Cypress.log({
      name: "login",
      displayName: "LOGIN",
      message: [`🔐 Logando... | ${email}`],
      // @ts-ignore
      autoEnd: false,
    })  
    //Testando caminhos corretos e incorretos
    cy.fixture('contasLogin').then((data) => {
        cy.visit('https://practice.automationtesting.in/')
        cy.get('#menu-icon', {log: false}).click({log: false})
        cy.get('#menu-item-50', {log: false}).click({log: false})
        cy.wait('@loginWait')
  
      //Testando todos os usuarios no contasLogin.json
      data.forEach((userdata) => {
        cy.get('#username').clear({log: false}).type(userdata.email)
        cy.get('#password').type(userdata.password)
        cy.get(':nth-child(3) > .woocommerce-Button', {log: false}).click({log: false})
        //Caminho Certo
        if(userdata.email == "joaopedro.resende04@gmail.com" && userdata.password == ".04122003.PlmJooj"){
          cy.get('.woocommerce-MyAccount-content > :nth-child(2)', {log: false}).contains('From your account dashboard')
          cy.get('.woocommerce-MyAccount-navigation-link--customer-logout > a', {log: false}).click({log: false})
          //Caminho incorreto
        } else {
          cy.get('.woocommerce-error', {log: false}).should('exist')
        }
      })
    }).then(() => {
      //Dando um fim no log, para mostrar que ele foi conclúido
      log.end()
    })
  })
  
  Cypress.Commands.add('esqueceuSenha', (email) => {
    cy.intercept('GET', '**/my-account').as('loginWait')
    cy.intercept('GET', '**/lost-password').as('lostWait')
  
    //Criando log Customizado para a função
    const log = Cypress.log({
      name: "forgot",
      displayName: "FORGOT",
      message: [`🔐 Esqueceu a Senha`],
      // @ts-ignore
      autoEnd: false,
    })
  
    cy.visit('https://practice.automationtesting.in/')
    cy.get('#menu-icon', {log: false}).click({log: false})
    cy.get('#menu-item-50', {log: false}).click({log: false})
    cy.wait('@loginWait')
    cy.get('.woocommerce-LostPassword > a', {log: false}).click()
    cy.wait('@lostWait')
    cy.get('#user_login').type(email)
    cy.get('.woocommerce-Button', {log: false}).click()
    cy.get('.woocommerce-message').contains('Password reset email has been sent.').then(() => {
      //Dando um fim no log, para mostrar que ele foi conclúido
      log.end()
    })
  })

  Cypress.Commands.add('obrigatorio', (email) => {
    cy.intercept('GET', '**/my-account').as('loginWait')
  
    //Criando log Customizado para a função
    const log = Cypress.log({
      name: "requeired",
      displayName: "REQUIRED",
      message: [`🔐 Campos Obrigatórios`],
      // @ts-ignore
      autoEnd: false,
    })
  
    cy.visit('https://practice.automationtesting.in/')
    cy.get('#menu-icon', {log: false}).click({log: false})
    cy.get('#menu-item-50', {log: false}).click({log: false})
    cy.wait('@loginWait')
    cy.get('#username').type(email)
    cy.get(':nth-child(3) > .woocommerce-Button', {log: false}).click({log: false})
    cy.get('.woocommerce-error').contains('Password is required.')
    cy.get('#username').clear()
    cy.get('#password').type('asdasdasd')
    cy.get(':nth-child(3) > .woocommerce-Button', {log: false}).click({log: false})
    cy.get('.woocommerce-error').contains('Username is required.').then(() => {
      //Dando um fim no log, para mostrar que ele foi conclúido
      log.end()
    })
  })