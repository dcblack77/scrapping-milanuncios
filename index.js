const express = require('express');
const app = express();

const log = require("morgan");


app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.use(log("combined"));

app.use('/api', require('./controllers/scrapper'));


async function main() {
    await app.listen(3000);
    console.log("Server on port",3000);
}

main();

module.exports = {
    app,
}