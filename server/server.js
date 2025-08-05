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
    // ✅ Update Crop by ID
app.put("/crops/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateDoc = { $set: req.body };

    const result = await cropsCollection.updateOne(
      { _id: new ObjectId(id) },
      updateDoc
    );

    if (result.matchedCount === 0) {
      return res.status(404).send({ message: "Crop not found" });
    }

    res.send({ message: "Crop updated successfully" });
  } catch (error) {
    res.status(500).send({ message: "Update failed", error: error.message });
  }
});
//put 
app.put("/crops/:id", upload.single("cropImage"), async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  if (req.file) {
    updateData.imageUrl = `/uploads/${req.file.filename}`;
  }

  await cropsCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updateData }
  );

  res.send({ message: "Crop updated" });
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
// DELETE /crops/:id
app.delete("/crops/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await cropsCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 1) {
      res.status(200).send({ message: "Crop deleted successfully" });
    } else {
      res.status(404).send({ message: "Crop not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error deleting crop", error: error.message });
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

    // Order one  order POST
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
    //  For admin
    // All Order GET
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
  // get all order login email
  app.get("/orders", async (req, res) => {
  const email = req.query.email; // e.g., /orders?email=user@gmail.com
  const filter = email ? { email } : {};
  try {
    const orders = await ordersCollection.find(filter).toArray();
    res.status(200).send(orders);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error retrieving orders", error: error.message });
  }
});

// DELETE /orders/:id
app.delete("/orders/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await ordersCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Order deleted successfully" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error });
  }
});
//modifiying status
app.patch("/orders/:id/confirm", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await ordersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: "confirmed" } }
    );

    if (result.modifiedCount === 1) {
      res.status(200).json({ message: "Order confirmed successfully" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error confirming order", error });
  }
});
// update order by ID
app.put("/orders/:id", async (req, res) => {
  const { id } = req.params;
  const updatedOrder = req.body;

  try {
    const result = await ordersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedOrder }
    );

    if (result.modifiedCount === 1) {
      res.status(200).json({ message: "Order updated successfully" });
    } else {
      res.status(404).json({ message: "Order not found or no changes made" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error });
  }
});

app.get("/orders/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const order = await ordersCollection.findOne({ _id: new ObjectId(id) });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error });
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
    // Disease GET all
    app.get("/diseases/all", async (req, res) => {
  try {
    const allDiseases = await diseaseInfoCollection.find({}).toArray();
    res.status(200).send(allDiseases);
  } catch (error) {
    res.status(500).send({
      message: "Failed to fetch all disease info",
      error: error.message,
    });
  }
});
// Delete route for a disease
app.delete("/diseases/:id", async (req, res) => {
  try {
    const result = await diseaseInfoCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).send({ message: "Disease not found" });
    res.send({ message: "Disease deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Failed to delete disease", error: error.message });
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


app.patch("/diseases/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // 🛑 Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid ID format" });
    }

    const updateFields = req.body;

    // 🛠️ Sanitize fields (optional)
    const allowedFields = ["diseaseName", "suggestedPesticide", "treatment", "plantCareAdvice"];
    const update = {};
    allowedFields.forEach((key) => {
      if (updateFields[key] !== undefined) {
        update[key] = updateFields[key];
      }
    });

    const result = await diseaseInfoCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: update }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send({ message: "Disease not found" });
    }

    res.send({ message: "Disease updated successfully", result });
  } catch (error) {
    console.error("❌ Edit error:", error);
    res.status(500).send({
      message: "Internal Server Error",
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
    // Backend (Express route)
app.post("/doctors", upload.single("doctorImage"), async (req, res) => {
  try {
    const doctorData = req.body;

    // Convert specialization from comma-separated string to array
    if (doctorData.specialization && typeof doctorData.specialization === "string") {
      doctorData.specialization = doctorData.specialization
        .split(",")
        .map((item) => item.trim());
    }

    // Add image path if file uploaded
    if (req.file) {
      doctorData.image = `/uploads/${req.file.filename}`;
    }

    // Optional: Convert contact fields into nested object
    doctorData.contact = {
      phone: doctorData.phone || "",
      mobile: doctorData.mobile || "",
      email: doctorData.email || "",
    };

    // Remove individual contact fields to avoid duplication
    delete doctorData.phone;
    delete doctorData.mobile;
    delete doctorData.email;

    const result = await doctorsCollection.insertOne(doctorData);

    res.status(201).send({
      message: "Doctor added successfully",
      doctorId: result.insertedId,
    });
  } catch (error) {
    res.status(500).send({
      message: "Failed to upload doctor",
      error: error.message,
    });
  }
});
// delete doctor
app.delete("/doctors/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await doctorsCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).send({ message: "Doctor not found" });
    }

    res.send({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Failed to delete doctor", error: error.message });
  }
});
//doctor find by id 
app.get("/doctors/:id", async (req, res) => {
  const id = req.params.id;
  const doctor = await doctorsCollection.findOne({ _id: new ObjectId(id) });
  res.send(doctor);
});
// doctor updated by id
app.put("/doctors/:id", upload.single("doctorImage"), async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  // Optional: convert specialization back to array
  if (updatedData.specialization && typeof updatedData.specialization === "string") {
    updatedData.specialization = updatedData.specialization.split(",").map(s => s.trim());
  }

  // Image upload
  if (req.file) {
    updatedData.imageUrl = `/uploads/${req.file.filename}`;
  }

  // Re-group contact info
  updatedData.contact = {
    phone: updatedData.phone || "",
    mobile: updatedData.mobile || "",
    email: updatedData.email || "",
  };

  delete updatedData.phone;
  delete updatedData.mobile;
  delete updatedData.email;

  await doctorsCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updatedData }
  );

  res.send({ message: "Doctor updated successfully" });
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
    // PATCH route all contact
  app.patch('/api/contact/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).send({ message: 'Status is required' });
    }

    try {
      const result = await contactCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status } }
      );

      if (result.modifiedCount === 1) {
        res.send({ message: 'Status updated successfully' });
      } else {
        res.status(404).send({ message: 'Message not found' });
      }
    } catch (err) {
      res.status(500).send({ message: 'Update failed', error: err.message });
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
// ✅ POST: Admin Login
app.post("/api/admin-login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userCollection.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.password === password) {
      res.status(200).json({ success: true, message: "Login successful" });
    } else {
      res.status(401).json({ success: false, message: "Incorrect password" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});
// by email
app.get("/api/check-admin/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const admin = await userCollection.findOne({ email, role: "admin" });
    res.json({ isAdmin: !!admin });
  } catch (err) {
    res.status(500).json({ isAdmin: false, error: err.message });
  }
});

// 📌 GET /admin/:email => returns full admin profile
app.get("/admin/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const admin = await userCollection.findOne(
      { email },
      { projection: { password: 0 } } // hide password
    );

    if (admin) {
      res.status(200).json(admin);
    } else {
      res.status(404).json({ message: "Admin not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
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
