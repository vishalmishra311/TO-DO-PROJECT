
require("dotenv").config();
console.log("MONGO_URI on Render:", process.env.MONGO_URI);

const express = require("express");
// require("dotenv").config();

const app = express();
// const port = 3000;
const port = process.env.PORT || 3000;

const cors = require("cors");
const connectDB = require("./db");
const Task = require("./models/Task"); // adjust path if needed
const schedule = require("node-schedule");
const sendEmail = require("./mailer");

app.use(cors()); // ✅ Allow all origins
app.use(express.json());

// Connect to MongoDB
connectDB();

app.post("/task", async (req, res) => {
  try {
    const { name, email, task, date, time } = req.body;

    const [hours, minutes] = time.split(":");
    const taskDateTime = new Date(date);
    taskDateTime.setHours(hours);
    taskDateTime.setMinutes(minutes);
    taskDateTime.setSeconds(0);

    const newTask = new Task({ name, email, task, date, time });
    const savedTask = await newTask.save();

    schedule.scheduleJob(taskDateTime, () => sendEmail(savedTask));

    res.status(201).json(savedTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save task" });
  }
});

app.get("/getTaskbyId/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.status(200).json(task);
  } catch (err) {
    console.error("Error fetching tasks:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/getTaskDeatils", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/task/:id", async (req, res) => {
  try {
    console.log("Incoming DELETE request:", req.params.id);

    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Error deleting task:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/updateTask/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    // { new: true } will return the updated document instead of the old one
    const updatedTask = await Task.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    res.status(200).json({
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating task", error: err });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
