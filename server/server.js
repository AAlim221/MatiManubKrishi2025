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

    app.get("/", (req, res) => {
      res.send("MatiManubKrishi is Cooking");
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
