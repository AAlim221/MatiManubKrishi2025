const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ygjzcip.mongodb.net/MatiManubKrishi?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    const cropsCollection = client.db("MatiManubKrishi").collection("Crops");

    // Add a new crop
    app.post("/crops", async (req, res) => {
      const crop = req.body; // Get the crop data from the request body
      console.log(crop); // Log the crop to console (for debugging purposes)

      try {
        // Insert the crop into the database
        const result = await cropsCollection.insertOne(crop);

        // Send a response with the result of the insertion
        res.status(201).send({
          message: "Crop added successfully",
          cropId: result.insertedId, // Return the inserted crop ID
        });
      } catch (error) {
        // If an error occurs, send a failure response
        res.status(500).send({
          message: "Error adding crop",
          error: error.message,
        });
      }
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Graceful shutdown for MongoDB client
process.on("SIGINT", async () => {
  await client.close();
  console.log("MongoDB client disconnected");
  process.exit(0);
});

app.get("/", (req, res) => {
  res.send("MatiManubKrishi is Cooking");
});

app.listen(port, () => {
  console.log(`MatiManubKrishi server is running on port ${port}`);
});
