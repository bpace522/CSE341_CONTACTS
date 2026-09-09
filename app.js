const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const app = express();
const mongodb = require('./db/connect');

const port = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use('/contacts', require('./routes/contacts'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Connected to db and listening on port ${port}`);
        });
    }
});