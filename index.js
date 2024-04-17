//includes
const express = require("express");
const morgan = require("morgan");
const mongoose = require('mongoose')
const Task = require('./models/Task')

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
 ;const tasks = [
		{title: 'blah blah 1', done_status: true},
		{title: 'blah 2', done_status: false},
		]
	res.render('index', {tasks: tasks})
});

app.get("/create", (req, res) => {
  res.render("create");
});

app.get('/add-task', (req, res) => {
	const task = new Task({
		title: 'Task 1',
		done_status: false
	})

	task.save()
		.then((result) => {
			res.send(result)
		})
})

// 404 route
app.use((req, res) => {
  res.status(404).render("404");
});

// server listening

