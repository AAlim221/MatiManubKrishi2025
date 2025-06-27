const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB URI from environment variables
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ygjzcip.mongodb.net/MatiManubKrishi?retryWrites=true&w=majority`;

// Create MongoClient with MongoDB URI
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect to MongoDB
    console.log("Connecting to MongoDB...");
    await client.connect();
    console.log("Successfully connected to MongoDB!");

    const cropsCollection = client.db("MatiManubKrishi").collection("Crops");

    // POST /crops - Add a new crop
    app.post("/crops", async (req, res) => {
      const crop = req.body;
      console.log("Received crop data:", crop); // Log to verify data

      try {
        // Insert crop into MongoDB
        const result = await cropsCollection.insertOne(crop);
        console.log("Crop added to database:", result); // Log successful insert

        // Send response to client
        res.status(201).send({
          message: "Crop added successfully",
          cropId: result.insertedId,
        });
      } catch (error) {
        console.error("Error inserting crop:", error.message);
        res.status(500).send({
          message: "Error adding crop",
          error: error.message,
        });
      }
    });

    // GET /crops - Retrieve all crops
    app.get("/crops", async (req, res) => {
      try {
        // Get all crops from MongoDB
        const crops = await cropsCollection.find({}).toArray();
        res.status(200).send(crops); // Send list of crops
      } catch (error) {
        console.error("Error retrieving crops:", error.message);
        res.status(500).send({
          message: "Error retrieving crops",
          error: error.message,
        });
      }
    });

    // Confirm MongoDB connection
    await client.db("admin").command({ ping: 1 });
    console.log("MongoDB connection is healthy!");

  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}

// Graceful shutdown for MongoDB client
process.on("SIGINT", async () => {
  await client.close();
  console.log("MongoDB client disconnected");
  process.exit(0);
});

// Test route for checking if the server is running
app.get("/", (req, res) => {
  res.send("MatiManubKrishi is Cooking");
});

// Ensure the backend is running on the specified port
app.listen(port, () => {
  console.log(`MatiManubKrishi server is running on port ${port}`);
});

// Start MongoDB connection and the server
run().catch(console.error);
