const app = require("./index")

const server = app.listen(process.env.PORT, () => console.log("Iniciamos"));

module.exports = server;