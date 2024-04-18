const Task = require ('../models/Task')

const task_index = (req, res) => {
    Task.find().sort({ createdAt: -1 })
    .then((result) => {
        res.render('index', { tasks: result})
    })
    .catch((err) => {
        console.log(err)
    })
}

const task_create = (req, res) => {
    const task = new Task({
		title: req.body.title,
		done_status: false
	});

	task.save()
		.then((result) => {
			res.redirect('/tasks')
		})
		.catch((err) => {
			console.log(err)
		})
}

const task_delete = (req, res) => {
    const id = req.params.id

	Task.findByIdAndDelete(id)
		.then(result => {
			res.json({ redirect: '/tasks' })
		})
		.catch(err => {
			console.log(err)
		})
}

module.exports = {
    task_index,
    task_create,
    task_delete
}
