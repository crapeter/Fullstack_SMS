<template>
  <div id="app" class="center-container">
    <div class="content-container">
      <div>
        <h1 class="display-text">Enter students name and ID number</h1>
      </div>
      <div class="input-container">
        <label for="name" class="display-text">Student Name:</label>
        <input v-model="name" type="text" class="input"/>
      </div>
      <div class="input-container">
        <label for="name" class="display-text">Student ID:</label>
        <input v-model="studentID" type="text" class="input"/>
      </div>
      <button @click="sendStudentData">Add Student</button>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  export default {
    data() {
      return {
        name: '',
        studentID: '',
        isStudentIDUnique: true,
      }
    },
    methods: {
      reset() {
        this.name = ''
        this.studentID = ''
      },
      async sendStudentData() {
        const response = await axios.get(`http://localhost:3000/student-exists?studentID=${this.studentID}`)
        this.isStudentIDUnique = response.data.exists
        if (!this.isStudentIDUnique) {
          try {
            await axios.post("http://localhost:3000/send-student", {
              Name: this.name,
              StudentID: this.studentID,
            })
            .then(alert(`Student with id: ${this.studentID} created successfully`))
            .then(this.reset())
          } catch (err) {
            console.error("Error sending to MongoDB: ", err)
          }
        } else {
          alert(`Student with id: ${this.studentID} already exists`)
        }
        
      },
    }
  }
</script>

<style scoped>
#app.center-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.content-container {
  background-color: #edf2f2;
  border: 2px solid black;
  border-radius: 25px;
  padding: 20px;
}
.input-container {
  background-color: #edf2f2;
  margin-bottom: 15px;
}
.display-text {
  background-color: #edf2f2;
}
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
.input {
  background-color: #edf2f2;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
}
button {
  background-color: #00b307;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 15px;
  transition: background-color 0.3s ease;
}
button:hover {
  background-color: #007d05;
}
</style>
