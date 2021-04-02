const express = require('express')
const mongoose = require("mongoose")
const cron = require('node-cron')
const moment = require('moment')
require('dotenv/config');

const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));

mongoose.connect(
    process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    },
    () => {
        console.log('connected to DB!');
    }
);

const tasksSchema = mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    taskDescription: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    endedAt: Date
})

const Task = mongoose.model("Task", tasksSchema)
    
app.get('/', (req, res) => {
    Task.find({}, function(err, foundTasks) {
        res.render('todo', { allTasks: foundTasks })
    })
})

app.post('/', (req, res) => {
    const task = new Task({
        "taskName": req.body.taskName,
        "taskDescription": req.body.taskDescription,
        "creator": req.body.creator,
        "duration": req.body.duration,
        "createdAt": new Date(),
        "endedAt": new Date(moment().add(req.body.duration, 'minutes').format())
    })
    task.save()
    res.redirect("/")
})

app.get('/add', (req, res) => {
    Task.find({}, function(err, foundTasks) {
        res.render('todo')
    })
})

app.get('/list', (req, res) => {
    Task.find({}, function(err, foundTasks) {
        res.render('todo', { allTasks: foundTasks })
    })
})

cron.schedule('* * * * *', () => {
    let ea = new Date()
    Task.deleteMany({ endedAt: { $lte: ea } })
});

app.listen(3000)
