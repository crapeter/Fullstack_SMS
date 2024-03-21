<template>
  <div id="app" class="center-container">
    <div class="content-container">
      <div class="student-info">
        <h1 class="text">Student's Schedule & Grades</h1>
        <p class="text">Name: {{ studentName }}</p>
        <p class="text">Schedule: {{ Schedule }}</p>
        <p class="text">Grades: {{ Grades }}</p>
      </div>
      <div class="input-container">
        <div class="input-group">
          <label for="name">Class:</label>
          <input v-model="Class" type="text" class="input"/>
        </div>
        <div class="input-group">
          <label for="name">Grade:</label>
          <input v-model="Grade" type="text" class="input"/>
        </div>
      </div>
      <div class="buttons">
        <div>
          <button @click="sendNewData" id="update">Add</button>
          <button @click="editData" id="edit">Edit</button>
          <button @click="removeData" id="remove">Remove</button>
        </div>
        <button @click="removeAllData" id="remove_all">Clear Schedule</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data() {
    return {
      Name: '',
      Schedule: '',
      Grades: '',
      Class: '',
      Grade: '',
    }
  },
  mounted() {
    const studentID = this.$route.params.id;
    this.fetchStudentsData(studentID)
  },
  methods: {
    async fetchStudentsData(id) {
      try {
        const response = await axios.get(`http://localhost:3000/students-info/${id}`)
        const { Name, Schedule, Grades } = response.data
        this.studentName = Name 
        this.Schedule = Schedule 
        this.Grades = Grades 
        this.Class = ''
        this.Grade = ''
      } catch (err) {
        console.error("Error fetching data")
      }
    },
    async sendNewData() {
      try {
        const response = await axios.get(`http://localhost:3000/class-exists/${this.$route.params.id}/${this.Class}`)
        const classExists = response.data.exists
        if (this.Class !== '') {
          if (classExists) {
            alert(`Student already enrolled in '${this.Class}'`)
          } else {
            await axios.post(`http://localhost:3000/send-new-data/${this.$route.params.id}`, {
              Schedule: this.Class,
              Grades: this.Grade,
            })
            .then(alert("Schedule/Grades updated"))
            .then(this.fetchStudentsData(this.$route.params.id))
          }
        } else {
          alert("Not all fields have been filled in correctly")
        }
      } catch (err) {
        console.error("Error fetching data")
      }
    },
    async removeData() {
      try {
        const response = await axios.get(`http://localhost:3000/class-exists/${this.$route.params.id}/${this.Class}`)
        const classExists = response.data.exists
        if (this.Class !== '') {
          if (classExists) {
            await axios.post(`http://localhost:3000/remove-data/${this.$route.params.id}/${this.Class}`)
            .then(alert(`Class: '${this.Class}' and its grade have been removed`))
            .then(this.fetchStudentsData(this.$route.params.id))
          } else {
            alert(`Class: '${this.Class}' does not exist`)
          }
        } else {
          alert("Fill in the 'class' section to remove a class and it's corresponding grade")
        }
      } catch (err) {
        console.error("Error fetching data")
      }
    },
    async editData() {
      try {
        const response = await axios.get(`http://localhost:3000/class-exists/${this.$route.params.id}/${this.Class}`)
        const classExists = response.data.exists
        if (this.Class !== '' && this.Grade !== '') {
          if (classExists) {
            await axios.post(`http://localhost:3000/edit-data/${this.$route.params.id}`, {
              className: this.Class,
              newGrade: this.Grade
            })
            .then(alert(`Class: '${this.Class}' has been edited`))
            .then(this.fetchStudentsData(this.$route.params.id))
          } else {
            alert(`Class: '${this.Class}' does not exist`)
          }
        } else {
          alert("Not all fields have been filled in correctly")
        }
      } catch (err) {
        console.error("Error fetching data")
      }
    },
    async removeAllData() {
      try {
        await axios.post(`http://localhost:3000/remove-all-data/${this.$route.params.id}`)
        .then(alert(`${this.studentName}'s schedule and grades have been cleared`))
        .then(this.fetchStudentsData(this.$route.params.id))
      } catch (err) {
        console.error("Error removing data")
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
}
.content-container {
  background-color: #edf2f2;
  border: 2px solid black;
  border-radius: 25px;
  padding: 20px;
}
.student-info {
  background-color: #edf2f2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.input-container {
  background-color: #edf2f2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.input-group {
  background-color: #edf2f2;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
label {
  background-color: #edf2f2;
  font-weight: bold;
  margin-bottom: 5px;
}
.input {
  background-color: #edf2f2;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 210px;
}
.buttons {
  background-color: #edf2f2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 35px;
}
.buttons button {
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}
#update {
  background-color: #00b307;
  margin-right: 3px;
  transition: background-color 0.3s ease;
}
#update:hover {
  background-color: #007d05;
}
#edit {
  background-color: #111dfa;
  margin-right: 3px;
  transition: background-color 0.3s ease;
}
#edit:hover {
  background-color: #0b14ba;
}
#remove {
  background-color: #f00000;
  margin-right: 3px;
  margin-top: 3px;
  transition: background-color 0.3s ease;
}
#remove:hover {
  background-color: #8c0000;
}
#remove_all {
  background-color: #2d2e2d;
  margin-top: 3px;
  margin-right: 3px;
  width: 227px;
  transition: background-color 0.3s ease;
}
#remove_all:hover {
  background-color: black;
}
</style>