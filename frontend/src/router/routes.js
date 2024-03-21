import home_page from "../views/home_page.vue";
import add_student from "../views/add_student.vue";
import list_students from "../views/list_students.vue";
import update_student from "../views/update_student.vue";

export default [
  { path: "/", component: home_page },
  { path: "/add_student", component: add_student },
  { path: "/list_students", component: list_students },
  {
    path: "/update_student/:id",
    name: "update-student",
    component: update_student,
  },
];

