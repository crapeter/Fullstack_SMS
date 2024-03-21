<template>
  <div id="app" class="mainpage">
    <div class="content">
      <h2 class="text">This is a basic/bare bone student management system</h2>
      <h3 class="text">Current number of students enrolled: {{ students.length }}</h3>
      <p class="text">Click on <i class="text">'Add a student'</i> to enroll a student</p>
      <p class="text">Click on <i class="text">'Edit student info'</i> for a list of all enrolled student. Then click on a students name and edit their schedule and or grades</p>
      <p class="text">You'll also find a icon on the right of the screen after click <i class="text">'Edit student info'</i>, click that to remove a student</p>
      <p class="text">For adding a class, type the name of the class and a grade, if no grade just put a place holder grade, then click <i class="text">'add'</i></p>
      <p class="text">For editing a class, type the name of the class and the new grade, then click <i class="text">'edit'</i></p>
      <p class="text">For removing a class, type the name of the class and then click <i class="text">'remove'</i></p>
      <p class="text">For clearing the schedule, just click the <i class="text">'Clear Schedule button'</i></p>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: 'home_page',
  data() {
    return {
      students: [],
    }
  },
  mounted() {
    this.fetchStudents()
  },
  methods: {
    async fetchStudents() {
      try {
        const response = await axios.get("http://localhost:3000/students")
        this.students = response.data
      } catch (err) {
        console.error("Error fetching data")
      }
    }
  }
};
</script>

<style>
#app.mainpage {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.content {
  background-color: #edf2f2;
  border: 2px solid black;
  border-radius: 25px;
  padding: 20px;
}
.text {
  background-color: #edf2f2;
}
</style>
