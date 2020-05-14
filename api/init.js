const db = require('./libraries/Database');
db.run(
    'DROP TABLE assets'
)
db.run(
    'CREATE TABLE IF NOT EXISTS assets (\n' +
    '    id INTEGER PRIMARY KEY,\n' +
    '    holding TEXT NOT NULL,\n' +
    '    amount INTEGER NOT NULL,\n' +
    '    price INTEGER NOT NULL,\n' +
    '    value INTEGER NOT NULL\n,' +
    '    lastPriceUpdate INTEGER NOT NULL\n' +
    ');'
);
db.run(
    'CREATE TABLE IF NOT EXISTS users (\n' +
    '    id INTEGER PRIMARY KEY,\n' +
    '    name TEXT NOT NULL,\n' +
    '    age INTEGER NOT NULL,\n' +
    '    job INTEGER NOT NULL\n' +
    ');'
);
db.serialize(() => {
    db
        .run(`INSERT INTO assets(holding, amount, price, value, lastPriceUpdate) VALUES( ?, ?, ?, ?, ?);`,
            ['TSLA', 100, 10, 1000, 0]
        )
        .run(`INSERT INTO assets(holding, amount, price, value, lastPriceUpdate) VALUES( ?, ?, ?, ?, ?);`,
        ['F', 100, 10, 1000, 0]
    )
});
db.serialize(() => {
    db
        .run(`INSERT INTO users(name,age, job) VALUES(?, ?, ?);`,
            ['Patrick Lomp', 21, 'Software dev']
        )
});
console.log('Database Created and Defaults Inserted');
db.close();