<template>
  <div class="not_students">
    <h1>Students</h1>
    <p>Alphabetical order by first name</p>
  </div>
  <div>
    <ul v-if="students.length > 0" class="students">
      <li v-for="student in sortedStudents" :key="student.StudentID" class="student_item">
        <router-link :to="{ name: 'update-student', params: { id: student.StudentID }}" class="student_name">
          <span v-if="student.Grades && student.Grades.length > 0" class="same-color">
            {{ student.Name }},
            GPA: {{ gpa(student.Grades) }}
          </span>
          <span v-else-if="student.Grades && student.Grades.length <= 0" class="same-color">
            {{ student.Name }}
          </span>
        </router-link>
        <trashcan @click="removeStudent(student.StudentID)" :class="{ 'button': true, 'same-color': true }" />
      </li>
    </ul>
  </div>
</template>

<script>
import trashcan from './trashcan.vue'
import axios from 'axios'
export default {
  data() {
    return {
      students: [],
      highlightedStudent: null
    }
  },
  components: {
    trashcan
  },
  mounted() {
    this.fetchStudents()
  },
  computed: {
    sortedStudents() {
      return this.students.slice().sort((a, b) => a.Name.localeCompare(b.Name))
    }
  },
  methods: {
    async fetchStudents() {
      try {
        const response = await axios.get("http://localhost:3000/students")
        this.students = response.data
      } catch (err) {
        console.error("Error fetching data")
      }
    },
    async removeStudent(id) {
      try {
        await axios.post(`http://localhost:3000/remove-student/${id}`)
        .then(this.fetchStudents())
      } catch (err) {
        console.error("Error removing data")
      }
    },
    gpa(grades) {
      const total = grades.reduce((acc, x) => acc + x, 0)
      return (total/grades.length).toFixed(2)
    },
  }
}
</script>

<style scoped>
.button {
  cursor: pointer;
  background-color: #cacecf;
}
.same-color {
  background-color: inherit;
}
.students {
  border: 2px solid black;
  padding-left: 0%;
  font-weight: bold;
}
.student_item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.student_name {
  background-color: transparent;
  text-decoration: none;
}
.student_item:nth-child(even) {
  background-color: #cccecf;
}
.student_item:nth-child(odd) {
  background-color: #ebebeb;
}
.not_students {
  font-weight: bold;
}
</style>
