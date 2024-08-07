require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

//mongodb+srv://nattyb7702:JzCKXdV0Y2URGjb2@moduledata.kk4pgdt.mongodb.net/?retryWrites=true&w=majority&appName=moduleData
mongoose.connect("mongodb+srv://nattyb7702:JzCKXdV0Y2URGjb2@moduledata.kk4pgdt.mongodb.net/test", {
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Connection error:', error.message);
});

// Define schema and models
const moduleSchema = new mongoose.Schema({
  moduleCode: String,
  moduleName: String,
  moduleMark: Number,
  mathsModule: Boolean,
  computingModule: Boolean
});

const Module = mongoose.model('Module', moduleSchema);

const blogSchema = new mongoose.Schema({
  heading: String,
  content: String,
  image: String, // URL to the image
  createdAt: { type: Date, default: Date.now }
});

const Blog = mongoose.model('Blog', blogSchema);

// API routes for modules
app.get('/api/modules', async (req, res) => {
  console.log('Fetching modules');
  try {
    const modules = await Module.find();
    res.json(modules);
  } catch (err) {
    console.error('Error fetching modules:', err);
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/modules', async (req, res) => {
  const module = new Module(req.body);
  try {
    const newModule = await module.save();
    res.status(201).json(newModule);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// API routes for blog posts
app.get('/blog-api/posts', async (req, res) => {
  console.log('Fetching blog posts');
  try {
    const posts = await Blog.find();
    res.json(posts);
  } catch (err) {
    console.error('Error fetching blog posts:', err);
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

app.put('/blog-api/posts/:id', async (req, res) => {
  try {
    const updatedPost = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated document
    );
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(updatedPost);
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

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on https://16.171.142.4:${port}`);
});
