import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    alias: "/employee",
    name: "employee",
    component: () => import("./components/EmployeeList"),
  },
  {
    // path: "/tutorials/:id",
    // name: "tutorial-details",
    // component: () => import("./components/Tutorial"),
  },
  {
    path: "/addEmployee",
    name: "addEmployee",
    component: () => import("./components/AddEmployee"),
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: () => import("./components/AddEmployee"),
  },
  {
    path: "/lookup",
    name: "lookup",
    component: () => import("./components/LookupList"),
  },
  {
    path: "/leave",
    name: "leave",
    component: () => import("./components/LeaveList"),
  },
  {
    path: "/leave/add",
    name: "addLeave",
    component: () => import("./components/AddLeave"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
