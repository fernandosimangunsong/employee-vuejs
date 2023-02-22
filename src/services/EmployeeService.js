import http from "../http-common";

class EmployeeService {
  getAllEmployee() {
    return http.get("/employee/list");
  }

  getAllLookup() {
    return http.get("/lookup/list");
  }

  getAllLeave(employeeId) {
    return http.get("/leave/list/"+employeeId);
  }

  getEmployeeID(id) {
    console.log("proses get employee by id: ", id);
    return http.get(`/employee/list/${id}`);
  }

  getLeaveID(id) {
    return http.get(`/leave/list/${id}`);
  }

  create(data) {
    return http.post("/employee/add", data);
  }

  createleave(data) {
    return http.post("/leave/add", data);
  }

  update(id, data) {
    return http.post(`employee/update/${id}`, data);
  }

  delete(id) {
    return http.delete(`/employee/delete/${id}`);
  }

  findByName() {
    return http.get(`/employee?name=$name`);
  }

  getListSex(){
    return http.get('lookup/listByGroupName/sex')
  }

  getListStatusPernikahan(){
    return http.get('lookup/listByGroupName/marital')
  }
}

export default new EmployeeService();
