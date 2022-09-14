//Connection string for Sql Server
export const configDB = {
    user: 'sa',
    password: 'sapwd',
    server: 'S-2020-000002\\SQLEXPRESS',
    database: 'Portfolio',
    // database: 'Sign_DEV',
    options: {
        encrypt: false,
        enableArithAbort: true
    }
}

//Connection string for Msaccess
//export const connString = 'Provider=Microsoft.Jet.OLEDB.4.0;Data Source=C:\\Development\\Personal\\Portfolio\\public\\data\\Portfolio.mdb';
export const connString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source='public/data/Portfolio.mdb'";
