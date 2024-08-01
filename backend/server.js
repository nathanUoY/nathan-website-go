const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://nattyb7702:JzCKXdV0Y2URGjb2@moduledata.kk4pgdt.mongodb.net/cricket-stats', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define schema and model for the modules
const moduleSchema = new mongoose.Schema({
  moduleCode: String,
  moduleName: String,
  moduleMark: Number,
  mathsModule: Boolean,
  computingModule: Boolean
});

const Module = mongoose.model('Module', moduleSchema);

app.get('/api/modules', async (req, res) => {
  try {
    const modules = await Module.find();
    res.json(modules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/modules', async (req, res) => {
  const module = new Module({
    moduleCode: req.body.moduleCode,
    moduleName: req.body.moduleName,
    moduleMark: req.body.moduleMark,
    mathsModule: req.body.mathsModule,
    computingModule: req.body.computingModule
  });
  try {
    const newModule = await module.save();
    res.status(201).json(newModule);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Define a schema and model for blog posts
const blogSchema = new mongoose.Schema({
  heading: String,
  content: String,
  image: String, // URL to the image
  createdAt: { type: Date, default: Date.now }
});

const Blog = mongoose.model('Blog', blogSchema);

// Define API routes for blog posts
app.get('/blog-api/posts', async (req, res) => {
  try {
    const posts = await Blog.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/blog-api/posts', async (req, res) => {
  const { heading, content, image } = req.body;
  const newPost = new Blog({ heading, content, image });
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/blog-api/posts/:id', async (req, res) => {
  try {
    const deletedPost = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ message: 'Post not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
