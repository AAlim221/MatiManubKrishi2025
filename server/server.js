const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
const corsOptions = {
  origin: 'http://localhost:5173', // Allow frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
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
    const productsCollection = client
      .db("MatiManubKrishi")
      .collection("Products");
    const ordersCollection = client.db("MatiManubKrishi").collection("Orders");
    const diseaseInfoCollection = client
      .db("MatiManubKrishi")
      .collection("DiseaseInfo");
    const doctorsCollection = client
      .db("MatiManubKrishi")
      .collection("Doctors");
    const blogsinfoCollection = client
      .db("MatiManubKrishi")
      .collection("BlogInfo");

    const userproblemCollection = client
      .db("MatiManubKrishi")
      .collection("UserProblems");
    const userCollection = client.db("MatiManubKrishi").collection("Users");
    const commonDiseaseCollection = client.db("MatiManubKrishi").collection("CommonDisease");
    const reviewsCollection = client.db("MatiManubKrishi").collection("Reviews");



    // Crop POST (with image)
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
        res
          .status(500)
          .send({ message: "Failed to upload crop", error: error.message });
      }
    });

    // All Crops GET
    app.get("/crops", async (req, res) => {
      try {
        const crops = await cropsCollection.find({}).toArray();
        res.status(200).send(crops);
      } catch (error) {
        res
          .status(500)
          .send({ message: "Error retrieving crops", error: error.message });
      }
    });
    // GET crops by season
app.get("/crops/season/:seasonName", async (req, res) => {
  const { seasonName } = req.params;

  try {
    const crops = await cropsCollection
      .find({ seasonName: { $regex: new RegExp(seasonName, "i") } })
      .toArray();

    if (crops.length === 0) {
      return res.status(404).send({ message: "No crops found for this season." });
    }

    res.status(200).send(crops);
  } catch (error) {
    res.status(500).send({
      message: "Error retrieving crops by season",
      error: error.message
    });
  }
});


    // Product POST
    app.post("/products", async (req, res) => {
      try {
        const productData = req.body;
        const result = await productsCollection.insertOne(productData);
        res.status(201).send({
          message: "Product added successfully",
          productId: result.insertedId,
        });
      } catch (error) {
        res
          .status(500)
          .send({ message: "Failed to add product", error: error.message });
      }
    });

    // Products GET
    app.get("/products", async (req, res) => {
      try {
        const products = await productsCollection.find({}).toArray();
        res.status(200).send(products);
      } catch (error) {
        res
          .status(500)
          .send({ message: "Error retrieving products", error: error.message });
      }
    });

    // Order POST
    app.post("/orders", async (req, res) => {
      try {
        const invoice = req.body;

        if (
          !invoice ||
          !invoice.cart ||
          !Array.isArray(invoice.cart) ||
          invoice.cart.length === 0
        ) {
          return res.status(400).json({ message: "Invalid invoice data" });
        }

        const result = await ordersCollection.insertOne(invoice);
        res.status(201).send({
          message: "Invoice saved successfully",
          orderId: result.insertedId,
        });
      } catch (error) {
        res
          .status(500)
          .send({ message: "Failed to save invoice", error: error.message });
      }
    });
    // Order GET
    app.get("/orders", async (req, res) => {
      try {
        const orders = await ordersCollection.find({}).toArray();
        res.status(200).send(orders);
      } catch (error) {
        res
          .status(500)
          .send({ message: "Error retrieving orders", error: error.message });
      }
    });
app.get("/orders", async (req, res) => {
  const { email, startDate, endDate } = req.query;
  let filter = {};

  if (email) filter.userEmail = email;

  if (startDate && endDate) {
    filter.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  try {
    const orders = await ordersCollection.find(filter).toArray();
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send({ message: "Error", error: error.message });
  }
});



    // Disease POST or check existing
    app.post("/diseases", async (req, res) => {
      try {
        const diseaseData = req.body;
        const existing = await diseaseInfoCollection.findOne({
          diseaseName: diseaseData.diseaseName,
        });

        if (existing) {
          return res.status(200).send({
            exists: true,
            message: "Disease already exists. Do you want to update it?",
            diseaseId: existing._id,
          });
        }

        const result = await diseaseInfoCollection.insertOne(diseaseData);
        res.status(201).send({
          message: "Disease info added",
          diseaseId: result.insertedId,
          exists: false,
        });
      } catch (error) {
        res.status(500).send({
          message: "Failed to process disease info",
          error: error.message,
        });
      }
    });

    // Disease GET by query param
    app.get("/diseases", async (req, res) => {
      try {
        const { diseaseName } = req.query;
        if (!diseaseName)
          return res.status(400).send({ message: "diseaseName is required" });

        const disease = await diseaseInfoCollection.findOne({ diseaseName });
        if (!disease)
          return res.status(404).send({ message: "Disease info not found" });

        res.status(200).send(disease);
      } catch (error) {
        res.status(500).send({
          message: "Failed to get disease info",
          error: error.message,
        });
      }
    });

    // Disease GET by param
    app.get("/diseases/:diseaseName", async (req, res) => {
      try {
        const { diseaseName } = req.params;
        const disease = await diseaseInfoCollection.findOne({ diseaseName });
        if (!disease)
          return res.status(404).send({ message: "Disease not found" });

        res.status(200).json(disease);
      } catch (error) {
        res
          .status(500)
          .send({ message: "Failed to fetch disease", error: error.message });
      }
    });

    // Disease UPDATE
    app.put("/diseases/update", async (req, res) => {
      try {
        const { diseaseName, suggestedPesticide, treatment, plantCareAdvice } =
          req.body;

        const result = await diseaseInfoCollection.updateOne(
          { diseaseName },
          { $set: { suggestedPesticide, treatment, plantCareAdvice } }
        );

        if (result.matchedCount === 0) {
          return res
            .status(404)
            .send({ message: "Disease not found to update" });
        }

        res.status(200).send({ message: "Disease info updated successfully" });
      } catch (error) {
        res.status(500).send({
          message: "Failed to update disease info",
          error: error.message,
        });
      }
    });

    // Blog GET all
    app.get("/blogs", async (req, res) => {
      try {
        const blogs = await blogsinfoCollection.find({}).toArray();
        res.status(200).send(blogs);
      } catch (error) {
        res
          .status(500)
          .send({ message: "Error retrieving blogs", error: error.message });
      }
    });

    // Blog POST
    app.post("/blogs", upload.single("image"), async (req, res) => {
      try {
        const { title, author, content, date } = req.body;
        const imageUrl = `/uploads/${req.file.filename}`;
        const newBlog = { title, author, content, date, imageUrl };

        const result = await blogsinfoCollection.insertOne(newBlog);
        res
          .status(201)
          .send({ message: "Blog created", id: result.insertedId });
      } catch (error) {
        res
          .status(500)
          .send({ message: "Error creating blog", error: error.message });
      }
    });

    // Blog GET by ID
    app.get("/blogs/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const blog = await blogsinfoCollection.findOne({
          _id: new ObjectId(id),
        });
        if (!blog) return res.status(404).send({ message: "Blog not found" });

        res.status(200).send(blog);
      } catch (error) {
        res
          .status(500)
          .send({ message: "Error retrieving blog", error: error.message });
      }
    });

    // Doctor POST
    app.post("/doctors", upload.single("doctorImage"), async (req, res) => {
      try {
        const doctorData = req.body;
        if (req.file) doctorData.imageUrl = `/uploads/${req.file.filename}`;

        const result = await doctorsCollection.insertOne(doctorData);
        res.status(201).send({
          message: "Doctor added successfully",
          doctorId: result.insertedId,
        });
      } catch (error) {
        res
          .status(500)
          .send({ message: "Failed to upload doctor", error: error.message });
      }
    });

    // Doctor GET all
    app.get("/doctors", async (req, res) => {
      try {
        const doctors = await doctorsCollection.find({}).toArray();
        res.status(200).send(doctors);
      } catch (error) {
        res
          .status(500)
          .send({ message: "Error retrieving doctors", error: error.message });
      }
    });

    // Doctor GET by ID
    app.get("/doctors/:id", async (req, res) => {
      try {
        const doctorId = req.params.id;
        console.log("Requested doctorId:", doctorId);

        if (!ObjectId.isValid(doctorId)) {
          return res.status(400).send({ message: "Invalid doctor ID format" });
        }

        const doctor = await doctorsCollection.findOne({
          _id: new ObjectId(doctorId),
        });
        if (!doctor)
          return res.status(404).send({ message: "Doctor not found" });

        res.status(200).send(doctor);
      } catch (error) {
        console.error("Fetch doctor error:", error.message);
        res
          .status(500)
          .send({ message: "Failed to get doctor", error: error.message });
      }
    });

    // Doctor Search by specialization
    app.get("/doctors/search", async (req, res) => {
      try {
        const { specialization } = req.query;
        if (!specialization) {
          return res
            .status(400)
            .send({ message: "Specialization query is required" });
        }

        const doctors = await doctorsCollection
          .find({ specialization: { $regex: new RegExp(specialization, "i") } })
          .toArray();

        res.status(200).send(doctors);
      } catch (error) {
        res
          .status(500)
          .send({ message: "Failed to search doctors", error: error.message });
      }
    });
    // POST - Save new contact message
    app.post("/api/contact", async (req, res) => {
      try {
        const formData = req.body;
        const result = await userproblemCollection.insertOne(formData);
        res.status(201).json({ success: true, insertedId: result.insertedId });
      } catch (error) {
        console.error("❌ Error saving contact:", error);
        res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      }
    });

    // GET - Fetch all messages
    app.get("/api/contact", async (req, res) => {
      try {
        const messages = await userproblemCollection.find().toArray();
        res.status(200).json(messages);
      } catch (error) {
        console.error("❌ Error fetching messages:", error);
        res.status(500).json({ message: "Failed to fetch messages" });
      }
    });
    // server.js or routes/admin.js
    app.post("/api/admin-login", async (req, res) => {
      const { email, password } = req.body;

      try {
        const user = await userCollection.findOne({ email });
        if (!user || user.password !== password) {
          return res.json({ success: false, message: "Invalid credentials" });
        }

        return res.json({ success: true });
      } catch (err) {
        console.error("❌ Admin login error:", err);
        return res.status(500).json({ success: false, error: err.message });
      }
    });
    app.get("/api/check-admin/:email", async (req, res) => {
      const email = req.params.email;
      try {
        const admin = await userCollection.findOne({ email, role: "admin" }); // dynamic
        if (admin) {
          return res.json({ isAdmin: true });
        } else {
          return res.json({ isAdmin: false });
        }
      } catch (err) {
        console.error("❌ Admin check error:", err);
        return res.status(500).json({ isAdmin: false, error: err.message });
      }
    });
    //common disease part
    // GET all common diseases
app.get("/common-diseases", async (req, res) => {
  try {
    const diseases = await commonDiseaseCollection.find({}).toArray();
    res.status(200).json(diseases);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch common diseases",
      error: error.message,
    });
  }
});

// GET single common disease by ID
app.get("/common-diseases/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const disease = await commonDiseaseCollection.findOne({ _id: new ObjectId(id) });

    if (!disease) {
      return res.status(404).send({ message: "Disease not found" });
    }

    res.status(200).send(disease);
  } catch (error) {
    res.status(500).send({ message: "Error fetching disease", error: error.message });
  }
});
// GET all reviews
app.get("/reviews", async (req, res) => {
  try {
    const reviews = await reviewsCollection.find({}).toArray();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch reviews",
      error: error.message,
    });
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

app.get("/", (req, res) => {
  res.send("MatiManubKrishi is Cooking");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

run().catch(console.error);
