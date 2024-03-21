const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const dbURI =
  "mongodb+srv://crapeter:MongoDB0422%21@cluster0.pb7fxj4.mongodb.net/Students?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then(() => app.listen(3001))
  .catch((err) => console.error(err));

const studentSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  StudentID: {
    type: String,
    required: true,
  },
  Schedule: [
    {
      type: String,
    },
  ],
  Grades: [
    {
      type: Number,
    },
  ],
});

const Student = mongoose.model("Student", studentSchema);

app.post("/send-student", async (req) => {
  const { Name, StudentID } = req.body;
  try {
    const newStudent = new Student({
      Name,
      StudentID,
    });
    await newStudent.save();
  } catch (err) {
    console.error("Error saving data to database: ", err);
  }
});

app.post("/edit-data/:id", async (req, res) => {
  const id = req.params.id;
  const { className, newGrade } = req.body;
  try {
    const student = await Student.findOne({ StudentID: id });
    if (student) {
      index = student.Schedule.indexOf(className);
      if (index !== -1) {
        student.Grades[index] = newGrade;
      }
      await student.save();
    } else {
      console.error("Student not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/remove-data/:id/:class", async (req, res) => {
  const id = req.params.id;
  const className = req.params.class;
  try {
    const student = await Student.findOne({ StudentID: id });
    if (student) {
      index = student.Schedule.indexOf(className);
      student.Schedule.splice(index, 1);
      student.Grades.splice(index, 1);
      await student.save();
    } else {
      console.error("Student not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/send-new-data/:id", async (req, res) => {
  const id = req.params.id;
  const { Schedule, Grades } = req.body;
  try {
    const student = await Student.findOne({ StudentID: id });
    if (student) {
      student.Schedule.push(Schedule);
      if (Grades !== "") {
        student.Grades.push(Grades);
      }
      await student.save();
    } else {
      console.error("Student not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/remove-student/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Student.findOneAndDelete({ StudentID: id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/remove-all-data/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const student = await Student.findOne({ StudentID: id });
    if (student) {
      student.Schedule = [];
      student.Grades = [];
      await student.save();
    } else {
      console.error("Student not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/student-exists", async (req, res) => {
  const studentID = req.query.studentID;
  const existingStudentID = await getExistingIDs(studentID);
  res.json({ exists: existingStudentID });
});

app.get("/class-exists/:id/:class", async (req, res) => {
  const id = req.params.id;
  const className = req.params.class;
  try {
    const student = await Student.findOne({ StudentID: id });
    if (student) {
      for (let i = 0; i < student.Schedule.length; i++) {
        if (student.Schedule[i] == className) {
          res.json({ exists: true });
        }
      }
      res.json({ exists: false });
    } else {
      console.error("Couldn't find student");
    }
  } catch {
    console.error("No student found this that id");
  }
});

app.get("/students", async (_, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/students-info/:id", async (req, res) => {
  const studentID = req.params.id;
  try {
    const student = await Student.findOne({ StudentID: studentID });
    if (student) {
      const { Name, Schedule, Grades } = student;
      res.json({ Name, Schedule, Grades });
    } else {
      console.error("No student found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error " });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// helper functions/variables
async function getExistingIDs(id) {
  try {
    const student = await Student.findOne({ StudentID: id });
    return !!student;
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error " });
  }
}
