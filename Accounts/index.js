const inquirer = require('inquirer');
const fs = require('fs');
const chalk = require('chalk');
const { exit } = require('process');
const { encode } = require('punycode');

Operation()

function Operation(){

    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'O que você deseja fazer?',
            choices: ['Criar Conta', 'Consultar Saldo', 'Depositar', 'Sacar', 'Sair']
        }
    ]).then((answer) => {

        const action = answer['action']

        switch(action){
            case 'Criar Conta':
                CriarConta()
            break;
            case 'Consultar Saldo':
                ConsultarSaldo()
            break;
            case 'Depositar':
                Depositar()
            break;
            case 'Sacar':
                Sacar()
            break;
            case 'Sair':
                process.exit()
            break;

        }

    }).catch(err => console.log(err))

}

function CriarConta(){

    inquirer.prompt([
        {
            name: 'account',
            message: 'Digite o nome da sua conta'
        }
    ]).then((answer) => {

        const AccountName = answer['account']

        if(!fs.existsSync('accounts')){
            fs.mkdirSync('accounts')
        }
    
        if(fs.existsSync(`./accounts/${AccountName}.json`)){
            console.log(chalk.bgRed('Nome indisponivel, tente novamente'))
            return CriarConta()
        }

        fs.writeFileSync(`./accounts/${AccountName}.json`, '{"balance": 0}', function(err){console.log(err)})

        console.log(chalk.bgGreen('Conta criada com sucesso'))

        return Operation()

    }).catch(err => console.log(err))

}

//FUNÇÃO PARA CONSULTAR SALDO
function ConsultarSaldo(){

    inquirer.prompt([
        {
            name: 'account',
            message: 'Digite o nome da sua conta'
        }
    ]).then((answer) => {

        const AccountName = answer['account']

        if(!CheckAccount(AccountName)){
            return ConsultarSaldo()
        }

        const accountData = PegarConta(AccountName);

        console.log(chalk.bgGray(`Seu saldo é de ${accountData.balance}`))

        return Operation()

    })

}

//FUNÇÃO PARA DEPOSITAR VALOR NA CONTA DO CLIENTE 
function Depositar(){

    inquirer.prompt([
        {
            name: 'account',
            message: 'Digite o nome da sua conta'
        }
    ]).then((answer) => {

        const AccountName = answer['account'] 

        if(!CheckAccount(AccountName)){
            return Depositar()
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Qual valor deseja depositar?'
            }
        ]).then((answer) => {

            const amount = answer['amount']

            if(!amount){
                console.log('Adicione um valor para depositar!')
            }

            const accountData = PegarConta(AccountName);

            accountData.balance = parseFloat(accountData.balance) + parseFloat(amount)

            fs.writeFileSync(`./accounts/${AccountName}.json`, 
                JSON.stringify(accountData),
                function(err){console.log(err)}
            )

            console.log(chalk.bgGreen(`Você depositou ${amount} na sua conta`))

            return Operation()

        })

    })
    
}

//FUNÇÃO PARA SACAR UM VALOR DA CONTA DO CLIENTE
function Sacar(){

    inquirer.prompt([
        {
            name: 'account',
            message: 'Digite o nome da sua conta'
        }
    ]).then((answer) => {

        const AccountName = answer['account']

        if(!CheckAccount(AccountName)){
            return Sacar()
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Quanto deseja sacar?'
            }
        ]).then((answer) => {

            const amount = answer['amount']

            if(!amount){
                console.log('Digite um valor para sacar')
                return Sacar()
            }

            const accountData = PegarConta(AccountName)

            if(accountData.balance < amount){
                console.log(chalk.bgRed('Valor indisponivel para saque'))
                return Sacar()
            }

            accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

            fs.writeFileSync(`./accounts/${AccountName}.json`,
                JSON.stringify(accountData),
                function(err){console.log(err)}
            )

            console.log(`Você sacou ${amount} da sua conta`)

            return Operation()

        })

    })

}

//FUNÇÃO PARA RESGAR UMA DETERMINADA CONTA DO USUÁRIO
function PegarConta(AccountName){

    const NameJson = fs.readFileSync(`accounts/${AccountName}.json`, {encoding: 'utf-8'}, {flag: 'r'})

    return JSON.parse(NameJson)

}

// FUNÇÃO PARA VERIFICAR SE O NOME DA CONTA QEU DESEJA CRIAR JÁ EXISTE
function CheckAccount(AccountName){

    if(!fs.existsSync(`./accounts/${AccountName}.json`)){
        console.log(chalk.bgRed('essa conta não existe, tente outro nome'))
        return false
    }
    return true
    
}
