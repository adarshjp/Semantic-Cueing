const mongoose = require("mongoose");
var clc = require("cli-color");
exports.dbSetup = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    let dbUrl;
    if (process.env.NODE_ENV === "production") {
        dbUrl = process.env.DB_URL_PROD;
    } else if (process.env.NODE_ENV === "development") {
        dbUrl = process.env.DB_URL_DEV
    } else {
        dbUrl = process.env.DB_URL_QA
    }
    if (!dbUrl) {
        console.log(clc.red("Please provide DB_URL_PROD,DB_URL_DEV,DB_URL_QA in .env file"));
        process.exit(1);
    }
    mongoose.connect(dbUrl, connectionParams)
        .then(() => {
            console.log(clc.blueBright("\n******** Connected to MongoDB *******"));
            console.log(clc.redBright("\n*************************************"))
        })
        .catch((err) => {
            console.log("NOT CONNECTED to DB!!");
            console.log(err);
        });
}