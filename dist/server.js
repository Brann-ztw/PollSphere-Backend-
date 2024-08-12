"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./routers/index");
const database_1 = require("./config/database");
const config_1 = require("./config/config");
const PORT = config_1.config.port;
(0, database_1.connectDb)()
    .then((client) => {
    index_1.app.listen(PORT, () => console.log(`server up on ${PORT}`));
})
    .catch((e) => {
    throw e;
});
