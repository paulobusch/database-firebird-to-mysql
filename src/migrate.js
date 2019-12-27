const { MySqlConfig, Scripts } = require('../config');
const mysql = require('mysql');

var connection = null;
class Migration {
    static Connect() {
        connection = mysql.createConnection(MySqlConfig);
        connection.connect();
    }

    static async Migrate(list) {
        if (!connection)
            return;

        const toDate = (date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        let insertRows = list.map(m => {
            const row = [
               m.cpf_cnpj ? `'${m.cpf_cnpj}'` : 'null',  
               m.name ? `'${m.name}'` : 'null',  
               m.birth_date ? `'${toDate(m.birth_date)}'` : 'null',  
               m.city_name ? `'${m.city_name}'` : 'null',  
               m.address_name ? `'${m.address_name}'` : 'null',  
               m.neighborhood_name ? `'${m.neighborhood_name}'` : 'null',  
               m.phone ? `'${m.phone}'` : 'null'
            ];
            return `(${row.join(',')})`;
        }).join(`, \n`);

        const command = Scripts.insert + insertRows + ';';
        await connection.query(command);
    }

    static Disconnect() {
        if (!connection)
            return;
            
        connection.end();
    }
}

module.exports = {
    Migration
}