const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve uploaded files

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // save files in "uploads" folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // unique filename
  },
});
const upload = multer({ storage: storage });

// MongoDB connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ygjzcip.mongodb.net/MatiManubKrishi?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const cropsCollection = client.db("MatiManubKrishi").collection("Crops");
    const productsCollection = client.db("MatiManubKrishi").collection("Products");
    const ordersCollection = client.db("MatiManubKrishi").collection("Orders");
    // POST with image upload
    app.post("/crops", upload.single("cropImage"), async (req, res) => {
      try {
        const cropData = req.body;
        if (req.file) {
          cropData.imageUrl = `/uploads/${req.file.filename}`;
        }
        const result = await cropsCollection.insertOne(cropData);
        res.status(201).send({
          message: "Crop added successfully",
          cropId: result.insertedId,
        });
      } catch (error) {
        console.error("Upload error:", error.message);
        res.status(500).send({ message: "Failed to upload crop", error: error.message });
      }
    });

    app.get("/crops", async (req, res) => {
      try {
        const crops = await cropsCollection.find({}).toArray();
        res.status(200).send(crops);
      } catch (error) {
        res.status(500).send({ message: "Error retrieving crops", error: error.message });
      }
    });
    // ==== Products Routes ====

    // POST new product
    app.post("/products", async (req, res) => {
      try {
        const productData = req.body;
        const result = await productsCollection.insertOne(productData);
        res.status(201).send({
          message: "Product added successfully",
          productId: result.insertedId,
        });
      } catch (error) {
        console.error("Product upload error:", error.message);
        res.status(500).send({ message: "Failed to add product", error: error.message });
      }
    });

    // GET all products
    app.get("/products", async (req, res) => {
      try {
        const products = await productsCollection.find({}).toArray();
        res.status(200).send(products);
      } catch (error) {
        res.status(500).send({ message: "Error retrieving products", error: error.message });
      }
    });

    app.get("/", (req, res) => {
      res.send("MatiManubKrishi is Cooking");
    });
     // POST new orders
    // Save invoice to 'orders' collection
app.post("/orders", async (req, res) => {
  try {
    const invoice = req.body;

    if (!invoice || !invoice.cart || !Array.isArray(invoice.cart) || invoice.cart.length === 0) {
      return res.status(400).json({ message: "Invalid invoice data" });
    }

    const result = await ordersCollection.insertOne(invoice); // Use ordersCollection, not productsCollection
    res.status(201).send({
      message: "Invoice saved successfully",
      orderId: result.insertedId,
    });
  } catch (error) {
    console.error("Invoice save error:", error.message);
    res.status(500).send({ message: "Failed to save invoice", error: error.message });
  }
});


    await client.db("admin").command({ ping: 1 });
    console.log("MongoDB connection is healthy!");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
}

process.on("SIGINT", async () => {
  await client.close();
  console.log("Disconnected from MongoDB");
  process.exit(0);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

run().catch(console.error);
