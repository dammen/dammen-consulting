/* Set up environment keys */

const dotenv = require("dotenv");

const environments =
    dotenv.config({ path: "./env/dev.env" }).parsed




module.exports = Object.keys(environments).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(environments[next]);
    return prev;
}, {});