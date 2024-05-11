require("dotenv").config();
const express = require("express");
const connectDB = require("./database/connect");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
// const cron = require("node-cron");
const job = require("./cron");
job.job.start();

const app = express();
const port = process.env.PORT || 5555;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// cron.schedule("*/14 * * * *", () => {
//   console.log("server restarting");
// });

app.get("/", async (req, res) => {
  try {
    res.status(200).send("hi");
  } catch (err) {
    res.status(500).send({ message: err });
  }
});

// app.post("/upload", upload.single("file"), (req, res) => {
//   Product.create({ img: req.file.filename })
//     .then((result) => res.json(result))
//     .catch((err) => console.log(err));
// });

// app.get("/getImage", (req, res) => {
//   Product.find()
//     .then((users) => res.json(users))
//     .catch((err) => res.json(err));
// });

// app.post("/api/products", upload.single("file"), (req, res) => {
//   Product.create({ img: req.file.filename })
//     .then((result) => res.json(result))
//     .catch((err) => console.log(err));
// });

const start = async () => {
  try {
    await connectDB(process.env.DB);
    console.log("Successfully connected to DataBase");
    app.listen(port, () => {
      console.log(`Server is listening to port ${port}...`);
    });
  } catch (err) {
    console.log(err.message);
  }
};

start();
