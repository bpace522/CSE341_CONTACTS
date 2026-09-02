const express = require('express');
const app = express();
const mongodb = require('./db/connect');

const port = process.env.PORT || 8080;

app.use('/', require('./routes/contacts'));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Connected to db and listening on port ${port}`);
        });
    }
});