import signup from '../pages/SignupPage'
import signupFactory from '../factories/SignupFactory'





describe('Signup', ()=>{
 
    //before(function(){
    //    cy.log('Tudo aqui é executado uma unica vez antes de TODOS os casos de testes')
    //})

   // beforeEach(function(){
  //     cy.log('Tudo aqui é executado uma unica vez antes de CADA os casos de testes')
   // })

    //after(function(){
    //    cy.log('Tudo aqui é executado uma unica vez depois de TODOS os casos de testes')
    //})
//
    //afterEach(function(){
    //    cy.log('Tudo aqui é executado uma unica vez depois de CADA  caso de testes')
    //})

   // beforeEach(function(){
   //     cy.fixture('delivery').then((d)=>{
   //         this.deliver = d
   //     })
   // })


    it('User should be deliver',function(){

        var deliver = signupFactory.deliver()

        const expectMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.go()
        console.log(this.deliver)
        signup.fillForm(deliver)
        signup.submit()    
        signup.modalContentShouldBe(expectMessage)
    })

    it('Incorrect document', function(){


        var deliver = signupFactory.deliver()
        deliver.cpf = '0000000312'

        const expectMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.go()
        //cy.log(this.deliver.cpf_inv)
        signup.fillForm(deliver)
        signup.submit()
        signup.alertMessageShouldBe('Oops! CPF inválido')
    })

    it('Incorrect email', function(){
    
        var deliver = signupFactory.deliver()
        deliver.email = 'user.com.br'

        const expectMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertMessageShouldBe('Oops! Email com formato inválido.')
    })


    context('Required fields',function(){
        const messages = [ 
            {field: 'name', output: 'É necessário informar o nome'},
            {field: 'cpf', output: 'É necessário informar o CPF'},
            {field: 'email', output: 'É necessário informar o email'},
            {field: 'postalcode', output: 'É necessário informar o CEP'},
            {field: 'delivery_method', output: 'Selecione o método de entrega'},
            {field: 'cnh', output: 'Adicione uma foto da sua CNH'},
        ]

       before(function(){
        signup.go()
        signup.submit()
        })

        messages.forEach(function(msg){
            it(`${msg.field} is required`, function(){
                signup.alertMessageShouldBe(msg.output)
            })
        })

    })


 


})