describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')   
    });
    it('verifica o título da aplicação', function(){
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste'
        
        cy.get('#firstName').type('Thiago')
        cy.get('#lastName').type('Siveira')
        cy.get('#email').type('silveiraforneli@gmail.com')
        cy.get('#phone').type('16991690419')
        cy.get('#open-text-area').type(longText, { delay : 0})
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })  

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Thiago')
        cy.get('#lastName').type('Siveira')
        cy.get('#email').type('silveiraforneli,gmail.com')
        cy.get('#phone').type('16991690419')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('Campo telefone continua vazia quando preenchido com valor não-numérico', function(){
        cy.get('#phone').type('abcdefghi').should('have.value', '')
    })
    
    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Thiago')
        cy.get('#lastName').type('Siveira')
        cy.get('#email').type('silveiraforneli@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        
        cy.get('.error').should('be.visible')

    })

    it('Exibe mensagem de erro quando o e-mail se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Thiago')
        cy.get('#lastName').type('Siveira')
        cy.get('#phone').type('16991690419')
        cy.get('#email-checkbox').click()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        
        cy.get('.error').should('be.visible')

    })

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
        .type('Thiago')
        .should('have.value', 'Thiago')
        .clear()
        .should('have.value', '')

        cy.get('#lastName')
          .type('Silveira')
          .should('have.value', 'Silveira')
          .clear()
          .should('have.value', '')

        cy.get('#email')
          .type('silveiraforneli@gmail.com')
          .should('have.value', 'silveiraforneli@gmail.com')
          .clear()
          .should('have.value', '')

        cy.get('#phone')
          .type('1234567890')
          .should('have.value', '1234567890')
          .clear()
          .should('have.value', '')
    })

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatóorios', function(){
        cy.get('button[type="submit"]').click()
        
        cy.get('.error').should('be.visible')

    })

    it('Envia formulário com sucesso usando comando customizado', function(){
        cy.fillMandatoryFieldsAndSubimit()

        cy.get('.success').should('be.visible')
    })

    it('Seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product') //pega todas as options dentro de um select
          .select('youtube') //selecionar o valor desejável
          .should('have.value', 'youtube') //conferir se selecionou correto
    })

    it('Seleciona um produto (Mentoria) por seu texto', function(){
        cy.get('#product') //pega todas as options dentro de um select
          .select('mentoria') //selecionar o valor desejável
          .should('have.value', 'mentoria') //conferir se selecionou correto
    })

    it('Seleciona um produto (Blog) por seu texto', function(){
        cy.get('#product') //pega todas as options dentro de um select
          .select('blog') //selecionar o valor desejável
          .should('have.value', 'blog') //conferir se selecionou correto
    })

    it('Marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]').check()
        .should('have.value', 'feedback')
    })

    it('Marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]').check()//selecciona todos os flags
        .should('have.length', 3)//conta quantos tinha
        .each(function($radio){//each valida se os elementos foram selecionados(checados) 
            cy.wrap($radio).check()//função recebe cada um dos argumentos do radio
            cy.wrap($radio).should('be.checked')
        })
    })

    it('Marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')//seleciona todos os checks
          .check()//mandou selecionar cada um dos flags
          .should('be.checked')//verificou se ambos estavam marcados
          .last()//pegou o ultimo
          .uncheck()//desmarcou o flag
          .should('not.be.checked')//confirmou que não tava selecionado
        })  
    
        it('Seleciona um arquivo da pasta fixtures', function(){
            cy.get('input[type="file"]')
              .should('not.have.value')//verifica se não tem nenhum arquivo
              .selectFile('./cypress/fixtures/example.json')//faz upload de arquivo com cypress
              .should(function($input){
                    expect($input[0].files[0].name).to.equal('example.json')
              })
        })//verifica se foi selecionado

        it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
            cy.fixture('example.json').as('sampleFile')
            cy.get('input[type="file"]')
              .selectFile('@sampleFile')
              .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
              })
        })

        it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
            cy.get('#privacy a')//pegar o ancora
              .should('have.attr', 'target', '_blank')//tem o atributo target com o valor blank
        })

        it('Acessa a página da política de privacidade removendo o target e então clicando no link', function(){
            cy.get('#privacy a')//acessa a pagina de politica
              .invoke('removeAttr', 'target')//remove o target
              .click()


            cy.contains('Talking About Testing')
              .should('be.visible')
        })
});