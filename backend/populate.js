const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://nattyb7702:JzCKXdV0Y2URGjb2@moduledata.kk4pgdt.mongodb.net/', {

});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a schema and model for the modules
const moduleSchema = new mongoose.Schema({
  moduleCode: String,
  moduleName: String,
  moduleMark: Number,
  mathsModule: Boolean,
  computingModule: Boolean
});

const Module = mongoose.model('Module', moduleSchema);

// Sample data to populate
const modules = [
  { moduleCode: "MAT00001C", moduleName: "Algebra", moduleMark: 61, mathsModule: true, computingModule: false },
  { moduleCode: "COM00016C", moduleName: "Software 2", moduleMark: 64, mathsModule: false, computingModule: true },
  { moduleCode: "COM00023I", moduleName: "Theory 3", moduleMark: 62, mathsModule: false, computingModule: true },
  { moduleCode: "COM00025I", moduleName: "Software 3", moduleMark: 79, mathsModule: false, computingModule: true },
  { moduleCode: "MAT00099H", moduleName: "Groups, Actions & Galois theory", moduleMark: 63, mathsModule: true, computingModule: false },
  { moduleCode: "MAT00080H", moduleName: "Cryptography", moduleMark: 65, mathsModule: true, computingModule: false }
];

// Insert sample data into the database
Module.insertMany(modules)
  .then(() => {
    console.log('Modules added successfully');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error adding modules: ', err);
  });
