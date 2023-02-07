Cypress.Commands.add('fillMandatoryFieldsAndSubimit', function(){
    cy.get('#firstName').type('Thiago')
    cy.get('#lastName').type('Silveira')
    cy.get('#email').type('silveiraforneli@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

})