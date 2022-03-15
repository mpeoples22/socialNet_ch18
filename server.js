const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//import routes
app.use(require("./routes"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/social-network-API",
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.set("debug", true);

app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));