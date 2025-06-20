const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { spawn } = require('child_process');
const path = require('path');
const { rmSync } = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

app.post('/predict', upload.single('image'), (req, res) => {
  const python = spawn('python3', ['../ml-model/predict.py', req.file.path]);

  python.stdout.on('data', (data) => {
    const result = JSON.parse(data.toString());
    res.json(result);
  });

  python.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
    res.status(500).send("Python error");
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
