describe('Testando funções de conta', () => {
  /*it('Teste de Registrar', () => {
    cy.register('email@gmail.com')
  })*/
  it('Testes de Login', () => {
    cy.login('joaopedro.resende04@gmail.com')
  })

  it('Testar se os campos são obrigatórios', () => {
    cy.obrigatorio('joaopedro.resende04@gmail.com')
  })

  it('Esqueceu Senha', () => {
    cy.esqueceuSenha('joaopedro.resende04@gmail.com')
  })
})

