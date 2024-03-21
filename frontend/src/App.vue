<template>
  <nav>
    <div class="cont">
      <router-link to="/" class="route">Home</router-link> | 
      <router-link to="/add_student" class="route">Add a student</router-link> | 
      <router-link to="/list_students" class="route">Edit student info</router-link>
    </div>
  </nav>
  <router-view/>
</template>

<script>
</script>

<style>
* {
  background-color: #d7f4f7;
}
.cont {
  text-align: right;
  margin-top: 60px;
}
.route {
  color: black;
  font-weight: 300;
}
</style>
