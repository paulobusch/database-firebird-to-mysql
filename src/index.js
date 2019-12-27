const { Search } = require('../src/model');
const { FdbConfig, Scripts, Config } = require('../config');
const { Migration } = require('./migrate');
const Firebird = require('node-firebird');

const pool = Firebird.pool(5, FdbConfig);
pool.get(async (err, db) => {
    if (err) throw err;

    console.log('Iniciando...');
    let offset = 0;
    const recursive = () => {
        db.query(Scripts.query, [Config.limit, offset], async (err, list) => {
            if (err) throw err;        
            
            db.detach();
            const castStr = (raw) => { 
                if (!raw)
                    return null;

                const value = raw.toString('utf-8');
                if (value === 'null')
                    return null;

                return value;
            };
            const castDate = (raw) => raw ? new Date(castStr(raw)) : raw;
            
            const result = list.map(raw => {
                return new Search(
                    castStr(raw.CON_CPFCNPJ),
                    castStr(raw.CON_NOME),
                    castDate(raw.CON_DATANASCIMENTO),
                    castStr(raw.CON_CIDADE),
                    castStr(raw.CON_ENDERECO),
                    castStr(raw.CON_BAIRRO),
                    castStr(raw.CON_FONE)
                );
            }) || [];

            Migration.Connect();
            await Migration.Migrate(result);
            Migration.Disconnect();
            offset += Config.limit;
            console.log('Processado: ' + offset);
            if (Config.limit !== result.length){
                console.log('Fim...');
                return;
            }
            recursive();
        });
    }

    recursive();  
});