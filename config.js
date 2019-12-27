module.exports = {
    Config: {
        limit: 10000
    },
    MySqlConfig: {
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'vetorial'
    },
    FdbConfig: {
        database: 'C:\\CONSULTA1.FDB',
        user: 'sysdba',
        password: 'masterkey'
    },
    Scripts: {
        insert: `

# script
insert into search(cpf_cnpj,name,birth_date,city_name,address_name,neighborhood_name,phone) values 
`,
        query: `
select 
    FIRST ? SKIP ?
    CON_CPFCNPJ,
    CON_NOME,
    CON_DATANASCIMENTO,
    CON_CIDADE,
    CON_ENDERECO,
    CON_BAIRRO,
    CON_FONE
from CONSULTA`
    }
}