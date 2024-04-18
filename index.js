//includes
const express = require("express");
const morgan = require("morgan");
const mongoose = require('mongoose')
const Task = require('./models/Task')
const taskController = require('./controllers/taskController')

// setting up express with const
const app = express();
const PORT = process.env.PORT || 3000;

// DB URI String
const DB_URI = 'mongodb+srv://kreti:Vaerus44@atlascluster.hsr8mne.mongodb.net/TodoList?retryWrites=true&w=majority&appName=AtlasCluster'

mongoose.connect(DB_URI)
	.then((result) => {
    app.listen(PORT, () => {
      console.log(`The app started successfully on http://localhost:${PORT}`);
      console.log('DB connected successfully')
    });
  })
	.catch((err) => console.log(err))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setting ejs as view engine
app.use(express.static("public"));
app.set("view engine", "ejs");

// morgan logging each request as it comes in
app.use(morgan("dev"));

// routers
app.get("/", (req, res) => {
	res.redirect('/tasks')
});

// temp create new task page
app.get("/add-task", (req, res) => {
  res.render("add");
});


// task routes
app.get('/tasks', taskController.task_index)

app.post('/tasks', taskController.task_create)

app.delete('/tasks/:id', taskController.task_delete)

// 404 route
app.use((req, res) => {
  res.status(404).render("404");
});

// server listening

 