const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const clientRoutes = require("./routes/client.js");
const generalRoutes = require("./routes/general.js");
const managementRoutes = require("./routes/management.js");
const salesRoutes = require("./routes/sales.js");

//data imports
const User = require("./models/User.js");
const Product = require("./models/Product.js");
const ProductState = require("./models/ProductState.js");
const Transactions = require("./models/Transaction.js");
const OverallStat = require("./models/OverallStat.js");
const AffiliateState = require("./models/AffiliateState.js");
const {dataUser, dataProduct, dataProductStat,dataTransaction,dataOverallStat,dataAffiliateStat} = require("./data/index.js");
// console.log(dataOverallStat);



//Config
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//Routes
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

// Mongoose Setup

const PORT = process.env.PORT || 6000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection established");
  })
  .catch((e) => {
    console.log("connection failed");
  });

// User.insertMany(dataUser);
// Product.insertMany(dataProduct);
// ProductState.insertMany(dataProductStat);
// Transactions.insertMany(dataTransaction);
// OverallStat.insertMany(dataOverallStat);
// AffiliateState.insertMany(dataAffiliateStat);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


