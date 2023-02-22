<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <h2 class="spasi">Spasi</h2>
        <label for="employeeId">Employee ID</label>
        <input
          type="text"
          class="form-control"
          id="employeeId"
          required
          v-model="bean.employeeId"
          name="employeeId"
        />
      </div>

      <div class="form-group">
        <label for="fromDate">From Date</label>
        <input
          type="date"
          class="form-control"
          id="fromDate"
          required
          v-model="bean.fromDate"
          name="fromDate"
          format="yyyy-MM-dd"
        />
      </div>
      <div class="form-group">
        <label for="toDate">To Date</label>
        <input
          type="date"
          class="form-control"
          id="toDate"
          required
          v-model="bean.toDate"
          name="toDate"
          format="yyyy-MM-dd"
        />
      </div>
      <div class="form-group">
        <label for="type">Type</label>
        <input
          type="text"
          class="form-control"
          id="type"
          required
          v-model="bean.type"
          name="type"
        />
      </div>
      <div class="form-group">
        <label for="reason">Reason</label>
        <input
          type="text"
          class="form-control"
          id="reason"
          required
          v-model="bean.reason"
          name="reason"
        />
      </div>

      <button @click="saveLeave" class="btn btn-success">Submit</button>
    </div>

    <div v-else class="text-center">
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newLeave">Add</button>
      <button class="btn btn-primary" onclick="location.href='/employee'">
        Back
      </button>
    </div>
  </div>
</template>

<script>
import EmployeeService from "../services/EmployeeService";
import { format_date } from "../convertdate";
export default {
  name: "add",
  data() {
    return {
      bean: {
        id: null,
        employeeId: null,
        fromDate: null,
        toDate: null,
        type: null,
        reason: null,
      },
      submitted: false,
      action: "ADD",
    };
  },
  mounted() {
    console.log("tes", this.$route.params.id);
    if (this.$route.params.id) {
      EmployeeService.getLeaveID(this.$route.params.id)
        .then((response) => {
          this.bean = response.data;
          this.bean.fromDate = format_date(this.bean.fromDate);
          this.bean.toDate = format_date(this.bean.toDate);
          this.action = "EDIT";
        })
        .catch((e) => {
          console.log(e);
        });
    }
  },
  methods: {
    saveLeave() {
      EmployeeService.createleave(this.bean)
        .then((response) => {
          this.bean.id = response.data.id;
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newLeave() {
      this.submitted = false;
      this.bean = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
/* .container {
    /* display: flex; */
/* justify-content: center; */
/* align-items: center; */
/* height: 100vh; */

/* .content h4 {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 24px;
  }
  
  .content button {
    margin-right: 10px;
  } */

.spasi {
  color: white;
}
</style>
